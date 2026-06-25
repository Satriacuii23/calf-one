"use client"

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Row, Col, Typography, Tag, Badge, Tabs, Progress } from 'antd';
import { 
  Database, LayoutDashboard, TrendingUp, ShieldAlert, Layers, Cpu, Users, 
  CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Activity, Target, Server, 
  BarChart3, FileText, Lock, Share2, HardDrive, Smartphone, Video, Wifi, Truck, 
  Box, HeartHandshake, Briefcase, Calendar, Code, GitBranch, Compass, Award,
  ListChecks, ArrowDown
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const { Title, Text } = Typography;

// Reusable polished Section Card
const SectionBox = ({ title, badge, icon: Icon, children, style, headerColor = '#0F172A' }: any) => (
  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)', height: '100%', display: 'flex', flexDirection: 'column', ...style }}>
    <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {Icon && <div style={{ padding: '6px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex' }}><Icon size={18} color={headerColor} /></div>}
        <Text style={{ fontSize: '15px', fontWeight: 800, color: headerColor, letterSpacing: '-0.01em' }}>{title}</Text>
      </div>
      {badge && <Tag color="blue" style={{ fontWeight: 700, margin: 0 }}>{badge}</Tag>}
    </div>
    <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {children}
    </div>
  </div>
);

const teamHeadcountData = [
  { phase: 'Phase 1', label: 'IT / Digital Lead', headcount: 1 },
  { phase: 'Phase 2', label: '+ Fullstack Dev', headcount: 2 },
  { phase: 'Phase 3', label: '+ BI Analyst', headcount: 3 },
  { phase: 'Phase 4', label: '+ Infra Eng', headcount: 4 },
  { phase: 'Phase 5', label: '+ Product Team', headcount: 7 },
];

export default function WhyCalfOnePage() {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <MainLayout title="Why CALF ONE Blueprint" subtitle="Strategic Enterprise Transformation Masterplan by Satria Muhammad A">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '60px' }}>
        
        {/* GRAND HERO BANNER */}
        <div style={{ 
          background: 'linear-gradient(135deg, #0B192C 0%, #1E3E62 50%, #000000 100%)', 
          borderRadius: '20px', 
          padding: '36px 40px', 
          color: '#FFFFFF', 
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ position: 'absolute', right: -30, bottom: -30, opacity: 0.07 }}>
            <Database size={320} color="#FFFFFF" />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <Tag color="#1F5EFF" style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, border: 'none' }}>STRATEGIC BLUEPRINT</Tag>
              <Text style={{ color: '#94A3B8', fontSize: '13px', fontWeight: 600 }}>PRESENTED BY SATRIA MUHAMMAD A</Text>
            </div>
            <Title level={1} style={{ color: '#FFFFFF', fontSize: '38px', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 16px 0', lineHeight: 1.15 }}>
              CALF ONE : Building a True Data-Driven Coffee & Milkbar Enterprise
            </Title>
            <Text style={{ color: '#E2E8F0', fontSize: '16px', lineHeight: 1.6, display: 'block', marginBottom: '24px' }}>
              Rekomendasi utama transformasi digital perusahaan adalah membangun <strong style={{ color: '#60A5FA' }}>CALF Data Hub</strong> sebagai fondasi inti sebelum mengembangkan aplikasi downstream seperti CRM, Loyalty, Customer Care, Mobile Apps, ERP, maupun AI.
            </Text>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', padding: '10px 20px', borderRadius: '10px' }}>
              <Sparkles size={18} color="#F87171" />
              <Text style={{ color: '#FEF2F2', fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>PRINSIP UTAMA: START WITH DATA, NOT APPLICATIONS.</Text>
            </div>
          </div>
        </div>

        {/* STRUCTURED CHAPTER TAB NAVIGATION */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          size="large"
          tabBarStyle={{ marginBottom: 0 }}
          items={[
            {
              key: '1',
              label: <span style={{ fontWeight: 700, fontSize: '14px' }}>1️⃣ Summary & Vision (Bab 1 - 3)</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                  
                  {/* BAB 1: EXECUTIVE SUMMARY */}
                  <SectionBox title="BAB 1 - EXECUTIVE SUMMARY" badge="Fondasi Utama" icon={Award} headerColor="#1F5EFF">
                    <Text style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>
                      Kopi Calf memiliki peluang besar untuk membangun fondasi digital yang kuat melalui pendekatan <strong>Data-Driven Company</strong>. Rekomendasi utama adalah membangun <strong>CALF Data Hub</strong> sebagai fondasi sebelum membangun CRM, Loyalty, Customer Care, Mobile Apps, ERP maupun AI.
                    </Text>
                    <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px 20px', borderRadius: '10px', textAlign: 'center' }}>
                      <Text style={{ color: '#1D4ED8', fontWeight: 900, fontSize: '16px', letterSpacing: '0.04em' }}>PRINSIP UTAMA: START WITH DATA, NOT APPLICATIONS.</Text>
                    </div>
                    <div>
                      <Text style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>Target Akhir Transformasi:</Text>
                      <Row gutter={[12, 12]}>
                        {[
                          { t: 'Single Source of Truth', d: 'Satu sumber data konsisten seluruh perusahaan', ic: Database, col: '#2563EB' },
                          { t: 'Realtime Management Dashboard', d: 'Pemantauan performa bisnis detik ini juga', ic: LayoutDashboard, col: '#059669' },
                          { t: 'Customer Intelligence', d: 'Pemahaman mendalam perilaku konsumen', ic: Users, col: '#D97706' },
                          { t: 'Operational Visibility', d: 'Visibilitas total cabang dan logistik', ic: Video, col: '#7C3AED' },
                          { t: 'AI Ready Organization', d: 'Organisasi siap mengadopsi kecerdasan buatan', ic: Cpu, col: '#EC4899' },
                        ].map((item, i) => (
                          <Col xs={24} sm={12} md={8} key={i}>
                            <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', height: '100%', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <div style={{ padding: '8px', background: `${item.col}15`, color: item.col, borderRadius: '8px' }}><item.ic size={18} /></div>
                              <div>
                                <Text style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '13px' }}>{item.t}</Text>
                                <Text style={{ fontSize: '12px', color: '#64748B' }}>{item.d}</Text>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </SectionBox>

                  {/* BAB 2: CURRENT STATE ASSESSMENT */}
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={14}>
                      <SectionBox title="BAB 2 - CURRENT STATE ASSESSMENT" badge="Temuan Awal" icon={AlertTriangle} headerColor="#D97706">
                        <Text style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>Hasil audit kondisi ekosistem digital Kopi Calf saat ini:</Text>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                          {[
                            "1. Data transaksi berada di POS",
                            "2. Data operasional masih tersebar",
                            "3. Customer complaint belum terpusat",
                            "4. Loyalty belum tersedia",
                            "5. CRM belum tersedia",
                            "6. Customer Care belum tersedia",
                            "7. Mobile Apps belum tersedia",
                            "8. Social Media Intel belum tersedia",
                            "9. CCTV belum terpusat",
                            "10. Belum ada Data Warehouse",
                            "11. Belum ada Executive Dashboard",
                          ].map((tem, idx) => (
                            <div key={idx} style={{ padding: '10px 14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Badge status="warning" />
                              <Text style={{ fontSize: '13px', fontWeight: 600, color: '#92400E' }}>{tem}</Text>
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </Col>
                    
                    <Col xs={24} lg={10}>
                      <SectionBox title="DAMPAK KRITIS SYSTEMIC" badge="Risk Bottleneck" icon={ShieldAlert} headerColor="#EF4444">
                        <Text style={{ color: '#64748B', fontSize: '14px' }}>Kondisi di atas menimbulkan 4 bottleneck utama pada pertumbuhan bisnis:</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {[
                            { t: 'Pengambilan Keputusan Lambat', d: 'Manajemen menunggu siklus rekapitulasi manual.' },
                            { t: 'Banyak Proses Manual', d: 'Waktu tim habis untuk input ulang dan mencocokkan data.' },
                            { t: 'Sulit Mendapat Insight Lintas Divisi', d: 'Data sales, ops, dan finance berjalan sendiri-sendiri.' },
                            { t: 'Ketergantungan Pada Laporan Manual', d: 'Rawan human error dan perbedaan standar hitung.' },
                          ].map((damp, di) => (
                            <div key={di} style={{ padding: '14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', borderLeft: '4px solid #EF4444' }}>
                              <Text style={{ fontWeight: 800, color: '#991B1B', display: 'block', fontSize: '13px' }}>{damp.t}</Text>
                              <Text style={{ color: '#B91C1C', fontSize: '12px' }}>{damp.d}</Text>
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </Col>
                  </Row>

                  {/* BAB 3: VISION CALF ONE */}
                  <SectionBox title="BAB 3 - VISION CALF ONE" badge="Ekosistem Terpadu" icon={Compass} headerColor="#0284C7">
                    <div style={{ background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', padding: '24px', borderRadius: '12px', color: '#FFFFFF', textAlign: 'center' }}>
                      <Text style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, lineHeight: 1.6, display: 'block', maxWidth: '800px', margin: '0 auto' }}>
                        &quot;CALF ONE adalah ekosistem digital Kopi Calf yang menghubungkan seluruh data, operasional, customer, dan management ke dalam satu platform terpadu.&quot;
                      </Text>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                      {[
                        "ONE DATA", "ONE SOURCE OF TRUTH", "ONE CUSTOMER VIEW", "ONE OPERATIONS VIEW", "ONE DIGITAL ECOSYSTEM"
                      ].map((pillar, pi) => (
                        <div key={pi} style={{ padding: '16px 10px', background: '#F0F9FF', border: '2px solid #BAE6FD', borderRadius: '10px', textAlign: 'center' }}>
                          <Text style={{ fontWeight: 900, color: '#0369A1', fontSize: '13px', letterSpacing: '0.02em' }}>{pillar}</Text>
                        </div>
                      ))}
                    </div>
                  </SectionBox>

                </div>
              )
            },
            {
              key: '2',
              label: <span style={{ fontWeight: 700, fontSize: '14px' }}>2️⃣ Data Hub & Arch (Bab 4,5,8,10)</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                  
                  {/* BAB 4: WHY CALF DATA HUB */}
                  <SectionBox title="BAB 4 - WHY CALF DATA HUB" badge="Core Hub" icon={Database} headerColor="#059669">
                    <Text style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>
                      <strong>CALF Data Hub</strong> adalah pusat data perusahaan. Seluruh data perusahaan akan dikumpulkan, divalidasi, disimpan, dan didistribusikan dari satu platform tunggal.
                    </Text>
                    <Text style={{ fontWeight: 800, fontSize: '13px', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Business Value Inti:</Text>
                    <Row gutter={[12, 12]}>
                      {[
                        "Realtime visibility", "Single source of truth", "Faster decision making", "Reduced manual reporting", "Foundation for CRM, Loyalty, Care, Mobile Apps, and AI"
                      ].map((val, vi) => (
                        <Col xs={24} sm={12} md={8} key={vi}>
                          <div style={{ padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 size={18} color="#059669" />
                            <Text style={{ fontWeight: 700, color: '#065F46', fontSize: '13px' }}>{val}</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </SectionBox>

                  {/* BAB 5: ENTERPRISE ARCHITECTURE */}
                  <SectionBox title="BAB 5 - ENTERPRISE ARCHITECTURE" badge="Arsitektur Lapisan" icon={Layers} headerColor="#1F5EFF">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
                      
                      {/* Source Layer */}
                      <div style={{ padding: '16px', background: '#F1F5F9', borderRadius: '12px', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>LAPISAN SUMBER (SOURCE DATA)</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                          {["Sales Data", "Customer Data", "Finance Data", "HR Data", "Inventory Data", "Operations Data", "Marketing Data", "Infrastructure Data"].map((src, si) => (
                            <Tag key={si} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '4px 10px', fontWeight: 700, color: '#334155' }}>{src}</Tag>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={24} color="#94A3B8" /></div>

                      {/* Core Data Hub */}
                      <div style={{ padding: '24px', background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)', borderRadius: '14px', textAlign: 'center', boxShadow: '0 8px 20px rgba(30, 58, 138, 0.25)' }}>
                        <Database size={32} color="#FFFFFF" style={{ margin: '0 auto 8px auto' }} />
                        <Title level={3} style={{ color: '#FFFFFF', margin: 0, fontWeight: 900, letterSpacing: '0.05em' }}>CALF DATA HUB</Title>
                        <Text style={{ color: '#93C5FD', fontSize: '12px', fontWeight: 600 }}>Centralized Data Collection, Validation & Distribution</Text>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={24} color="#94A3B8" /></div>

                      {/* Intelligence Layer */}
                      <div style={{ padding: '16px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '12px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>LAPISAN KECERDASAN (INTELLIGENCE LAYER)</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
                          {["Executive Command Center", "Operations Command Center", "Customer Intelligence"].map((intl, ii) => (
                            <Tag key={ii} color="orange" style={{ padding: '6px 14px', fontSize: '13px', fontWeight: 800 }}>{intl}</Tag>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={24} color="#94A3B8" /></div>

                      {/* Downstream Applications */}
                      <div style={{ padding: '16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 800, color: '#047857', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>APLIKASI MASA DEPAN (DOWNSTREAM APPLICATIONS)</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                          {["CRM", "Loyalty", "Customer Care", "Mobile Apps", "AI"].map((app, ai) => (
                            <Tag key={ai} color="green" style={{ padding: '4px 12px', fontSize: '13px', fontWeight: 800 }}>{app}</Tag>
                          ))}
                        </div>
                      </div>

                    </div>
                  </SectionBox>

                  {/* BAB 8 & BAB 10 */}
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                      <SectionBox title="BAB 8 - DATA FLOW PIPELINE" badge="Alur Proses" icon={GitBranch} headerColor="#7C3AED">
                        <Text style={{ color: '#64748B', fontSize: '13px' }}>7 tahapan mengalirkan data mentah menjadi keputusan strategis:</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[
                            "1. Source Systems",
                            "2. Data Acquisition Layer",
                            "3. Raw Data Layer",
                            "4. Validation Layer",
                            "5. Transformation Layer",
                            "6. Data Warehouse",
                            "7. Dashboard & Applications"
                          ].map((step, stI) => (
                            <div key={stI} style={{ padding: '10px 14px', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', fontWeight: 700, color: '#5B21B6', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{step}</span>
                              <Badge status="processing" />
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={12}>
                      <SectionBox title="BAB 10 - CALF DATA WAREHOUSE" badge="Schema Layer" icon={HardDrive} headerColor="#2563EB">
                        <Text style={{ color: '#64748B', fontSize: '13px' }}>Struktur penyimpanan terstandarisasi di dalam Data Warehouse:</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ padding: '12px', background: '#EFF6FF', borderLeft: '4px solid #3B82F6', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 800, color: '#1E40AF', display: 'block', fontSize: '13px' }}>Raw Layer (Data Mentah):</Text>
                            <Code style={{ fontSize: '12px', color: '#1D4ED8' }}>raw_sales, raw_customer, raw_finance, raw_hr</Code>
                          </div>
                          <div style={{ padding: '12px', background: '#ECFDF5', borderLeft: '4px solid #10B981', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 800, color: '#065F46', display: 'block', fontSize: '13px' }}>Business Layer (Fakta Bisnis):</Text>
                            <Code style={{ fontSize: '12px', color: '#047857' }}>fact_sales, fact_customer, fact_product, fact_outlet, fact_inventory</Code>
                          </div>
                          <div style={{ padding: '12px', background: '#FFF7ED', borderLeft: '4px solid #F97316', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 800, color: '#9A3412', display: 'block', fontSize: '13px' }}>Dimension Layer (Dimensi Referensi):</Text>
                            <Code style={{ fontSize: '12px', color: '#C2410C' }}>dim_date, dim_product, dim_customer, dim_outlet</Code>
                          </div>
                          <div style={{ background: '#0F172A', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                            <Text style={{ color: '#38BDF8', fontWeight: 800, fontSize: '13px' }}>OUTPUT: SINGLE SOURCE OF TRUTH</Text>
                          </div>
                        </div>
                      </SectionBox>
                    </Col>
                  </Row>

                </div>
              )
            },
            {
              key: '3',
              label: <span style={{ fontWeight: 700, fontSize: '14px' }}>3️⃣ Domains & Strategy (Bab 6,7,9,16)</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                  
                  {/* BAB 6: DATA DOMAIN */}
                  <SectionBox title="BAB 6 - DATA DOMAINS ENTERPRISE" badge="10 Domain" icon={Box} headerColor="#0F172A">
                    <Text style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>Pemetaan 10 domain data spesifik di dalam ekosistem Kopi Calf:</Text>
                    <Row gutter={[16, 16]}>
                      {[
                        { dom: 'Sales Domain', sub: 'Revenue, Transaction, Promotion, Refund', col: 'blue' },
                        { dom: 'Customer Domain', sub: 'Customer Profile, Visit, Purchase History', col: 'cyan' },
                        { dom: 'Product Domain', sub: 'Product, Category, Recipe, COGS', col: 'green' },
                        { dom: 'Inventory Domain', sub: 'Stock, Waste, Transfer', col: 'orange' },
                        { dom: 'Finance Domain', sub: 'Revenue, Expense, Budget', col: 'gold' },
                        { dom: 'HR Domain', sub: 'Employee, Attendance, Payroll', col: 'purple' },
                        { dom: 'Operations Domain', sub: 'Checklist, Incident, Outlet Performance', col: 'geekblue' },
                        { dom: 'Customer Care Domain', sub: 'Complaint, Feedback, Review', col: 'magenta' },
                        { dom: 'Infrastructure Domain', sub: 'CCTV, Internet, Device, Asset', col: 'red' },
                        { dom: 'Marketing Domain', sub: 'Campaign, Social Media, Engagement', col: 'lime' },
                      ].map((dm, di) => (
                        <Col xs={24} sm={12} md={8} xl={6} key={di}>
                          <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px', background: '#F8FAFC', height: '100%' }}>
                            <Tag color={dm.col} style={{ fontWeight: 800, marginBottom: '8px', display: 'inline-block' }}>{dm.dom.toUpperCase()}</Tag>
                            <Text style={{ fontSize: '12px', color: '#475569', display: 'block', fontWeight: 600 }}>{dm.sub}</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </SectionBox>

                  {/* BAB 7 & BAB 9 */}
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={14}>
                      <SectionBox title="BAB 7 - DATA ACQUISITION STRATEGY" badge="Metode Akuisisi" icon={Share2} headerColor="#0284C7">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { t: 'A. File Integration', d: 'CSV, Excel, Google Sheet' },
                            { t: 'B. API Integration', d: 'POS, HR System, Third Party System' },
                            { t: 'C. Manual Operational Form', d: 'Complaint, Checklist, Incident, Stock Opname' },
                            { t: 'D. Device Integration', d: 'CCTV, GPS, IoT' },
                            { t: 'E. Future Event Streaming', d: 'Kafka, Event Bus' },
                          ].map((acq, ai) => (
                            <div key={ai} style={{ padding: '12px 16px', background: '#F0F9FF', border: '1px solid #E0F2FE', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                              <Text style={{ fontWeight: 800, color: '#0369A1', fontSize: '13px' }}>{acq.t}</Text>
                              <Text style={{ fontSize: '12px', color: '#0284C7', fontWeight: 600 }}>{acq.d}</Text>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: '8px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #0284C7' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Tujuan: Mengakomodasi seluruh tingkat kematangan digital perusahaan.</Text>
                        </div>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={10}>
                      <SectionBox title="BAB 9 - DATA GOVERNANCE" badge="Tata Kelola" icon={Lock} headerColor="#4338CA">
                        <Text style={{ color: '#64748B', fontSize: '13px' }}>Struktur kewenangan dan akuntabilitas data:</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ padding: '14px', background: '#EEF2FF', borderRadius: '8px', border: '1px solid #E0E7FF' }}>
                            <Text style={{ fontWeight: 800, color: '#3730A3', display: 'block', fontSize: '13px' }}>Data Owner (Pemilik Data):</Text>
                            <Text style={{ fontSize: '12px', color: '#4F46E5' }}>Finance, HR, Operations, Marketing</Text>
                          </div>
                          <div style={{ padding: '14px', background: '#F5F3FF', borderRadius: '8px', border: '1px solid #EDE9FE' }}>
                            <Text style={{ fontWeight: 800, color: '#5B21B6', display: 'block', fontSize: '13px' }}>Data Steward (Pengelola):</Text>
                            <Text style={{ fontSize: '12px', color: '#7C3AED' }}>IT / Data Team</Text>
                          </div>
                          <div style={{ padding: '14px', background: '#ECFDF5', borderRadius: '8px', border: '1px solid #D1FAE5' }}>
                            <Text style={{ fontWeight: 800, color: '#065F46', display: 'block', fontSize: '13px' }}>Data Consumer (Pengguna):</Text>
                            <Text style={{ fontSize: '12px', color: '#059669' }}>Founder, COO, Manager, Supervisor</Text>
                          </div>
                        </div>
                        <div style={{ padding: '10px', background: '#4338CA', color: '#FFF', borderRadius: '8px', textAlign: 'center' }}>
                          <Text style={{ color: '#E0E7FF', fontWeight: 800, fontSize: '12px' }}>TUJUAN: MENJAMIN KUALITAS, KEAMANAN & KONSISTENSI</Text>
                        </div>
                      </SectionBox>
                    </Col>
                  </Row>

                  {/* BAB 16: KPI DICTIONARY */}
                  <SectionBox title="BAB 16 - KPI DICTIONARY ENTERPRISE" badge="12 Matrik Utama" icon={ListChecks} headerColor="#1E293B">
                    <Text style={{ color: '#64748B', fontSize: '14px', marginBottom: '6px' }}>Kamus KPI terstandarisasi yang akan diukur secara otomatis oleh sistem:</Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {[
                        "Revenue", "Revenue Growth", "Transaction Growth", "Average Basket", 
                        "Top Product", "Slow Moving Product", "Outlet Growth", "Customer Growth", 
                        "Retention Rate", "Churn Rate", "Complaint Resolution", "Company Health Score"
                      ].map((kpiName, kI) => (
                        <div key={kI} style={{ padding: '8px 16px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={14} color="#3B82F6" />
                          <Text style={{ fontWeight: 800, color: '#1E293B', fontSize: '13px' }}>{kpiName}</Text>
                        </div>
                      ))}
                    </div>
                  </SectionBox>

                </div>
              )
            },
            {
              key: '4',
              label: <span style={{ fontWeight: 700, fontSize: '14px' }}>4️⃣ Command Centers (Bab 11 - 13)</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                  
                  {/* BAB 11: EXECUTIVE COMMAND CENTER */}
                  <SectionBox title="BAB 11 - EXECUTIVE COMMAND CENTER" badge="Dashboard Founder" icon={LayoutDashboard} headerColor="#1F5EFF">
                    <Text style={{ fontSize: '15px', color: '#334155', marginBottom: '8px' }}>Dashboard pemantauan strategis khusus Founder & Management:</Text>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={8}>
                        <div style={{ padding: '18px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', height: '100%' }}>
                          <Text style={{ fontWeight: 900, color: '#1E40AF', fontSize: '14px', display: 'block', marginBottom: '10px' }}>📈 Revenue Intelligence</Text>
                          <ul style={{ margin: 0, paddingLeft: '18px', color: '#1D4ED8', fontWeight: 600, fontSize: '13px', lineHeight: 1.8 }}>
                            <li>Revenue Today</li>
                            <li>Revenue MTD</li>
                            <li>Revenue YTD</li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div style={{ padding: '18px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', height: '100%' }}>
                          <Text style={{ fontWeight: 900, color: '#065F46', fontSize: '14px', display: 'block', marginBottom: '10px' }}>🏪 Outlet Intelligence</Text>
                          <ul style={{ margin: 0, paddingLeft: '18px', color: '#047857', fontWeight: 600, fontSize: '13px', lineHeight: 1.8 }}>
                            <li>Top Outlet</li>
                            <li>Bottom Outlet</li>
                            <li>Growth Outlet</li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div style={{ padding: '18px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', height: '100%' }}>
                          <Text style={{ fontWeight: 900, color: '#9A3412', fontSize: '14px', display: 'block', marginBottom: '10px' }}>👥 Customer Intelligence</Text>
                          <ul style={{ margin: 0, paddingLeft: '18px', color: '#C2410C', fontWeight: 600, fontSize: '13px', lineHeight: 1.8 }}>
                            <li>New Customer</li>
                            <li>Repeat Customer</li>
                            <li>VIP Customer</li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '4px' }}>
                      <div style={{ padding: '14px', background: '#0F172A', color: '#FFF', borderRadius: '10px', textAlign: 'center' }}>
                        <Text style={{ color: '#10B981', fontWeight: 900, fontSize: '14px' }}>💖 COMPANY HEALTH SCORE</Text>
                      </div>
                      <div style={{ padding: '14px', background: '#991B1B', color: '#FFF', borderRadius: '10px', textAlign: 'center' }}>
                        <Text style={{ color: '#FECACA', fontWeight: 900, fontSize: '14px' }}>🚨 RISK ALERT CENTER</Text>
                      </div>
                    </div>
                  </SectionBox>

                  {/* BAB 12 & BAB 13 */}
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                      <SectionBox title="BAB 12 - OPERATIONS COMMAND CENTER" badge="Central Ops" icon={Video} headerColor="#059669">
                        <Text style={{ color: '#64748B', fontSize: '13px', marginBottom: '6px' }}>Centralized Monitoring fisik dan infrastruktur cabang:</Text>
                        <Row gutter={[12, 12]}>
                          {[
                            { t: 'CCTV Monitoring', ic: Video },
                            { t: 'Internet Monitoring', ic: Wifi },
                            { t: 'Device Monitoring', ic: Smartphone },
                            { t: 'Asset Monitoring', ic: HardDrive },
                            { t: 'Vehicle Monitoring', ic: Truck },
                            { t: 'Incident Monitoring', ic: AlertTriangle },
                          ].map((mon, mI) => (
                            <Col xs={12} sm={8} key={mI}>
                              <div style={{ padding: '12px 8px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                <mon.ic size={18} color="#059669" />
                                <Text style={{ fontSize: '11px', fontWeight: 800, color: '#065F46' }}>{mon.t}</Text>
                              </div>
                            </Col>
                          ))}
                        </Row>
                        <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #059669', marginTop: '4px' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Tujuan: Memberikan visibilitas operasional seluruh outlet dari pusat.</Text>
                        </div>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={12}>
                      <SectionBox title="BAB 13 - CUSTOMER INTELLIGENCE" badge="Cust 360" icon={Users} headerColor="#D97706">
                        <Text style={{ color: '#64748B', fontSize: '13px', marginBottom: '6px' }}>Customer 360 View untuk memahami profil setiap pembeli:</Text>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                          {[
                            "Customer Profile", "Purchase History", "Frequency", "Monetary Value", "Segment", "Churn Indicator"
                          ].map((c360, ci) => (
                            <div key={ci} style={{ padding: '10px 12px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontWeight: 800, color: '#92400E', fontSize: '12px', textAlign: 'center' }}>
                              {c360}
                            </div>
                          ))}
                        </div>
                        <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #D97706', marginTop: '12px' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Output: Data-driven marketing dan loyalty strategy.</Text>
                        </div>
                      </SectionBox>
                    </Col>
                  </Row>

                </div>
              )
            },
            {
              key: '5',
              label: <span style={{ fontWeight: 700, fontSize: '14px' }}>5️⃣ Roadmap, Team & Tech (Bab 14,15,17-20)</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                  
                  {/* BAB 14 & BAB 17: ROADMAP & PRIORITIES */}
                  <SectionBox title="BAB 14 & BAB 17 - IMPLEMENTATION ROADMAP & FUTURE ECOSYSTEM" badge="Timeline 2026-2030" icon={Calendar} headerColor="#1F5EFF">
                    <Text style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px' }}>Urutan prioritas ekosistem masa depan dan peta jalan pelaksanaannya:</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { pri: 'Priority 1', q: 'Q3 2026', t: 'CALF Data Hub', d: 'Audit Data & Build Data Hub MVP', col: '#EF4444' },
                        { pri: 'Priority 2', q: 'Q4 2026', t: 'Executive Command Center', d: 'Dashboard Founder & Management real-time', col: '#F59E0B' },
                        { pri: 'Priority 3', q: 'H1 2027', t: 'Operations Command Center', d: 'Visibilitas operasional terpusat (CCTV, Internet, Asset)', col: '#10B981' },
                        { pri: 'Priority 4', q: 'H2 2027', t: 'CRM Platform', d: 'Customer 360 View & Segmentasi konsumen', col: '#3B82F6' },
                        { pri: 'Priority 5', q: '2028', t: 'Loyalty & Customer Care', d: 'Program keanggotaan & pusat penanganan keluhan', col: '#8B5CF6' },
                        { pri: 'Priority 6', q: '2029', t: 'Mobile Apps / Super App', d: 'Aplikasi direct channel pemesanan konsumen', col: '#EC4899' },
                        { pri: 'Priority 7', q: '2030', t: 'AI Layer Platform', d: 'Forecasting bahan baku & prediksi churn otomatis', col: '#06B6D4' },
                      ].map((rm, ri) => (
                        <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', flexWrap: 'wrap' }}>
                          <span style={{ padding: '4px 10px', background: rm.col, color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: 800, width: '85px', textAlign: 'center' }}>{rm.pri}</span>
                          <Text style={{ width: '80px', fontWeight: 900, color: '#0F172A', fontSize: '13px' }}>{rm.q}</Text>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <Text style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '14px' }}>{rm.t}</Text>
                            <Text style={{ fontSize: '12px', color: '#64748B' }}>{rm.d}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionBox>

                  {/* BAB 15: TEAM GROWTH PLAN */}
                  <SectionBox title="BAB 15 - TEAM GROWTH PLAN" badge="Hiring Roadmap" icon={Briefcase} headerColor="#7C3AED">
                    <Row gutter={[24, 24]} align="middle">
                      <Col xs={24} lg={12}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { ph: 'Phase 1', role: '1 IT / Digital Transformation Lead' },
                            { ph: 'Phase 2', role: '+ Fullstack Developer' },
                            { ph: 'Phase 3', role: '+ BI / Data Analyst' },
                            { ph: 'Phase 4', role: '+ Infrastructure Engineer' },
                            { ph: 'Phase 5', role: '+ Product & Mobile Team' },
                          ].map((tm, tI) => (
                            <div key={tI} style={{ padding: '12px 16px', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <Tag color="purple" style={{ fontWeight: 800, margin: 0 }}>{tm.ph}</Tag>
                              <Text style={{ fontWeight: 700, color: '#5B21B6', fontSize: '13px' }}>{tm.role}</Text>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #7C3AED' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Target: Membangun tim digital internal secara bertahap sesuai pertumbuhan bisnis.</Text>
                        </div>
                      </Col>

                      <Col xs={24} lg={12}>
                        <div style={{ height: '240px', width: '100%', background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '10px' }}>PROJEKSI HEADCOUNT TIM INTERNAL</Text>
                          <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={teamHeadcountData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="teamHeadGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="phase" tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(val) => [`${val} People`, 'Est. Headcount']} contentStyle={{ borderRadius: '8px', fontSize: '12px', fontWeight: 700 }} />
                              <Area type="monotone" dataKey="headcount" stroke="#8B5CF6" strokeWidth={3} fill="url(#teamHeadGrad)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </Col>
                    </Row>
                  </SectionBox>

                  {/* BAB 18 & BAB 19 */}
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={10}>
                      <SectionBox title="BAB 18 - REQUIRED DISCOVERY" badge="Audit Prasyarat" icon={ListChecks} headerColor="#D97706">
                        <Text style={{ color: '#64748B', fontSize: '13px', marginBottom: '4px' }}>Sebelum stack final ditentukan perlu dilakukan audit menyeluruh pada:</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {[
                            "POS / ESB", "Finance Process", "HR Process", "Inventory Process", 
                            "Complaint Process", "Review Process", "CCTV Infrastructure", 
                            "Internet Infrastructure", "Vehicle Monitoring", "Third Party Applications"
                          ].map((aud, auI) => (
                            <Tag key={auI} color="orange" style={{ padding: '4px 10px', fontWeight: 700, fontSize: '12px' }}>{aud}</Tag>
                          ))}
                        </div>
                        <div style={{ padding: '12px', background: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #F59E0B', marginTop: '12px' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 700, color: '#92400E' }}>Tujuan: Menghindari over-engineering dan memastikan efisiensi biaya.</Text>
                        </div>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={14}>
                      <SectionBox title="BAB 19 - RECOMMENDED TECHNOLOGY DIRECTION" badge="Tech Direction" icon={Code} headerColor="#0284C7">
                        <Row gutter={[12, 12]}>
                          {[
                            { layer: 'Data Acquisition', stk: 'Python ETL, n8n, API Integration' },
                            { layer: 'Data Warehouse', stk: 'PostgreSQL' },
                            { layer: 'Dashboard Base', stk: 'Custom with ReactJS / NextJS Web Base' },
                            { layer: 'Mobile App', stk: 'Custom with React Native / Flutter' },
                            { layer: 'Monitoring Ops', stk: 'Grafana' },
                            { layer: 'Storage Asset', stk: 'MinIO' },
                            { layer: 'Infrastructure', stk: 'Docker, Ubuntu, DigitalOcean / AWS / Dedicated Server' },
                          ].map((tc, tcI) => (
                            <Col xs={24} sm={12} key={tcI}>
                              <div style={{ padding: '10px 14px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px' }}>
                                <Text style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1', display: 'block' }}>{tc.layer.toUpperCase()}</Text>
                                <Text style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{tc.stk}</Text>
                              </div>
                            </Col>
                          ))}
                        </Row>
                        <div style={{ marginTop: '8px', padding: '10px', background: '#F1F5F9', borderRadius: '6px' }}>
                          <Text style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', fontStyle: 'italic' }}>Catatan: Final stack ditentukan setelah discovery selesai.</Text>
                        </div>
                      </SectionBox>
                    </Col>
                  </Row>

                  {/* BAB 20: FINAL RECOMMENDATION */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #064E3B 100%)', 
                    borderRadius: '16px', 
                    padding: '32px', 
                    color: '#FFFFFF', 
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(5, 150, 105, 0.25)'
                  }}>
                    <Tag color="#A7F3D0" style={{ color: '#064E3B', fontWeight: 900, fontSize: '13px', padding: '4px 14px', borderRadius: '20px', marginBottom: '14px' }}>BAB 20 - FINAL RECOMMENDATION</Tag>
                    <Title level={2} style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '28px', margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
                      Transformasi digital Kopi Calf sebaiknya dimulai dari CALF Data Hub.
                    </Title>
                    <Text style={{ color: '#D1FAE5', fontSize: '16px', lineHeight: 1.6, display: 'block', maxWidth: '850px', margin: '0 auto 24px auto' }}>
                      Dengan membangun fondasi data terlebih dahulu, seluruh roadmap digital seperti CRM, Loyalty, Customer Care, Mobile Apps, hingga AI dapat dibangun lebih cepat, lebih murah, dan lebih terukur.
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                      <div style={{ padding: '10px 24px', background: '#0F172A', borderRadius: '10px', border: '2px solid #34D399' }}>
                        <Text style={{ color: '#34D399', fontWeight: 900, fontSize: '14px', letterSpacing: '0.05em' }}>START WITH DATA, NOT APPLICATIONS.</Text>
                      </div>
                      <div style={{ padding: '10px 24px', background: '#0F172A', borderRadius: '10px', border: '2px solid #60A5FA' }}>
                        <Text style={{ color: '#60A5FA', fontWeight: 900, fontSize: '14px', letterSpacing: '0.05em' }}>BUILD THE FOUNDATION FIRST.</Text>
                      </div>
                    </div>
                  </div>

                </div>
              )
            }
          ]}
        />

      </div>
    </MainLayout>
  );
}
