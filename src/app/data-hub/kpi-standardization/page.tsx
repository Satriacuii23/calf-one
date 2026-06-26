"use client"

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/lib/i18n';
import { Typography, Tabs, Table, Button, Input, Select, Modal, Row, Col, Tag, Alert, message, Form, Space, Card, Tooltip } from 'antd';
import { SCHEMA_CATALOG } from '@/lib/schema-catalog';
import { 
  BarChart3, Sliders, Plus, CheckCircle2, AlertTriangle, 
  Sparkles, Database, Terminal, Calculator, Play, Edit3, 
  Trash2, ArrowRight, ShieldCheck, HelpCircle, RefreshCw, Layers
} from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

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

interface StandardRule {
  id: string;
  code: string;
  nameEn: string;
  nameId: string;
  aspect: 'revenue' | 'operations' | 'customer' | 'supply';
  benchmark: string;
  formula: string;
  ssotTable: string;
  severity: 'low' | 'medium' | 'critical';
  status: 'active' | 'draft';
}

const INITIAL_RULES: StandardRule[] = [
  {
    id: 'rule-1',
    code: 'KPI-REV-01',
    nameEn: 'Branch Gross Margin Benchmark',
    nameId: 'Standar Batas Bawah Margin Kotor Cabang',
    aspect: 'revenue',
    benchmark: '>= 68.0%',
    formula: '(net_sales - total_cogs) / net_sales * 100',
    ssotTable: 'orders',
    severity: 'critical',
    status: 'active'
  },
  {
    id: 'rule-2',
    code: 'KPI-OPS-01',
    nameEn: 'Barista Speed Preparation SLA',
    nameId: 'SLA Kecepatan Penyajian Barista',
    aspect: 'operations',
    benchmark: '< 180 sec',
    formula: 'AVG(ready_timestamp - order_timestamp)',
    ssotTable: 'orders',
    severity: 'medium',
    status: 'active'
  },
  {
    id: 'rule-3',
    code: 'KPI-CUST-01',
    nameEn: 'Customer Care Ticket Resolution SLA',
    nameId: 'Standar Waktu Resolusi Tiket Keluhan',
    aspect: 'customer',
    benchmark: '< 15 mins',
    formula: 'AVG(resolved_at - ticket_created_at)',
    ssotTable: 'customer_complaints',
    severity: 'critical',
    status: 'active'
  },
  {
    id: 'rule-4',
    code: 'KPI-SUP-01',
    nameEn: 'COGS Recipe Deviation Tolerance',
    nameId: 'Toleransi Penyimpangan Resep Bahan Baku',
    aspect: 'supply',
    benchmark: '<= 2.5%',
    formula: '(actual_grams_used - standard_recipe_grams) / standard_recipe_grams * 100',
    ssotTable: 'raw_inventory_ledger',
    severity: 'critical',
    status: 'active'
  },
  {
    id: 'rule-5',
    code: 'KPI-REV-02',
    nameEn: 'Average Basket Size Standard',
    nameId: 'Standar Nilai Transaksi Rata-Rata (Basket Size)',
    aspect: 'revenue',
    benchmark: '>= IDR 48,500',
    formula: 'SUM(total_payment) / COUNT(order_id)',
    ssotTable: 'orders',
    severity: 'low',
    status: 'active'
  },
  {
    id: 'rule-6',
    code: 'KPI-SUP-02',
    nameEn: 'Daily Milk & Bean Waste Allowance',
    nameId: 'Batas Maksimal Terbuang Susu & Biji Kopi',
    aspect: 'supply',
    benchmark: '<= 1.8%',
    formula: 'SUM(wasted_grams) / SUM(received_grams) * 100',
    ssotTable: 'raw_inventory_ledger',
    severity: 'medium',
    status: 'active'
  }
];

export default function KpiStandardizationPage() {
  const { t, lang } = useLanguage();
  const [messageApi, contextHolder] = message.useMessage();
  const [rules, setRules] = useState<StandardRule[]>(INITIAL_RULES);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingRule, setEditingRule] = useState<StandardRule | null>(null);
  
  // Sandbox Simulator State
  const [testFormula, setTestFormula] = useState<string>('(net_sales - total_cogs) / net_sales * 100');
  const [testNetSales, setTestNetSales] = useState<number>(12500000);
  const [testCogs, setTestCogs] = useState<number>(3750000);
  const [simResult, setSimResult] = useState<number | null>(70.0);

  const [form] = Form.useForm();

  // Handle AI Auto-Recommend
  const applyAiRecommendation = () => {
    const aiRule: StandardRule = {
      id: `rule-${Date.now()}`,
      code: 'KPI-AI-OPT',
      nameEn: 'AI Peak Hour Barista Allocation Ratio',
      nameId: 'Rasio Standar Alokasi Barista Jam Sibuk AI',
      aspect: 'operations',
      benchmark: '<= 22 orders/barista/hr',
      formula: 'COUNT(order_id) / active_barista_count',
      ssotTable: 'orders',
      severity: 'medium',
      status: 'active'
    };
    setRules([aiRule, ...rules]);
    messageApi.success(t("AI Standardization Rule applied and bound to SSOT!", "Aturan Standarisasi AI berhasil diterapkan & terikat ke SSOT!"));
  };

  // Filter rules
  const filteredRules = rules.filter(r => {
    const matchesTab = activeTab === 'all' || r.aspect === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch = r.code.toLowerCase().includes(q) || 
                          r.nameEn.toLowerCase().includes(q) || 
                          r.nameId.toLowerCase().includes(q) ||
                          r.ssotTable.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const handleOpenModal = (rule?: StandardRule) => {
    if (rule) {
      setEditingRule(rule);
      form.setFieldsValue({
        code: rule.code,
        nameEn: rule.nameEn,
        nameId: rule.nameId,
        aspect: rule.aspect,
        benchmark: rule.benchmark,
        formula: rule.formula,
        ssotTable: rule.ssotTable,
        severity: rule.severity,
        status: rule.status
      });
    } else {
      setEditingRule(null);
      form.resetFields();
      form.setFieldsValue({
        aspect: 'revenue',
        severity: 'medium',
        status: 'active',
        ssotTable: 'orders'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveRule = (values: any) => {
    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? { ...r, ...values } : r));
      messageApi.success(t("Standardization rule successfully updated!", "Aturan standarisasi berhasil diperbarui!"));
    } else {
      const newRule: StandardRule = {
        id: `rule-${Date.now()}`,
        code: values.code || `KPI-CUS-${Math.floor(100 + Math.random() * 900)}`,
        nameEn: values.nameEn,
        nameId: values.nameId || values.nameEn,
        aspect: values.aspect,
        benchmark: values.benchmark,
        formula: values.formula,
        ssotTable: values.ssotTable,
        severity: values.severity,
        status: values.status
      };
      setRules([newRule, ...rules]);
      messageApi.success(t("New enterprise standardization rule registered!", "Aturan standarisasi baru berhasil didaftarkan!"));
    }
    setIsModalOpen(false);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
    messageApi.success(t("Standardization rule archived.", "Aturan standarisasi diarsipkan."));
  };

  const toggleStatus = (id: string) => {
    setRules(rules.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'active' ? 'draft' : 'active';
        messageApi.info(t(`Rule status changed to ${nextStatus.toUpperCase()}`, `Status aturan diubah menjadi ${nextStatus.toUpperCase()}`));
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const runSimulation = () => {
    // Quick mock evaluation
    const calc = ((testNetSales - testCogs) / testNetSales) * 100;
    setSimResult(Number(calc.toFixed(2)));
    messageApi.success(t("Formula executed against test payload!", "Rumus berhasil dieksekusi terhadap data uji!"));
  };

  const aspectMap: Record<string, string> = {
    revenue: t("Revenue & Sales", "Pendapatan & Penjualan"),
    operations: t("Operations & SLA", "Operasional & SLA"),
    customer: t("Customer & Loyalty", "Pelanggan & Loyalty"),
    supply: t("Product & Supply", "Produk & Pasokan")
  };

  const columns = [
    {
      title: t("KPI Code & Metric Name", "Kode KPI & Nama Metrik"),
      key: 'metric',
      render: (_: any, record: StandardRule) => (
        <div>
          <Space>
            <Tag color="default" style={{ fontWeight: 700, fontFamily: 'monospace', color: '#0F172A', border: '1px solid #CBD5E1', background: '#F1F5F9' }}>
              {record.code}
            </Tag>
            <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
              {lang === 'id' ? record.nameId : record.nameEn}
            </Text>
          </Space>
          <div style={{ marginTop: '4px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {t("Formula:", "Rumus:")} <code style={{ color: '#334155', background: '#F8FAFC', padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>{record.formula}</code>
            </Text>
          </div>
        </div>
      )
    },
    {
      title: t("Corporate Aspect", "Aspek Korporat"),
      dataIndex: 'aspect',
      key: 'aspect',
      width: 180,
      render: (val: string) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', background: '#F8FAFC', padding: '4px 10px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
          {aspectMap[val] || val}
        </span>
      )
    },
    {
      title: t("SSOT Table Link", "Koneksi Tabel SSOT"),
      dataIndex: 'ssotTable',
      key: 'ssotTable',
      width: 160,
      render: (val: string) => (
        <Space size={4}>
          <Database size={14} color="#64748B" />
          <Text style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '12px', color: '#0F172A' }}>{val}</Text>
        </Space>
      )
    },
    {
      title: t("Standard Benchmark", "Target Standar"),
      dataIndex: 'benchmark',
      key: 'benchmark',
      width: 150,
      render: (val: string, record: StandardRule) => {
        const colorMap: Record<string, string> = {
          low: '#64748B',
          medium: '#D97706',
          critical: '#DC2626'
        };
        return (
          <div>
            <Text style={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>{val}</Text>
            <div style={{ marginTop: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: colorMap[record.severity], letterSpacing: '0.04em' }}>
                {t(`${record.severity} alert`, `siaga ${record.severity}`)}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      title: t("Status", "Status"),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (val: string) => (
        <Tag color={val === 'active' ? 'green' : 'default'} style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '11px' }}>
          {val === 'active' ? t("Active", "Aktif") : t("Draft", "Draf")}
        </Tag>
      )
    },
    {
      title: t("Actions", "Aksi"),
      key: 'actions',
      width: 140,
      render: (_: any, record: StandardRule) => (
        <Space>
          <Tooltip title={t("Edit Rule", "Edit Aturan")}>
            <Button size="small" type="text" icon={<Edit3 size={15} color="#0F172A" />} onClick={() => handleOpenModal(record)} />
          </Tooltip>
          <Tooltip title={t("Toggle Active / Draft", "Aktifkan / Draf")}>
            <Button size="small" type="text" icon={<RefreshCw size={15} color="#64748B" />} onClick={() => toggleStatus(record.id)} />
          </Tooltip>
          <Tooltip title={t("Delete", "Hapus")}>
            <Button size="small" type="text" danger icon={<Trash2 size={15} />} onClick={() => handleDeleteRule(record.id)} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <MainLayout title={t("Data HUB / KPI & Standardization", "Data HUB / KPI & Standarisasi")} subtitle={t("Enterprise Operational Metrics & Supporting Standardization Engine", "Metrik Operasional Enterprise & Mesin Standarisasi Pendukung")}>
      {contextHolder}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>
        
        {/* ZERO-TOUCH AI RECOMMENDER CARD */}
        <div style={{ 
          background: '#FFFFFF', 
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #0F172A', 
          borderRadius: '8px', 
          padding: '24px 28px', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '820px' }}>
            <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
              <Sparkles size={22} color="#0F172A" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, background: '#F1F5F9', color: '#0F172A', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                  {t("AI ZERO-TOUCH AGENT", "AGEN ZERO-TOUCH AI")}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>• {t("40 SSOT Tables Analyzed", "40 Tabel SSOT Teranalisis")}</span>
              </div>
              <Text style={{ color: '#0F172A', fontWeight: 800, fontSize: '15px', display: 'block', marginBottom: '2px' }}>
                {t(
                  "AI Recommendation: Standardize Barista Ratio During Peak Hours (<= 22 orders/hr) to guard customer retention.",
                  "Rekomendasi AI: Standarisasi Rasio Barista Jam Sibuk (<= 22 pesanan/jam) untuk menjaga retensi pembeli."
                )}
              </Text>
              <Text style={{ color: '#475569', fontSize: '13px', lineHeight: 1.5 }}>
                {t(
                  "Supporting standard automatically cross-references orders table against active shift headcount.",
                  "Standar pendukung ini secara otomatis mengalkulasi tabel orders dengan data absensi shift aktif."
                )}
              </Text>
            </div>
          </div>
          <Button 
            type="primary" 
            size="large" 
            style={{ background: '#0F172A', color: '#FFFFFF', fontWeight: 700, border: 'none', height: '42px', borderRadius: '6px' }}
            onClick={applyAiRecommendation}
          >
            {t("+ Apply AI Standard Rule", "+ Terapkan Aturan AI")}
          </Button>
        </div>

        {/* 4 ASPECT OVERVIEW CARDS */}
        <Row gutter={[16, 16]}>
          {[
            { title: t("Revenue & Sales Aspect", "Aspek Pendapatan & Penjualan"), count: rules.filter(r => r.aspect === 'revenue').length, desc: t("Margin, Basket Size, Discount Cap", "Margin, Basket Size, Batas Diskon") },
            { title: t("Operations & SLA Aspect", "Aspek Operasional & SLA"), count: rules.filter(r => r.aspect === 'operations').length, desc: t("Prep Speed, CCTV Uptime, Ticket SLA", "Kecepatan Saji, Uptime CCTV, SLA Tiket") },
            { title: t("Customer Experience Aspect", "Aspek Pengalaman Pelanggan"), count: rules.filter(r => r.aspect === 'customer').length, desc: t("VIP spend, Resolution Time, Churn Cap", "Belanja VIP, Waktu Resolusi, Churn") },
            { title: t("Supply & Product Aspect", "Aspek Pasokan & Produk"), count: rules.filter(r => r.aspect === 'supply').length, desc: t("Recipe Tolerance, Milk & Bean Waste", "Toleransi Resep, Terbuang Susu & Kopi") },
          ].map((asp, i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <div style={{ padding: '18px 20px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', height: '100%' }}>
                <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
                  {asp.title}
                </Text>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <Text style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{asp.count}</Text>
                  <Text style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{t("Rules Registered", "Aturan Terdaftar")}</Text>
                </div>
                <Text style={{ fontSize: '12px', color: '#64748B' }}>{asp.desc}</Text>
              </div>
            </Col>
          ))}
        </Row>

        {/* MAIN STANDARDIZATION CONFIGURATOR SECTION */}
        <SectionBox 
          title={t("Enterprise KPI & Standardization Catalog", "Katalog KPI & Standarisasi Perusahaan")}
          rightExtra={
            <Space>
              <Input 
                placeholder={t("Search rules, formulas, tables...", "Cari aturan, rumus, tabel...")} 
                style={{ width: 260 }}
                allowClear
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Button 
                type="primary" 
                icon={<Plus size={16} />}
                style={{ background: '#0F172A', fontWeight: 700 }}
                onClick={() => handleOpenModal()}
              >
                {t("New Standard Rule", "Buat Aturan Baru")}
              </Button>
            </Space>
          }
        >
          {/* ASPECT TABS FILTER */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            tabBarStyle={{ marginBottom: 16 }}
            items={[
              { key: 'all', label: <span style={{ fontWeight: 600, fontSize: '13px' }}>{t("All Aspects", "Semua Aspek")} ({rules.length})</span> },
              { key: 'revenue', label: <span style={{ fontWeight: 600, fontSize: '13px' }}>{t("Revenue & Sales", "Pendapatan & Penjualan")}</span> },
              { key: 'operations', label: <span style={{ fontWeight: 600, fontSize: '13px' }}>{t("Operations & SLA", "Operasional & SLA")}</span> },
              { key: 'customer', label: <span style={{ fontWeight: 600, fontSize: '13px' }}>{t("Customer & Loyalty", "Pelanggan & Loyalty")}</span> },
              { key: 'supply', label: <span style={{ fontWeight: 600, fontSize: '13px' }}>{t("Product & Supply", "Produk & Pasokan")}</span> },
            ]}
          />

          <Table 
            columns={columns} 
            dataSource={filteredRules} 
            rowKey="id" 
            pagination={{ pageSize: 8 }}
            bordered
          />
        </SectionBox>

        {/* CALCULATION SIMULATION SANDBOX SECTION */}
        <SectionBox title={t("Standardization Sandbox & Calculation Simulator", "Sandbox Standarisasi & Simulator Kalkulasi")}>
          <Text style={{ color: '#475569', fontSize: '14px' }}>
            {t(
              "Test custom standardization formulas against supporting data payloads before pushing rules into production.",
              "Uji coba rumus standarisasi terhadap payload data pendukung sebelum menerapkan aturan ke produksi."
            )}
          </Text>
          <div style={{ padding: '20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
            <Row gutter={[20, 20]} align="middle">
              <Col xs={24} lg={12}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <Text style={{ fontWeight: 700, fontSize: '12px', color: '#334155', display: 'block', marginBottom: '4px' }}>
                      {t("Formula Expression:", "Ekspresi Rumus:")}
                    </Text>
                    <Input 
                      value={testFormula} 
                      onChange={e => setTestFormula(e.target.value)} 
                      style={{ fontFamily: 'monospace', fontWeight: 600 }}
                    />
                  </div>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Text style={{ fontWeight: 700, fontSize: '12px', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        net_sales (IDR):
                      </Text>
                      <Input 
                        type="number"
                        value={testNetSales} 
                        onChange={e => setTestNetSales(Number(e.target.value))} 
                      />
                    </Col>
                    <Col span={12}>
                      <Text style={{ fontWeight: 700, fontSize: '12px', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        total_cogs (IDR):
                      </Text>
                      <Input 
                        type="number"
                        value={testCogs} 
                        onChange={e => setTestCogs(Number(e.target.value))} 
                      />
                    </Col>
                  </Row>
                  <Button type="default" icon={<Play size={14} />} onClick={runSimulation} style={{ width: '180px', fontWeight: 700 }}>
                    {t("Execute Sandbox", "Jalankan Tes")}
                  </Button>
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', textAlign: 'center' }}>
                  <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    {t("Simulation Output Benchmark", "Hasil Kalkulasi Benchmark")}
                  </Text>
                  <Text style={{ fontSize: '36px', fontWeight: 800, color: simResult && simResult >= 68.0 ? '#0F172A' : '#DC2626', display: 'block' }}>
                    {simResult !== null ? `${simResult}%` : '---'}
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    {simResult !== null && simResult >= 68.0 ? (
                      <Tag color="green" style={{ fontWeight: 700 }}>{t("PASSED STANDARD (>= 68.0%)", "MEMENUHI STANDAR (>= 68.0%)")}</Tag>
                    ) : (
                      <Tag color="red" style={{ fontWeight: 700 }}>{t("BREACHED STANDARD (< 68.0%)", "PELANGGARAN STANDAR (< 68.0%)")}</Tag>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </SectionBox>

        {/* MODAL CONFIGURATOR FORM */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#0F172A" />
              <Text style={{ fontWeight: 700, fontSize: '16px' }}>
                {editingRule ? t("Edit Standardization Rule", "Ubah Aturan Standarisasi") : t("Register New Standardization Rule", "Daftarkan Aturan Standarisasi Baru")}
              </Text>
            </div>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={650}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveRule} style={{ marginTop: 20 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="code" label={t("KPI Rule Code", "Kode Aturan KPI")} rules={[{ required: true }]}>
                  <Input placeholder="e.g. KPI-REV-09" style={{ fontFamily: 'monospace', fontWeight: 700 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="aspect" label={t("Corporate Aspect", "Aspek Korporat")} rules={[{ required: true }]}>
                  <Select>
                    <Option value="revenue">{t("Revenue & Sales", "Pendapatan & Penjualan")}</Option>
                    <Option value="operations">{t("Operations & SLA", "Operasional & SLA")}</Option>
                    <Option value="customer">{t("Customer & Loyalty", "Pelanggan & Loyalty")}</Option>
                    <Option value="supply">{t("Product & Supply", "Produk & Pasokan")}</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="nameEn" label={t("Standard Rule Name (English)", "Nama Aturan Standar (English)")} rules={[{ required: true }]}>
              <Input placeholder="e.g. Barista Order Fulfillment Standard" />
            </Form.Item>

            <Form.Item name="nameId" label={t("Standard Rule Name (Indonesian)", "Nama Aturan Standar (Indonesia)")}>
              <Input placeholder="misalnya Standar Penyelesaian Pesanan Barista" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="ssotTable" label={t("Supporting SSOT Database Table", "Tabel Database SSOT Pendukung")} rules={[{ required: true }]}>
                  <Select showSearch>
                    {SCHEMA_CATALOG.map(ts => (
                      <Option key={ts.name} value={ts.name}>
                        <span style={{ fontFamily: 'monospace' }}>{ts.name} ({ts.domain})</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="benchmark" label={t("Benchmark Target", "Target Benchmark")} rules={[{ required: true }]}>
                  <Input placeholder="e.g. >= 68.0% or < 15 mins" style={{ fontWeight: 700 }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="formula" label={t("Processing Formula Expression", "Rumus Pengolahan Data")} rules={[{ required: true }]}>
              <Input placeholder="e.g. SUM(net_sales) / COUNT(order_id)" style={{ fontFamily: 'monospace' }} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="severity" label={t("Breach Alert Severity", "Tingkat Siaga Pelanggaran")} rules={[{ required: true }]}>
                  <Select>
                    <Option value="low">{t("Low Notice", "Pemberitahuan Ringan")}</Option>
                    <Option value="medium">{t("Medium Warning", "Peringatan Sedang")}</Option>
                    <Option value="critical">{t("Critical Alert", "Siaga Kritis")}</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="status" label={t("Initial Status", "Status Awal")} rules={[{ required: true }]}>
                  <Select>
                    <Option value="active">{t("Active", "Aktif")}</Option>
                    <Option value="draft">{t("Draft", "Draf")}</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <Button onClick={() => setIsModalOpen(false)}>{t("Cancel", "Batal")}</Button>
              <Button type="primary" htmlType="submit" style={{ background: '#0F172A', fontWeight: 700 }}>
                {editingRule ? t("Save Changes", "Simpan Perubahan") : t("Register Rule", "Daftarkan Aturan")}
              </Button>
            </div>
          </Form>
        </Modal>

      </div>
    </MainLayout>
  );
}
