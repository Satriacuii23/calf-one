"use client"

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Typography, Select, Input, Button, Table, Tag, Row, Col, Space, Alert, Empty } from 'antd';
import { SCHEMA_CATALOG, TableSchema } from '@/app/data-relation/page';
import { Database, Search, RefreshCw, Layers, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const { Title, Text } = Typography;

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

export default function DataHubViewPage() {
  const [selectedTableId, setSelectedTableId] = useState<string>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(25);

  const supabase = createClient();
  const activeSchema = SCHEMA_CATALOG.find(t => t.id === selectedTableId) || SCHEMA_CATALOG[0];

  async function fetchLiveWarehouseData() {
    setLoading(true);
    setErrorMsg(null);
    setSearchQuery('');
    try {
      const { data, error } = await supabase.from(activeSchema.name).select('*').limit(200);
      if (error) {
        setErrorMsg(error.message);
        setRecords([]);
      } else {
        setRecords(data || []);
      }
      const { count } = await supabase.from(activeSchema.name).select('*', { count: 'exact', head: true });
      setTotalCount(count ?? (data ? data.length : 0));
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error koneksi database');
      setRecords([]);
      setTotalCount(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLiveWarehouseData();
  }, [selectedTableId]);

  const filteredRecords = records.filter(row => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return Object.values(row).some(val => 
      val !== null && val !== undefined && String(val).toLowerCase().includes(q)
    );
  });

  const liveColumns = activeSchema.columns.map(col => ({
    title: (
      <div>
        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{col.name}</div>
        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
          {col.type} {col.key ? `(${col.key})` : ''}
        </div>
      </div>
    ),
    dataIndex: col.name,
    key: col.name,
    render: (val: any) => {
      if (val === null || val === undefined) return <Text style={{ fontSize: '11px', color: '#94A3B8', fontStyle: 'italic' }}>null</Text>;
      if (typeof val === 'boolean') return <Tag color={val ? 'success' : 'error'}>{val ? 'TRUE' : 'FALSE'}</Tag>;
      if (typeof val === 'object') return <Tag color="default" style={{ fontFamily: 'monospace', fontSize: '11px' }}>{JSON.stringify(val).slice(0, 40)}...</Tag>;
      return <Text style={{ color: '#1E293B', fontWeight: 500 }}>{String(val)}</Text>;
    }
  }));

  return (
    <MainLayout title="Data HUB / View Repository" subtitle="Live Enterprise Data Warehouse Explorer">
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Data Warehouse Explorer</span>
              </div>
              <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
                View Supabase Live Records
              </Title>
              <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', marginBottom: '24px' }}>
                Halaman pemantauan aktual repositori data PostgreSQL. Terhubung secara langsung ke dalam 40 tabel SSOT Supabase untuk memvalidasi apakah hasil klasifikasi dan pengiriman data dari engine Insert telah terstruktur dengan presisi.
              </Text>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '6px' }}>
                <Text style={{ color: '#0F172A', fontWeight: 700, fontSize: '13px' }}>SSOT Status: 🟢 Connected to Supabase PostgreSQL Client.</Text>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '10px' }}>
              <Tag style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>Realtime Sync Active</Tag>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <SectionBox 
          title="Consolidated Warehouse Repository" 
          rightExtra={
            <Space wrap>
              <Tag style={{ fontWeight: 600, margin: 0, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>{activeSchema.domainLabel}</Tag>
              <Tag style={{ fontWeight: 600, margin: 0, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>Total DB Rows: {totalCount !== null ? totalCount.toLocaleString() : '...'}</Tag>
              <Button icon={<RefreshCw size={13} />} onClick={fetchLiveWarehouseData} loading={loading}>Sync Supabase</Button>
            </Space>
          }
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12} lg={10}>
              <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>Pilih Master Table Terkoneksi:</Text>
              <Select 
                size="large"
                showSearch
                value={selectedTableId}
                onChange={setSelectedTableId}
                style={{ width: '100%' }}
                options={SCHEMA_CATALOG.map(t => ({ label: `📦 ${t.name} (${t.columns.length} attributes)`, value: t.id }))}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>Cari Baris Data Aktual:</Text>
              <Input 
                size="large"
                prefix={<Search size={15} color="#94A3B8" />}
                placeholder="Cari kata kunci dalam baris..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                allowClear
              />
            </Col>
          </Row>

          <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', marginTop: '4px' }}>
            <Text style={{ color: '#334155', fontSize: '13px' }}>{activeSchema.purpose}</Text>
          </div>

          {/* TABLE DISPLAY */}
          <div style={{ marginTop: '12px' }}>
            {errorMsg ? (
              <Alert 
                type="warning" 
                showIcon 
                icon={<AlertTriangle size={18} />}
                title={<Text style={{ fontWeight: 700 }}>Supabase RLS Notice / Empty Table</Text>}
                description={`Keterangan server: ${errorMsg}. Pastikan tabel sudah dibuat di Supabase atau coba masukkan data melalui menu Insert.`}
              />
            ) : records.length === 0 && !loading ? (
              <Empty description={`Tabel '${activeSchema.name}' saat ini masih kosong di dalam database Supabase.`} />
            ) : (
              <Table 
                dataSource={filteredRecords} 
                columns={liveColumns} 
                rowKey={r => r.id || r.order_id || r.customer_id || r.code || JSON.stringify(r)} 
                loading={loading} 
                pagination={{ pageSize, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], onShowSizeChange: (_, s) => setPageSize(Number(s)) }} 
                scroll={{ x: 'max-content' }} 
                size="middle" 
                bordered 
              />
            )}
          </div>
        </SectionBox>

      </div>
    </MainLayout>
  );
}
