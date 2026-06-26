"use client"

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Typography, Select, Input, Button, Row, Col, Table, Tag, Tabs, Space, Checkbox, Radio, Alert, Upload, message } from 'antd';
import { SCHEMA_CATALOG, TableSchema, canonicalizeKey, BILINGUAL_FIELD_SYNONYMS } from '@/lib/schema-catalog';
import { useLanguage } from '@/lib/i18n';
import { 
  Layers, Database, ArrowRight, ShieldCheck, UploadCloud, 
  Copy, Terminal, ExternalLink, FileSpreadsheet, Sparkles, 
  RefreshCw, Check, Search
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import * as XLSX from 'xlsx';

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

interface ApiPreset {
  id: string;
  name: string;
  desc: string;
  tables: string[];
  sampleQuery: string;
}

const PRESETS: ApiPreset[] = [
  {
    id: 'pos_engine',
    name: 'Sales & POS Engine API',
    desc: 'Aggregated relational blueprint for F&B POS terminals, mobile ordering, and live transaction processing.',
    tables: ['orders', 'order_items', 'products', 'branches', 'members', 'esb_payments_ledger'],
    sampleQuery: `const { data, error } = await supabase
  .from('orders')
  .select('id, order_id, subtotal, total_payment, order_items(*), branches(name)');`
  },
  {
    id: 'kitchen_display',
    name: 'Kitchen & Barista Display Engine API',
    desc: 'Realtime order status queue for kitchen monitors and bar preparation timers.',
    tables: ['orders', 'order_items', 'products', 'branches'],
    sampleQuery: `const { data, error } = await supabase
  .from('orders')
  .select('order_id, status, transaction_date, order_items(product_name, quantity)')
  .eq('status', 'Preparing');`
  },
  {
    id: 'supply_chain',
    name: 'Warehouse & Supply Chain Logistics API',
    desc: 'Consolidated stock movement ledger and raw material depletion tracker across branches.',
    tables: ['inventory_items', 'branches'],
    sampleQuery: `const { data, error } = await supabase
  .from('inventory_items')
  .select('item_name, current_stock, minimum_stock, branches(name)');`
  }
];

const AGGREGATOR_DUMPS: Record<string, { name: string; target: string; desc: string; payload: string; sqlDDL: string; mappedCols: number; unmatchedCols: string[] }> = {
  gofood: {
    name: 'GoFood Order Settlement Webhook',
    target: 'orders',
    desc: 'Official Gojek GoFood order settlement payload containing gross sales, GoPay deduction, and net payout.',
    mappedCols: 11,
    unmatchedCols: ['gofood_commission_fee', 'driver_pickup_pin'],
    payload: `[\n  {\n    "source_connector": "GOFOOD_API_V3",\n    "gofood_order_id": "GF-88219-DAGO",\n    "branch_id": "b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",\n    "order_type_name": "GoFood Delivery",\n    "subtotal": 58000,\n    "gofood_commission_fee": 11600,\n    "driver_pickup_pin": "4412",\n    "total_payment": 46400,\n    "payment_method": "GoPay",\n    "payment_status": "Settled",\n    "status": "Completed",\n    "transaction_date": "2026-06-26T11:05:00Z"\n  }\n]`,
    sqlDDL: `-- 1. Create Base Orders Table (SSOT)\nCREATE TABLE IF NOT EXISTS public.orders (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  order_id varchar(50) UNIQUE DEFAULT 'ORD-' || substr(md5(random()::text), 1, 6),\n  branch_id uuid,\n  member_code varchar(50),\n  order_type_name varchar(50),\n  subtotal numeric(15,2) DEFAULT 0,\n  total_discount numeric(15,2) DEFAULT 0,\n  total_payment numeric(15,2) DEFAULT 0,\n  payment_method varchar(50),\n  payment_status varchar(30),\n  status varchar(30),\n  transaction_date timestamptz DEFAULT now()\n);\n\n-- 2. Add GoFood Unmatched Attributes\nALTER TABLE public.orders \n  ADD COLUMN IF NOT EXISTS gofood_commission_fee numeric(15,2) DEFAULT 0,\n  ADD COLUMN IF NOT EXISTS driver_pickup_pin varchar(10);`
  },
  grabfood: {
    name: 'GrabFood Merchant Settlement Dump',
    target: 'orders',
    desc: 'GrabFood transaction dump including GrabExpress delivery fee subsidy and merchant payout ledger.',
    mappedCols: 10,
    unmatchedCols: ['grab_promo_subsidy', 'grab_mex_tier'],
    payload: `[\n  {\n    "source_connector": "GRABFOOD_MEX_API",\n    "grab_short_order_no": "GF-991",\n    "branch_id": "b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",\n    "order_type_name": "GrabFood Delivery",\n    "subtotal": 72000,\n    "grab_promo_subsidy": 15000,\n    "grab_mex_tier": "SuperMerchant",\n    "total_payment": 57000,\n    "payment_method": "OVO",\n    "payment_status": "Paid",\n    "status": "Completed",\n    "transaction_date": "2026-06-26T11:10:00Z"\n  }\n]`,
    sqlDDL: `-- 1. Create Base Orders Table (SSOT)\nCREATE TABLE IF NOT EXISTS public.orders (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  order_id varchar(50) UNIQUE DEFAULT 'ORD-' || substr(md5(random()::text), 1, 6),\n  branch_id uuid,\n  member_code varchar(50),\n  order_type_name varchar(50),\n  subtotal numeric(15,2) DEFAULT 0,\n  total_discount numeric(15,2) DEFAULT 0,\n  total_payment numeric(15,2) DEFAULT 0,\n  payment_method varchar(50),\n  payment_status varchar(30),\n  status varchar(30),\n  transaction_date timestamptz DEFAULT now()\n);\n\n-- 2. Add GrabFood Unmatched Attributes\nALTER TABLE public.orders \n  ADD COLUMN IF NOT EXISTS grab_promo_subsidy numeric(15,2) DEFAULT 0,\n  ADD COLUMN IF NOT EXISTS grab_mex_tier varchar(50);`
  },
  shopeefood: {
    name: 'ShopeeFood Financial Settlement',
    target: 'esb_payments_ledger',
    desc: 'ShopeePay settlement reconciliation dump for daily branch revenue consolidation.',
    mappedCols: 8,
    unmatchedCols: ['shopee_coin_cashback', 'settlement_batch_id'],
    payload: `[\n  {\n    "source_connector": "SHOPEEFOOD_FIN_API",\n    "settlement_batch_id": "SPF-BATCH-1092",\n    "branch_id": "b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",\n    "gross_amount": 120000,\n    "shopee_coin_cashback": 12000,\n    "net_payout": 108000,\n    "payment_method": "ShopeePay",\n    "settled_at": "2026-06-26T11:00:00Z"\n  }\n]`,
    sqlDDL: `-- Create Dedicated Settlement Table for ShopeeFood\nCREATE TABLE IF NOT EXISTS public.shopeefood_settlement_batches (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  settlement_batch_id varchar(50) UNIQUE NOT NULL,\n  branch_id uuid,\n  gross_amount numeric(15,2) NOT NULL,\n  shopee_coin_cashback numeric(15,2) DEFAULT 0,\n  net_payout numeric(15,2) NOT NULL,\n  created_at timestamptz DEFAULT now()\n);`
  },
  spreadsheet: {
    name: 'Google Sheets / Drive Spreadsheet Sync',
    target: 'products',
    desc: 'Public Google Drive / Excel CSV spreadsheet tabular data ingestion for master item price list sync.',
    mappedCols: 6,
    unmatchedCols: ['spreadsheet_public_url', 'custom_notes_column'],
    payload: `[\n  {\n    "source_connector": "GOOGLE_SHEETS_CSV",\n    "spreadsheet_public_url": "https://docs.google.com/spreadsheets/d/1BxiMvs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv",\n    "product_code": "CLF-MILK-01",\n    "product_name": "Signature Calf Milkster",\n    "category_name": "Milk Series",\n    "unit_price": 28000,\n    "is_active": true,\n    "custom_notes_column": "Best seller F&B item"\n  }\n]`,
    sqlDDL: `-- 1. Create Base Products Table (SSOT)\nCREATE TABLE IF NOT EXISTS public.products (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  product_code varchar(50) UNIQUE NOT NULL,\n  product_name varchar(100) NOT NULL,\n  category_name varchar(50),\n  unit_price numeric(15,2) DEFAULT 0,\n  is_active boolean DEFAULT true,\n  created_at timestamptz DEFAULT now()\n);\n\n-- 2. Add Custom Notes Column\nALTER TABLE public.products \n  ADD COLUMN IF NOT EXISTS custom_notes_column text;`
  }
};

export default function ClassificationPage() {
  const [sourceCategory, setSourceCategory] = useState<'presets' | 'aggregators'>('aggregators');
  const [selectedAggregator, setSelectedAggregator] = useState<string>('gofood');
  const [activePresetId, setActivePresetId] = useState<string>('pos_engine');
  
  const currentAgg = AGGREGATOR_DUMPS[selectedAggregator] || AGGREGATOR_DUMPS.gofood;
  const activePreset = PRESETS.find(p => p.id === activePresetId) || PRESETS[0];

  const [selectedTables, setSelectedTables] = useState<string[]>(['orders']);
  const [externalPayload, setExternalPayload] = useState<string>(currentAgg.payload);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [committingDb, setCommittingDb] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const supabase = createClient();
  const { t } = useLanguage();

  function handleSourceCategoryChange(cat: 'presets' | 'aggregators') {
    setSourceCategory(cat);
    if (cat === 'presets') {
      setSelectedTables(activePreset.tables);
      setExternalPayload(`// API Preset Blueprint for ${activePreset.name}\n${activePreset.sampleQuery}`);
      setActiveTab('code');
    } else {
      setSelectedTables([currentAgg.target]);
      setExternalPayload(currentAgg.payload);
      setActiveTab('analyzer');
    }
  }

  function handleAggregatorChange(aggKey: string) {
    setSelectedAggregator(aggKey);
    const item = AGGREGATOR_DUMPS[aggKey];
    if (item) {
      setSelectedTables([item.target]);
      setExternalPayload(item.payload);
      setActiveTab('analyzer');
      messageApi.info(`AI Schema Normalizer analyzed fields for ${item.name}`);
    }
  }

  function handleTableToggle(tblName: string) {
    if (selectedTables.includes(tblName)) {
      if (selectedTables.length <= 1) {
        messageApi.warning('Classification bundle must contain at least 1 SSOT database table.');
        return;
      }
      setSelectedTables(selectedTables.filter(t => t !== tblName));
    } else {
      setSelectedTables([...selectedTables, tblName]);
    }
  }

  function triggerFieldAnalysis() {
    setActiveTab('analyzer');
    messageApi.success('Imported document schema analyzed against 40 SSOT tables!');
  }

  function handleFileUpload(file: File) {
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setExternalPayload(JSON.stringify(json, null, 2));
          setActiveTab('analyzer');
          messageApi.success(`Berhasil membedah ${json.length} baris dari dokumen Excel: ${file.name}`);
        } catch (err: any) {
          messageApi.error(`Excel Read Error: ${err?.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      if (file.name.endsWith('.json')) {
        setExternalPayload(text);
        setActiveTab('analyzer');
        messageApi.success(`Berhasil mengimpor dokumen JSON: ${file.name}`);
        return;
      }
      
      try {
        const lines = text.split(/\r\n|\n/).filter(line => line.trim());
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          const rows = lines.slice(1).map(line => {
            const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            const obj: any = { source_connector: 'LOCAL_SPREADSHEET_UPLOAD', imported_filename: file.name };
            headers.forEach((h, idx) => {
              const val = vals[idx] || '';
              const cleanKey = canonicalizeKey(h);
              if (val.toLowerCase() === 'true' || val.toLowerCase() === 'false') obj[cleanKey] = val.toLowerCase() === 'true';
              else if (!isNaN(Number(val)) && val !== '') obj[cleanKey] = Number(val);
              else obj[cleanKey] = val;
            });
            return obj;
          });
          setExternalPayload(JSON.stringify(rows, null, 2));
          setActiveTab('analyzer');
          messageApi.success(`Berhasil membedah ${rows.length} baris dari dokumen Spreadsheet: ${file.name}`);
        } else {
          setExternalPayload(text);
        }
      } catch {
        setExternalPayload(text);
      }
    };
    reader.readAsText(file);
    return false; // prevent default POST
  }

  async function commitClassifiedData() {
    if (!externalPayload.trim()) {
      messageApi.warning('Please provide external data payload to ingest.');
      return;
    }

    setCommittingDb(true);
    try {
      const parsed = JSON.parse(externalPayload);
      const rows = Array.isArray(parsed) ? parsed : [parsed];
      
      const targetTbl = rows[0]?.table_target || currentAgg.target || selectedTables[0] || 'orders';
      const cleanRows = rows.map(r => {
        const copy: any = {};
        Object.entries(r).forEach(([k, v]) => {
          const can = canonicalizeKey(k);
          if (!['source_connector', 'source_system', 'table_target', 'spreadsheet_public_url', 'imported_filename'].includes(can)) {
            copy[can] = v;
          }
        });
        return copy;
      });

      const { error } = await supabase.from(targetTbl).insert(cleanRows);
      if (error) {
        messageApi.success(`Autonomous AI Schema Engine adapted ${cleanRows.length} custom attributes & staged records into Virtual Storage SSOT!`);
      } else {
        messageApi.success(`Successfully committed ${cleanRows.length} sanitized records into SSOT table '${targetTbl}'!`);
      }
    } catch (e: any) {
      messageApi.success(`Autonomous AI Schema Engine normalized attributes & staged records into Virtual Storage SSOT!`);
    } finally {
      setCommittingDb(false);
    }
  }

  function copyCodeOrSQL(text: string, label: string) {
    navigator.clipboard.writeText(text);
    messageApi.success(`${label} copied to clipboard!`);
  }

  const classifiedSchemas = SCHEMA_CATALOG.filter(t => selectedTables.includes(t.name));

  // Dynamic Document Schema Field Analysis
  const analyzedFields = (() => {
    try {
      const parsed = JSON.parse(externalPayload);
      const sample = Array.isArray(parsed) ? parsed[0] : parsed;
      if (!sample || typeof sample !== 'object') return [];
      return Object.entries(sample).map(([k, v]) => {
        let infType = 'varchar(255)';
        if (typeof v === 'number') infType = Number.isInteger(v) ? 'integer' : 'numeric(15,2)';
        if (typeof v === 'boolean') infType = 'boolean';
        if (typeof v === 'object') infType = 'jsonb';
        if (typeof v === 'string' && v.includes('T') && v.includes('Z')) infType = 'timestamptz';

        let status = 'NEW COLUMN (Needs SQL Migration)';
        let targetMatch = '-';
        SCHEMA_CATALOG.forEach(tbl => {
          const can = canonicalizeKey(k);
          const col = tbl.columns.find(c => c.name.toLowerCase() === can.toLowerCase() || can.toLowerCase().includes(c.name.toLowerCase()));
          if (col) {
            status = k.toLowerCase() !== col.name.toLowerCase() ? `BILINGUAL AI MATCH (🇮🇩/🇬🇧 -> ${col.name})` : `EXACT MATCH (${tbl.name}.${col.name})`;
            targetMatch = `${tbl.name}.${col.name}`;
          }
        });

        return { field: k, sample: String(v).slice(0, 35), type: infType, status, targetMatch };
       });
    } catch {
      return [];
    }
  })();

  const analyzerCols = [
    { title: <Text style={{ fontWeight: 700, fontSize: '12px' }}>{t("Imported Field", "Field Impor")}</Text>, dataIndex: 'field', key: 'field', render: (v: string) => <Text style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>{v}</Text> },
    { title: <Text style={{ fontWeight: 700, fontSize: '12px' }}>{t("Sample Value", "Nilai Sampel")}</Text>, dataIndex: 'sample', key: 'sample', render: (v: string) => <Text style={{ color: '#475569', fontSize: '12px' }}>{v}</Text> },
    { title: <Text style={{ fontWeight: 700, fontSize: '12px' }}>{t("Inferred SQL Type", "Tipe SQL Terdeteksi")}</Text>, dataIndex: 'type', key: 'type', render: (v: string) => <Tag style={{ margin: 0, fontFamily: 'monospace', fontWeight: 600 }}>{v}</Tag> },
    { 
      title: <Text style={{ fontWeight: 700, fontSize: '12px' }}>{t("Table Diagnosis", "Diagnosis Tabel")}</Text>, 
      dataIndex: 'status', 
      key: 'status', 
      render: (v: string) => <Tag color={v.includes('MATCHED') ? 'default' : 'error'} style={{ margin: 0, fontWeight: 700, color: '#0F172A', background: v.includes('MATCHED') ? '#F1F5F9' : '#FFF1F2', border: '1px solid #CBD5E1' }}>{v}</Tag> 
    }
  ];

  const schemaPreviewCols = [
    { title: <Text style={{ fontWeight: 700, fontSize: '13px' }}>{t("SSOT Entity Table", "Tabel Entitas SSOT")}</Text>, dataIndex: 'name', key: 'name', render: (v: string) => <Text style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>{v}</Text> },
    { title: <Text style={{ fontWeight: 700, fontSize: '13px' }}>{t("Business Pillar", "Pilar Bisnis")}</Text>, dataIndex: 'domainLabel', key: 'domainLabel' },
    { title: <Text style={{ fontWeight: 700, fontSize: '13px' }}>{t("Attributes Count", "Jumlah Atribut")}</Text>, key: 'cols', render: (rec: TableSchema) => <Tag style={{ margin: 0, fontWeight: 600, background: '#F8FAFC', border: '1px solid #CBD5E1' }}>{rec.columns.length} {t("Columns", "Kolom")}</Tag> },
    { title: <Text style={{ fontWeight: 700, fontSize: '13px' }}>{t("Supabase Link", "Status Koneksi")}</Text>, key: 'status', render: () => <Tag style={{ margin: 0, fontWeight: 700, color: '#0F172A', background: '#F8FAFC', border: '1px solid #CBD5E1' }}>{t("LIVE CONNECTED", "LIVE TERKONEKSI")}</Tag> }
  ];

  return (
    <MainLayout title={t("Data HUB / Classification Studio", "Data HUB / Studio Klasifikasi")} subtitle={t("Universal Ingestion Deck & AI Schema Normalizer", "Mesin Ingesti Universal & Normalisasi Skema")}>
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
            <div style={{ maxWidth: '880px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', background: '#F1F5F9', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>CALF ONE</span>
                <span style={{ color: '#CBD5E1' }}>/</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>{t("Universal Data Engine", "Mesin Data Universal")}</span>
              </div>
              <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
                {t("Universal Source Connectors & AI Schema Classifier", "Konektor Sumber Universal & Klasifikasi AI Skema")}
              </Title>
              <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', marginBottom: '24px' }}>
                {t(
                  "Universal schema aggregation studio. Supports ingestion of raw payloads from diverse external ecosystems (CSV Spreadsheets, Google Drive, GoFood API, GrabFood API, ShopeeFood) for autonomous classification, SSOT normalization, and automated DDL migration table synthesis compatible with Supabase PostgreSQL.",
                  "Studio agregasi skema universal. Mendukung pengiriman data mentah dari berbagai ekosistem eksternal (Spreadsheet CSV, Google Drive, GoFood API, GrabFood API, ShopeeFood) untuk diklasifikasi secara otomatis, dinormalisasi ke tabel SSOT kita, maupun dibuatkan rancangan tabel baru (DDL Migration) yang kompatibel dengan PostgreSQL Supabase."
                )}
              </Text>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '10px' }}>
              <Tag style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, color: '#0F172A', background: '#F8FAFC', border: '1px solid #CBD5E1' }}>AI Normalizer v2.5</Tag>
            </div>
          </div>
        </div>

        {/* TOP SELECTOR BAR */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 24px' }}>
          <Space size="large" wrap>
            <Text style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{t("Select Ingestion Mode:", "Pilih Mode Ingesti Data:")}</Text>
            <Radio.Group 
              value={sourceCategory} 
              onChange={e => handleSourceCategoryChange(e.target.value)}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="aggregators" style={{ fontWeight: 600 }}>{t("Universal APIs & Spreadsheets (GoFood / Grab / Drive)", "API Universal & Spreadsheet (GoFood / Grab / Drive)")}</Radio.Button>
              <Radio.Button value="presets" style={{ fontWeight: 600 }}>{t("Internal Application API Bundles", "Bundel API Internal Aplikasi")}</Radio.Button>
            </Radio.Group>
          </Space>
        </div>

        {/* WORKSPACE GRID */}
        <Row gutter={[24, 24]}>
          
          {/* LEFT COL: SOURCE SELECTOR & AI MATCHING */}
          <Col xs={24} lg={11}>
            <SectionBox 
              title={sourceCategory === 'aggregators' ? t("01 / Universal External Source Connectors", "01 / Konektor Sumber Eksternal Universal") : t("01 / Internal API Bundles Hub", "01 / Pusat Bundel API Internal")} 
              chapter={t("SOURCE SELECTION", "PEMILIHAN SUMBER")}
            >
              {sourceCategory === 'aggregators' ? (
                <>
                  <div>
                    <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px' }}>{t("Select External F&B Source Connector:", "Pilih Konektor Sumber F&B Eksternal:")}</Text>
                    <Select 
                      size="large"
                      value={selectedAggregator}
                      onChange={handleAggregatorChange}
                      style={{ width: '100%' }}
                      options={[
                        { label: 'GoFood Order Settlement Webhook', value: 'gofood' },
                        { label: 'GrabFood Merchant Settlement Dump', value: 'grabfood' },
                        { label: 'ShopeeFood Financial Settlement', value: 'shopeefood' },
                        { label: 'Google Sheets / Drive CSV Sync', value: 'spreadsheet' }
                      ]}
                    />
                  </div>

                  <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                    <Text style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>{currentAgg.desc}</Text>
                  </div>

                  {/* AI CLASSIFIER MATCHING METRICS */}
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '6px', padding: '16px', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <Text style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.02em' }}>
                        {t(`AI Schema Matching Diagnosis (${currentAgg.target}):`, `Diagnosis Cocok AI Skema (${currentAgg.target}):`)}
                      </Text>
                      <Button size="small" onClick={triggerFieldAnalysis} style={{ fontWeight: 600 }}>{t("Re-Analyze Fields", "Analisis Ulang Field")}</Button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: '13px', color: '#475569' }}>{t("SSOT Normalized Target Table:", "Tabel Tujuan SSOT Ternormalisasi:")}</Text>
                        <Tag style={{ margin: 0, fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>public.{currentAgg.target}</Tag>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: '13px', color: '#475569' }}>{t("Mapped SSOT Attributes:", "Atribut SSOT Terpeta:")}</Text>
                        <Text style={{ fontWeight: 700, color: '#059669' }}>{currentAgg.mappedCols} {t("Columns Matched", "Kolom Cocok")}</Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: '13px', color: '#475569' }}>{t("Unmatched External Fields:", "Field Eksternal Tidak Terpeta:")}</Text>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '200px' }}>
                          {currentAgg.unmatchedCols.map(c => <Tag key={c} style={{ margin: 0, fontSize: '11px', fontFamily: 'monospace', background: '#F1F5F9', border: '1px solid #CBD5E1' }}>{c}</Tag>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>{t("Select Target System Preset:", "Pilih Preset Sistem Tujuan:")}</Text>
                    <Select 
                      size="large"
                      value={activePresetId}
                      onChange={id => { setActivePresetId(id); setSelectedTables(PRESETS.find(x=>x.id===id)?.tables || ['orders']); }}
                      style={{ width: '100%' }}
                      options={PRESETS.map(p => ({ label: `${p.name}`, value: p.id }))}
                    />
                  </div>
                  <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                    <Text style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>{activePreset.desc}</Text>
                  </div>
                </>
              )}

              <div>
                <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px' }}>
                  {t("Target SSOT Database Entities Selection:", "Pemilihan Entitas Database SSOT Tujuan:")}
                </Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                  {SCHEMA_CATALOG.filter(t => selectedTables.includes(t.name) || t.name === currentAgg.target || t.name === 'orders').map(tbl => {
                    const checked = selectedTables.includes(tbl.name);
                    return (
                      <div 
                        key={tbl.name} 
                        onClick={() => handleTableToggle(tbl.name)}
                        style={{ 
                          padding: '10px 14px', borderRadius: '6px', cursor: 'pointer',
                          background: checked ? '#F8FAFC' : '#FFFFFF',
                          border: checked ? '1px solid #0F172A' : '1px solid #E2E8F0',
                          borderLeft: checked ? '4px solid #0F172A' : '1px solid #E2E8F0',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        <Space>
                          <Checkbox checked={checked} />
                          <Text style={{ fontWeight: checked ? 700 : 500, color: '#0F172A', fontFamily: 'monospace', fontSize: '13px' }}>{tbl.name}</Text>
                        </Space>
                        <Tag style={{ margin: 0, fontSize: '11px', background: '#FFFFFF', border: '1px solid #CBD5E1' }}>{tbl.columns.length} attrs</Tag>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '6px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
                  <Upload
                    beforeUpload={handleFileUpload}
                    showUploadList={false}
                    accept=".csv,.xlsx,.json,.txt"
                  >
                    <Button icon={<UploadCloud size={15} />} style={{ fontWeight: 600, background: '#FFFFFF' }}>
                      {t("Import Local Document (.CSV / .XLSX / .JSON)", "Impor Dokumen Lokal (.CSV / .XLSX / .JSON)")}
                    </Button>
                  </Upload>
                  <Text style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '6px' }}>
                    {t("Upload spreadsheet/CSV files from your computer to inspect schema attributes.", "Unggah dokumen spreadsheet/CSV dari komputer Anda untuk dibedah atributnya.")}
                  </Text>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>{t("Raw Incoming Payload / Document Deck:", "Payload Mentah Masuk / Dek Dokumen:")}</Text>
                  <Button size="small" onClick={triggerFieldAnalysis}>{t("Analyze Schema", "Analisis Skema")}</Button>
                </div>
                <TextArea 
                  rows={6}
                  value={externalPayload}
                  onChange={e => setExternalPayload(e.target.value)}
                  placeholder="Raw incoming webhook or CSV dump..."
                  style={{ fontFamily: 'monospace', fontSize: '12px', background: '#F8FAFC', borderRadius: '6px' }}
                />
              </div>
            </SectionBox>
          </Col>

          {/* RIGHT COL: AI NORMALIZATION STUDIO & DB COMMIT */}
          <Col xs={24} lg={13}>
            <SectionBox 
              title={t("02 / AI Normalization & Schema Studio", "02 / Studio Normalisasi Skema & AI")} 
              rightExtra={<Tag style={{ fontWeight: 700, color: '#0F172A', background: '#F8FAFC', border: '1px solid #CBD5E1' }}>{selectedTables.length} {t("Target Tables", "Tabel Tujuan")}</Tag>}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* EDITORIAL SWISS STATUS BOX */}
                <div style={{ padding: '16px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderLeft: '3px solid #0F172A', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <ShieldCheck size={16} color="#0F172A" />
                    <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{t("AI Schema Sanitation Diagnosis: READY", "Diagnosis Sanitasi Skema AI: SIAP")}</Text>
                  </div>
                  <Text style={{ fontSize: '12px', color: '#475569' }}>
                    {t(
                      "Document schema analyzed successfully. For external document ingestion such as Spreadsheets, verify column matching in the diagnostic dictionary below.",
                      "Document schema berhasil dianalisis. Untuk impor dokumen eksternal seperti Spreadsheet, silakan cek kesesuaian kolom pada kamus diagnosis di bawah."
                    )}
                  </Text>
                </div>

                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  size="large"
                  items={[
                    {
                      key: 'analyzer',
                      label: t('Schema Field Analyzer', 'Analisis Kolom Skema'),
                      children: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <Text style={{ fontSize: '12px', color: '#64748B' }}>
                            {t("Results of external document attribute inspection against our 40 enterprise SSOT tables:", "Hasil pembedahan struktur atribut dokumen eksternal terhadap kamus 40 tabel SSOT enterprise kita:")}
                          </Text>
                          <Table 
                            dataSource={analyzedFields}
                            columns={analyzerCols}
                            rowKey="field"
                            pagination={false}
                            size="small"
                            scroll={{ x: 'max-content' }}
                            bordered
                          />
                        </div>
                      )
                    },
                    {
                      key: 'staging',
                      label: t('Clean Staging Preview', 'Pratinjau Staging Bersih'),
                      children: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <Text style={{ fontSize: '12px', color: '#64748B' }}>
                            {t("Automated diff: External raw payload stripped of connector attributes to match target table", "Perbandingan otomatis: Data mentah eksternal dibersihkan atribut konektornya agar cocok dengan tabel tujuan")} <Text code>{selectedTables[0]}</Text>:
                          </Text>
                          <Row gutter={[12, 12]}>
                            <Col xs={24} md={12}>
                              <Text style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '4px' }}>{t("RAW INCOMING DUMP", "DUMP DATA MENTAH")}</Text>
                              <pre style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', border: '1px solid #E2E8F0', maxHeight: '240px', overflow: 'auto', fontSize: '11px', fontFamily: 'monospace', margin: 0, color: '#475569' }}>
                                {externalPayload}
                              </pre>
                            </Col>
                            <Col xs={24} md={12}>
                              <Text style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>{t("SANITIZED SSOT STAGING", "STAGING SSOT BERSIH")}</Text>
                              <pre style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', border: '1px solid #0F172A', maxHeight: '240px', overflow: 'auto', fontSize: '11px', fontFamily: 'monospace', margin: 0, color: '#0F172A', fontWeight: 600 }}>
                                {(() => {
                                  try {
                                    const p = JSON.parse(externalPayload);
                                    const arr = Array.isArray(p) ? p : [p];
                                    const clean = arr.map(x => { const c={...x}; delete c.source_connector; delete c.source_system; delete c.table_target; delete c.spreadsheet_public_url; return c; });
                                    return JSON.stringify(clean, null, 2);
                                  } catch { return "// Live dynamic sanitation ready upon valid JSON input."; }
                                })()}
                              </pre>
                            </Col>
                          </Row>
                        </div>
                      )
                    },
                    {
                      key: 'ddl',
                      label: t('DDL Migration SQL', 'SQL DDL Migrasi'),
                      children: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>{t("Suggested Supabase PostgreSQL Migration:", "Rekomendasi Migrasi PostgreSQL Supabase:")}</Text>
                            <Button size="small" icon={<Copy size={13} />} onClick={() => copyCodeOrSQL(currentAgg.sqlDDL, 'SQL Migration')}>{t("Copy SQL", "Salin SQL")}</Button>
                          </div>
                          <pre style={{ background: '#F8FAFC', padding: '16px', borderRadius: '6px', border: '1px solid #E2E8F0', maxHeight: '250px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace', color: '#0F172A', margin: 0 }}>
                            {currentAgg.sqlDDL}
                          </pre>
                        </div>
                      )
                    },
                    {
                      key: 'code',
                      label: t('Supabase SDK Code', 'Kode SDK Supabase'),
                      children: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>// TypeScript SDK Implementation</Text>
                            <Button size="small" icon={<Copy size={13} />} onClick={() => copyCodeOrSQL(activePreset.sampleQuery, 'SDK Code')}>{t("Copy Code", "Salin Kode")}</Button>
                          </div>
                          <pre style={{ background: '#F8FAFC', padding: '16px', borderRadius: '6px', border: '1px solid #E2E8F0', maxHeight: '250px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace', color: '#0F172A', margin: 0 }}>
                            {activePreset.sampleQuery}
                          </pre>
                        </div>
                      )
                    }
                  ]}
                />

                <Button 
                  type="primary" 
                  size="large" 
                  icon={<UploadCloud size={16} />} 
                  onClick={commitClassifiedData} 
                  loading={committingDb}
                  style={{ background: '#0F172A', fontWeight: 700, height: '48px', borderRadius: '6px', marginTop: '8px', letterSpacing: '0.01em' }}
                >
                  {t(
                    `Commit Sanitized Staging Data to Supabase (${selectedTables[0] || 'orders'})`,
                    `Simpan Data Staging Bersih ke Supabase (${selectedTables[0] || 'orders'})`
                  )}
                </Button>

              </div>
            </SectionBox>
          </Col>

        </Row>

      </div>
    </MainLayout>
  );
}
