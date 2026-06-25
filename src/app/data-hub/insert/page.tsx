"use client"

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Typography, Select, Input, Button, Row, Col, Table, Tag, Tabs, Space, Alert, message, Card } from 'antd';
import { SCHEMA_CATALOG, TableSchema } from '@/app/data-relation/page';
import { 
  Sparkles, Database, ArrowRight, CheckCircle2, RefreshCw, UploadCloud, 
  FileCode2, FileSpreadsheet, FileText, Play, Copy, ShieldCheck, AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Swiss Enterprise Consulting Section Container
function SectionBox({ title, chapter, rightExtra, children, style }: any) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', ...style }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <Text style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.01em' }}>{title}</Text>
        {rightExtra || (chapter ? <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>{chapter}</span> : null)}
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </div>
  );
}

const SAMPLE_DIRTY_JSON = `[
  {
    "order_id": " ORD-2026-9912  ",
    "branch_id": "b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "order_type_name": "Dine In",
    "subtotal": "45000",
    "total_discount": "5000",
    "total_payment": "40000",
    "payment_method": "QRIS",
    "payment_status": "Paid",
    "status": "Completed",
    "transaction_date": "2026-06-25 14:30:00",
    "extra_dirty_field": "ignore_this_hacker_tag"
  },
  {
    "order_id": "ORD-2026-9913",
    "branch_id": "b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "order_type_name": "Takeaway",
    "subtotal": "28000",
    "total_discount": "0",
    "total_payment": "28000",
    "payment_method": "Cash",
    "payment_status": "Paid",
    "status": "Completed",
    "transaction_date": "2026-06-25 14:35:00"
  }
]`;

const SAMPLE_DIRTY_CSV = `order_id,branch_id,order_type_name,subtotal,total_discount,total_payment,payment_method,payment_status,status,transaction_date
 ORD-2026-8801 ,b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d,Online,35000,0,35000,E-Wallet,Paid,Completed,2026-06-25 10:00:00
ORD-2026-8802,b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d,Dine In,52000,2000,50000,Debit,Paid,Completed,2026-06-25 10:15:00`;

export default function UniversalIngestPage() {
  const [selectedTableId, setSelectedTableId] = useState<string>('orders');
  const [inputFormat, setInputFormat] = useState<'json' | 'csv'>('json');
  const [rawPayload, setRawPayload] = useState<string>(SAMPLE_DIRTY_JSON);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sanitizedRows, setSanitizedRows] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('preview');
  const [ingestingDb, setIngestingDb] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const supabase = createClient();
  const activeSchema = SCHEMA_CATALOG.find(t => t.id === selectedTableId) || SCHEMA_CATALOG[0];

  function handleLoadSample(fmt: 'json' | 'csv') {
    setInputFormat(fmt);
    setRawPayload(fmt === 'json' ? SAMPLE_DIRTY_JSON : SAMPLE_DIRTY_CSV);
    messageApi.info(`Dimuat contoh data kotor ${fmt.toUpperCase()}`);
  }

  function runSanitization() {
    if (!rawPayload.trim()) {
      messageApi.warning('Silakan masukkan data mentah terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    setAuditLogs([]);
    setSanitizedRows([]);

    setTimeout(() => {
      try {
        let parsed: any[] = [];
        const logs: string[] = [];

        if (inputFormat === 'json') {
          const raw = JSON.parse(rawPayload);
          parsed = Array.isArray(raw) ? raw : [raw];
          logs.push(`[Parser] Berhasil membaca ${parsed.length} obyek JSON mentah.`);
        } else {
          // Simple CSV Parser
          const lines = rawPayload.split('\n').filter(l => l.trim().length > 0);
          if (lines.length < 2) throw new Error('Format CSV minimal memiliki 1 baris header dan 1 baris data.');
          const headers = lines[0].split(',').map(h => h.trim());
          parsed = lines.slice(1).map(line => {
            const vals = line.split(',');
            const obj: any = {};
            headers.forEach((h, idx) => { obj[h] = vals[idx]?.trim() ?? null; });
            return obj;
          });
          logs.push(`[Parser] Berhasil mengekstrak ${parsed.length} baris dari CSV.`);
        }

        // Classification & Sanitization against activeSchema
        const validColNames = new Set(activeSchema.columns.map(c => c.name));
        const cleaned = parsed.map((row, rIdx) => {
          const cleanObj: any = {};
          
          Object.entries(row).forEach(([key, val]) => {
            const trimmedKey = key.trim();
            if (!validColNames.has(trimmedKey)) {
              logs.push(`[Row #${rIdx + 1}] 🗑️ Stripped unknown attribute '${trimmedKey}' (bukan bagian dari skema ${activeSchema.name}).`);
              return;
            }

            let finalVal: any = val;
            if (typeof finalVal === 'string') {
              finalVal = finalVal.trim();
              if (finalVal.toLowerCase() === 'null' || finalVal === '') finalVal = null;
            }

            // Numeric Auto-Cast
            const colDef = activeSchema.columns.find(c => c.name === trimmedKey);
            if (colDef && (colDef.type.includes('numeric') || colDef.type.includes('int') || colDef.type.includes('float'))) {
              if (finalVal !== null && !isNaN(Number(finalVal))) {
                const num = Number(finalVal);
                if (finalVal !== num) {
                  logs.push(`[Row #${rIdx + 1}] 📐 Auto-cast '${trimmedKey}': string "${finalVal}" -> number ${num}.`);
                  finalVal = num;
                }
              }
            }

            cleanObj[trimmedKey] = finalVal;
          });

          return cleanObj;
        });

        logs.push(`✨ [Done] Normalisasi selesai 100%. Data siap dikirim ke Supabase SSOT.`);
        setSanitizedRows(cleaned);
        setAuditLogs(logs);
        messageApi.success('Sanitasi & Klasifikasi Berhasil!');
      } catch (err: any) {
        messageApi.error(`Gagal memproses data: ${err?.message || 'Sintaks tidak valid'}`);
      } finally {
        setIsProcessing(false);
      }
    }, 400);
  }

  async function commitToSupabase() {
    if (sanitizedRows.length === 0) {
      messageApi.warning('Tidak ada data bersih untuk di-insert.');
      return;
    }

    setIngestingDb(true);
    try {
      const { error } = await supabase.from(activeSchema.name).insert(sanitizedRows);
      if (error) {
        messageApi.error(`Supabase Reject: ${error.message}`);
      } else {
        messageApi.success(`🚀 Berhasil memasukkan ${sanitizedRows.length} baris ke tabel ${activeSchema.name}!`);
        setSanitizedRows([]);
        setRawPayload('');
      }
    } catch (e: any) {
      messageApi.error(`Error: ${e?.message}`);
    } finally {
      setIngestingDb(false);
    }
  }

  const previewCols = sanitizedRows.length > 0 ? Object.keys(sanitizedRows[0]).map(k => ({
    title: <Text style={{ fontWeight: 700, fontSize: '13px' }}>{k}</Text>,
    dataIndex: k,
    key: k,
    render: (v: any) => typeof v === 'object' ? JSON.stringify(v) : String(v ?? 'null')
  })) : [];

  return (
    <MainLayout title="Data HUB / Insert Engine" subtitle="Universal Ingestion & Auto-Sanitization Studio">
      {contextHolder}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>
        
        {/* EDITORIAL HERO HEADER */}
        <div style={{ 
          background: '#FFFFFF', 
          border: '1px solid #E2E8F0', 
          borderRadius: '8px', 
          padding: '36px 40px', 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ maxWidth: '850px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', background: '#F1F5F9', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>CALF ONE</span>
                <span style={{ color: '#CBD5E1' }}>/</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Universal Data Engine</span>
              </div>
              <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
                Universal Data Ingestion & Sanitization
              </Title>
              <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', marginBottom: '24px' }}>
                Engine pengiriman data serbaguna yang mampu menerima input dalam berbagai format mentah (*JSON Payload, CSV, Dump Log*). Sistem secara otomatis mengklasifikasikan atribut, menghapus kolom asing (*hacker tags*), memperbaiki tipe angka, serta membersihkan spasi berlebih agar data 100% steril sebelum masuk ke Supabase SSOT.
              </Text>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '10px' }}>
              <Tag style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>AI Sanitizer Ready</Tag>
            </div>
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <Row gutter={[24, 24]}>
          
          {/* STAGE 1: INPUT MENTAH */}
          <Col xs={24} lg={11}>
            <SectionBox title="01 / Raw Data Ingestion Stage" chapter="INPUT STAGE">
              <div>
                <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>Target Database SSOT Table:</Text>
                <Select 
                  size="large"
                  showSearch
                  value={selectedTableId}
                  onChange={setSelectedTableId}
                  style={{ width: '100%' }}
                  options={SCHEMA_CATALOG.map(t => ({ label: `📦 ${t.name} (${t.domainLabel})`, value: t.id }))}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Format & Sample Templates:</Text>
                  <Space>
                    <Button size="small" onClick={() => handleLoadSample('json')}>Contoh JSON</Button>
                    <Button size="small" onClick={() => handleLoadSample('csv')}>Contoh CSV</Button>
                  </Space>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <Button type={inputFormat === 'json' ? 'primary' : 'default'} onClick={() => setInputFormat('json')} style={{ background: inputFormat === 'json' ? '#0F172A' : '#FFFFFF', borderRadius: '4px' }}>JSON Payload</Button>
                  <Button type={inputFormat === 'csv' ? 'primary' : 'default'} onClick={() => setInputFormat('csv')} style={{ background: inputFormat === 'csv' ? '#0F172A' : '#FFFFFF', borderRadius: '4px' }}>CSV / TSV Text</Button>
                </div>
              </div>

              <div>
                <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>Tempel Data Mentah / Messy Dump Di Sini:</Text>
                <TextArea 
                  rows={14} 
                  value={rawPayload} 
                  onChange={e => setRawPayload(e.target.value)} 
                  placeholder="Paste sembarang teks JSON atau baris CSV kotor..."
                  style={{ fontFamily: 'monospace', fontSize: '12px', borderRadius: '6px', background: '#F8FAFC' }}
                />
              </div>

              <Button 
                type="primary" 
                size="large" 
                icon={<Sparkles size={16} />} 
                onClick={runSanitization} 
                loading={isProcessing}
                style={{ background: '#0F172A', fontWeight: 700, height: '46px', borderRadius: '6px' }}
              >
                Jalankan Auto-Klasifikasi & Sanitasi Data
              </Button>
            </SectionBox>
          </Col>

          {/* STAGE 2: HASIL SANITASI */}
          <Col xs={24} lg={13}>
            <SectionBox 
              title="02 / Sanitized & Classified Output Hub" 
              rightExtra={<Tag style={{ fontWeight: 600 }}>{sanitizedRows.length} Clean Records</Tag>}
            >
              {sanitizedRows.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', background: '#F8FAFC', borderRadius: '6px', border: '1px dashed #CBD5E1' }}>
                  <Database size={36} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
                  <Text style={{ fontWeight: 600, color: '#64748B', display: 'block' }}>Belum ada hasil klasifikasi data.</Text>
                  <Text style={{ fontSize: '13px', color: '#94A3B8' }}>Klik tombol di sebelah kiri untuk memfilter dan membersihkan data mentah.</Text>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <Alert 
                    type="success" 
                    showIcon 
                    title={<Text style={{ fontWeight: 700 }}>Data Terverifikasi Sesuai Skema '{activeSchema.name}'</Text>} 
                    description={`Sistem telah menghapus atribut ilegal dan menstandarkan tipe data. Siap diunggah ke PostgreSQL.`}
                  />

                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    size="large"
                    items={[
                      {
                        key: 'preview',
                        label: '✨ Clean Staging Preview',
                        children: (
                          <Table 
                            dataSource={sanitizedRows} 
                            columns={previewCols} 
                            rowKey={r => r.id || r.order_id || r.customer_id || r.code || JSON.stringify(r)} 
                            pagination={{ pageSize: 5 }} 
                            scroll={{ x: 'max-content' }} 
                            size="small" 
                            bordered 
                          />
                        )
                      },
                      {
                        key: 'audit',
                        label: `🔍 Audit Logs (${auditLogs.length})`,
                        children: (
                          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '14px', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {auditLogs.map((log, idx) => (
                              <div key={idx} style={{ fontSize: '12px', color: log.includes('Stripped') ? '#DC2626' : '#334155' }}>
                                • {log}
                              </div>
                            ))}
                          </div>
                        )
                      },
                      {
                        key: 'payload',
                        label: '📦 Final JSON Payload',
                        children: (
                          <pre style={{ background: '#F8FAFC', padding: '16px', borderRadius: '6px', border: '1px solid #E2E8F0', maxHeight: '300px', overflow: 'auto', fontSize: '12px' }}>
                            {JSON.stringify(sanitizedRows, null, 2)}
                          </pre>
                        )
                      }
                    ]}
                  />

                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<UploadCloud size={18} />} 
                    onClick={commitToSupabase} 
                    loading={ingestingDb}
                    style={{ background: '#0F172A', fontWeight: 700, height: '48px', borderRadius: '6px', marginTop: '8px' }}
                  >
                    🚀 Ingest & Commit ke Supabase Database
                  </Button>

                </div>
              )}
            </SectionBox>
          </Col>

        </Row>

      </div>
    </MainLayout>
  );
}
