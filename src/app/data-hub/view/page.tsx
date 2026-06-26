"use client"

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Typography, Select, Input, Button, Table, Tag, Row, Col, Space, Alert, Empty } from 'antd';
import { SCHEMA_CATALOG, TableSchema } from '@/lib/schema-catalog';
import { Database, Search, RefreshCw, Layers, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';

const { Title, Text } = Typography;

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
  const { t } = useLanguage();

  const supabase = createClient();
  const activeSchema = SCHEMA_CATALOG.find(t => t.id === selectedTableId) || SCHEMA_CATALOG[0];

  async function fetchLiveWarehouseData() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error, count } = await supabase
        .from(activeSchema.name)
        .select('*', { count: 'exact' })
        .limit(100);

      if (error) {
        setErrorMsg(error.message);
        setRecords([]);
        setTotalCount(0);
      } else {
        setRecords(data || []);
        setTotalCount(count ?? (data ? data.length : 0));
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network Fetch Error');
      setRecords([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLiveWarehouseData();
  }, [selectedTableId]);

  const filteredRecords = records.filter(r => {
    if (!searchQuery.trim()) return true;
    const s = searchQuery.toLowerCase();
    return Object.values(r).some(val => String(val ?? '').toLowerCase().includes(s));
  });

  const liveColumns = (records[0] ? Object.keys(records[0]) : activeSchema.columns.map(c => c.name)).map(colName => {
    const colDef = activeSchema.columns.find(c => c.name === colName);
    return {
      title: (
        <Space size="small" orientation="vertical" style={{ gap: 0 }}>
          <Text style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', fontFamily: 'monospace' }}>{colName}</Text>
          {colDef && <Text style={{ fontSize: '10px', color: '#64748B', fontWeight: 400 }}>{colDef.type}</Text>}
        </Space>
      ),
      dataIndex: colName,
      key: colName,
      render: (val: any) => {
        if (val === null || val === undefined) return <Text type="secondary" style={{ fontStyle: 'italic', fontSize: '11px' }}>null</Text>;
        if (typeof val === 'boolean') return <Tag color={val ? 'success' : 'default'} style={{ margin: 0 }}>{val ? 'true' : 'false'}</Tag>;
        if (typeof val === 'object') return <Text code style={{ fontSize: '11px' }}>{JSON.stringify(val).slice(0, 30)}</Text>;
        return <Text style={{ fontSize: '12px' }}>{String(val)}</Text>;
      }
    };
  });

  return (
    <MainLayout title={t("Data HUB / Preview Data", "Data HUB / Pratinjau Data")} subtitle={t("Live Enterprise Data Warehouse Explorer", "Eksplorasi Repositori Live Data Warehouse")}>
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
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>{t("Data Warehouse Explorer", "Penjelajah Repositori Data")}</span>
              </div>
              <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
                {t("Supabase Live Records Inspection", "Pratinjau Data Live Supabase")}
              </Title>
              <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', marginBottom: '24px' }}>
                {t(
                  "Realtime inspection portal for live PostgreSQL repositories. Connects directly to our 40 Supabase SSOT tables to validate whether data ingestion and AI classification output are structured with pinpoint accuracy.",
                  "Halaman pemantauan aktual repositori data PostgreSQL. Terhubung secara langsung ke dalam 40 tabel SSOT Supabase untuk memvalidasi apakah hasil klasifikasi dan pengiriman data dari engine Insert telah terstruktur dengan presisi."
                )}
              </Text>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '6px' }}>
                <Text style={{ color: '#0F172A', fontWeight: 700, fontSize: '13px' }}>
                  {t("SSOT Status: 🟢 Connected to Supabase PostgreSQL Client.", "Status SSOT: 🟢 Terkoneksi Live ke Supabase PostgreSQL.")}
                </Text>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '10px' }}>
              <Tag style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>
                {t("Realtime Sync Active", "Sinkronisasi Aktif")}
              </Tag>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <SectionBox 
          title={t("Consolidated Warehouse Repository", "Repositori Data Gudang Terkonsolidasi")} 
          rightExtra={
            <Space wrap>
              <Tag style={{ fontWeight: 600, margin: 0, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>{activeSchema.domainLabel}</Tag>
              <Tag style={{ fontWeight: 600, margin: 0, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>
                {t("Total DB Rows", "Total Baris")}: {totalCount !== null ? totalCount.toLocaleString() : '...'}
              </Tag>
              <Button icon={<RefreshCw size={13} />} onClick={fetchLiveWarehouseData} loading={loading}>
                {t("Sync Supabase", "Sinkronisasi Data")}
              </Button>
            </Space>
          }
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12} lg={10}>
              <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>
                {t("Select Master Table:", "Pilih Master Tabel Terkoneksi:")}
              </Text>
              <Select 
                size="large"
                showSearch
                value={selectedTableId}
                onChange={setSelectedTableId}
                style={{ width: '100%' }}
                options={SCHEMA_CATALOG.map(t => ({ label: `${t.name} (${t.columns.length} attributes)`, value: t.id }))}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>
                {t("Search Live Records:", "Cari Baris Data Aktual:")}
              </Text>
              <Input 
                size="large"
                prefix={<Search size={15} color="#94A3B8" />}
                placeholder={t("Filter row contents...", "Cari kata kunci dalam baris...")}
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
                title={<Text style={{ fontWeight: 700 }}>{t("Supabase RLS Notice / Empty Table", "Catatan RLS Supabase / Tabel Kosong")}</Text>}
                description={t(`Server response: ${errorMsg}. Verify table creation in Supabase or ingest sample data.`, `Keterangan server: ${errorMsg}. Pastikan tabel sudah dibuat di Supabase.`)}
              />
            ) : records.length === 0 && !loading ? (
              <Empty description={t(`Table '${activeSchema.name}' is currently empty in Supabase.`, `Tabel '${activeSchema.name}' saat ini masih kosong di dalam database Supabase.`)} />
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
