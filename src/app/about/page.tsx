"use client"

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { useLanguage } from '@/lib/i18n';
import { Row, Col, Typography, Tabs } from 'antd';
import { 
  Database, LayoutDashboard, Users, Video, Cpu, Layers, GitBranch, 
  HardDrive, Box, Share2, Lock, ListChecks, Briefcase, Calendar, Code, 
  ArrowDown, Check, FileText, Activity, Shield, Search, BarChart2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const { Title, Text } = Typography;

// Ultra-clean Swiss Swiss consulting style container
const SectionBox = ({ title, chapter, children, style }: any) => (
  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', ...style }}>
    <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.01em' }}>{title}</Text>
      {chapter && <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>{chapter}</span>}
    </div>
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {children}
    </div>
  </div>
);

const teamHeadcountData = [
  { phase: 'Phase 1', role: 'IT / Digital Lead', headcount: 1 },
  { phase: 'Phase 2', role: '+ Fullstack Dev', headcount: 2 },
  { phase: 'Phase 3', role: '+ BI Analyst', headcount: 3 },
  { phase: 'Phase 4', role: '+ Infra Eng', headcount: 4 },
  { phase: 'Phase 5', role: '+ Product Team', headcount: 7 },
];

export default function AboutCalfOnePage() {
  const [activeTab, setActiveTab] = useState('1');
  const { t } = useLanguage();

  return (
    <MainLayout title={t("Data Driven", "Data Driven")} subtitle={t("Digital Transformation & Enterprise Architecture Blueprint", "Cetak Biru Transformasi Digital & Arsitektur Perusahaan")}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>
        
        {/* EDITORIAL HERO HEADER (CLEAN, NO GRADIENT) */}
        <div style={{ 
          background: '#FFFFFF', 
          border: '1px solid #E2E8F0', 
          borderRadius: '8px', 
          padding: '36px 40px', 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', background: '#F1F5F9', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>CALF ONE</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Satria Muhammad A</span>
          </div>
          <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
            {t("Enterprise Digital Transformation Blueprint", "Cetak Biru Transformasi Digital Perusahaan")}
          </Title>
          <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', maxWidth: '850px', marginBottom: '24px' }}>
            {t(
              "Calf Coffee has an immense strategic opportunity to build a robust digital architecture through a Data-Driven Enterprise approach. Our primary strategic directive is establishing the CALF Data Hub as the foundational SSOT before architecting CRM, Loyalty, Customer Care, Mobile Apps, ERP, or AI.",
              "Kopi Calf memiliki peluang besar untuk membangun fondasi digital yang kuat melalui pendekatan Data-Driven Company. Rekomendasi utama adalah membangun CALF Data Hub sebagai fondasi sebelum membangun CRM, Loyalty, Customer Care, Mobile Apps, ERP, maupun AI."
            )}
          </Text>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '6px' }}>
            <Text style={{ color: '#0F172A', fontWeight: 700, fontSize: '13px' }}>
              {t("Core Principle: Start With Data, Not Applications.", "Prinsip Utama: Start With Data, Not Applications.")}
            </Text>
          </div>
        </div>

        {/* MINIMALIST TAB NAVIGATION */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          tabBarStyle={{ borderBottom: '1px solid #E2E8F0', marginBottom: '8px' }}
          items={[
            {
              key: '1',
              label: <span style={{ fontWeight: 600, fontSize: '14px', padding: '0 4px' }}>{t("01 / Summary & Vision", "01 / Ringkasan & Visi")}</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  
                  {/* BAB 1 */}
                  <SectionBox title={t("Executive Summary", "Ringkasan Eksekutif")} chapter="BAB 1">
                    <Text style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                      {t("Calf Coffee has a tremendous opportunity to build a strong digital foundation through a Data-Driven Company approach. The primary recommendation is establishing the CALF Data Hub as the foundation before building CRM, Loyalty, Customer Care, Mobile Apps, ERP, or AI.", "Kopi Calf memiliki peluang besar untuk membangun fondasi digital yang kuat melalui pendekatan Data-Driven Company. Rekomendasi utama adalah membangun CALF Data Hub sebagai fondasi sebelum membangun CRM, Loyalty, Customer Care, Mobile Apps, ERP maupun AI.")}
                    </Text>
                    <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                      <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>START WITH DATA, NOT APPLICATIONS.</Text>
                    </div>
                    <div>
                      <Text style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '12px' }}>{t("Ultimate Target:", "Target Akhir:")}</Text>
                      <Row gutter={[12, 12]}>
                        {[
                          { t: 'Single Source of Truth', d: t('Single unified data repository reference', 'Satu sumber referensi data tunggal') },
                          { t: 'Realtime Management Dashboard', d: t('Actual live performance visibility', 'Visibilitas performa aktual') },
                          { t: 'Customer Intelligence', d: t('Deep buyer behavior understanding', 'Pemahaman perilaku pembeli') },
                          { t: 'Operational Visibility', d: t('Comprehensive network branch surveillance', 'Pengawasan cabang menyeluruh') },
                          { t: 'AI Ready Organization', d: t('AI infrastructure readiness', 'Kesiapan infrastruktur AI') },
                        ].map((item, i) => (
                          <Col xs={24} sm={12} md={8} key={i}>
                            <div style={{ padding: '14px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', height: '100%' }}>
                              <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px', marginBottom: '4px' }}>{item.t}</Text>
                              <Text style={{ fontSize: '12px', color: '#64748B' }}>{item.d}</Text>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </SectionBox>

                  {/* BAB 2 */}
                  <Row gutter={[20, 20]}>
                    <Col xs={24} lg={14}>
                      <SectionBox title={t("Current State Assessment", "Asesmen Kondisi Saat Ini")} chapter="BAB 2">
                        <Text style={{ color: '#475569', fontSize: '13px', marginBottom: '4px' }}>{t("Initial assessment of existing operational systems:", "Temuan awal kondisi sistem berjalan:")}</Text>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                          {[
                            t("1. Transaction data is isolated in POS", "1. Data transaksi berada di POS"),
                            t("2. Operational data remains scattered", "2. Data operasional masih tersebar"),
                            t("3. Customer complaints are not centralized", "3. Customer complaint belum terpusat"),
                            t("4. Loyalty program is unavailable", "4. Loyalty belum tersedia"),
                            t("5. CRM is unavailable", "5. CRM belum tersedia"),
                            t("6. Customer Care is unavailable", "6. Customer Care belum tersedia"),
                            t("7. Mobile Apps are unavailable", "7. Mobile Apps belum tersedia"),
                            t("8. Social Media Intelligence is unavailable", "8. Social Media Intelligence belum tersedia"),
                            t("9. CCTV monitoring is not centralized", "9. CCTV belum terpusat"),
                            t("10. No Enterprise Data Warehouse", "10. Belum ada Data Warehouse"),
                            t("11. No Executive Dashboard", "11. Belum ada Executive Dashboard"),
                          ].map((tem, idx) => (
                            <div key={idx} style={{ padding: '8px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                              <Text style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{tem}</Text>
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </Col>
                    
                    <Col xs={24} lg={10}>
                      <SectionBox title={t("Operational Impact", "Dampak Operasional")} chapter="BAB 2">
                        <Text style={{ color: '#475569', fontSize: '13px' }}>{t("The system limitations above result in:", "Keterbatasan sistem di atas menyebabkan:")}</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            t("Slow executive decision making", "Pengambilan keputusan lambat"),
                            t("Excessive manual workflows", "Banyak proses manual"),
                            t("Difficulty obtaining cross-divisional insights", "Sulit mendapatkan insight lintas divisi"),
                            t("Heavy reliance on manual reporting", "Ketergantungan pada laporan manual"),
                          ].map((damp, di) => (
                            <div key={di} style={{ padding: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderLeft: '3px solid #64748B', borderRadius: '4px' }}>
                              <Text style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>{damp}</Text>
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </Col>
                  </Row>

                  {/* BAB 3 */}
                  <SectionBox title={t("CALF ONE Vision", "Visi CALF ONE")} chapter="BAB 3">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                      {[
                        "ONE DATA", "ONE SOURCE OF TRUTH", "ONE CUSTOMER VIEW", "ONE OPERATIONS VIEW", "ONE DIGITAL ECOSYSTEM"
                      ].map((pillar, pi) => (
                        <div key={pi} style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', textAlign: 'center' }}>
                          <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px', letterSpacing: '0.03em' }}>{pillar}</Text>
                        </div>
                      ))}
                    </div>
                    <Text style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginTop: '4px' }}>
                      {t("CALF ONE is Calf Coffee's digital ecosystem connecting all enterprise data, operations, customers, and management into one unified platform.", "CALF ONE adalah ekosistem digital Kopi Calf yang menghubungkan seluruh data, operasional, customer, dan management ke dalam satu platform terpadu.")}
                    </Text>
                  </SectionBox>

                </div>
              )
            },
            {
              key: '2',
              label: <span style={{ fontWeight: 600, fontSize: '14px', padding: '0 4px' }}>{t("02 / Architecture & Hub", "02 / Arsitektur & Hub")}</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  
                  {/* BAB 4 */}
                  <SectionBox title={t("Why CALF Data Hub", "Mengapa CALF Data Hub")} chapter="BAB 4">
                    <Text style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                      {t("CALF Data Hub is the corporate data core. All enterprise data is ingested, validated, stored, and distributed from a single platform.", "CALF Data Hub adalah pusat data perusahaan. Seluruh data perusahaan akan dikumpulkan, divalidasi, disimpan, dan didistribusikan dari satu platform.")}
                    </Text>
                    <Text style={{ fontWeight: 700, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Business Value:</Text>
                    <Row gutter={[12, 12]}>
                      {[
                        "Realtime visibility", "Single source of truth", "Faster decision making", "Reduced manual reporting", "Foundation for CRM, Loyalty, Care, Mobile Apps, and AI"
                      ].map((val, vi) => (
                        <Col xs={24} sm={12} md={8} key={vi}>
                          <div style={{ padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={16} color="#0F172A" />
                            <Text style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>{val}</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </SectionBox>

                  {/* BAB 5 */}
                  <SectionBox title={t("Enterprise Architecture", "Arsitektur Perusahaan")} chapter="BAB 5">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '10px 0' }}>
                      
                      <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>SOURCE DATA</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                          {["Sales Data", "Customer Data", "Finance Data", "HR Data", "Inventory Data", "Operations Data", "Marketing Data", "Infrastructure Data"].map((src, si) => (
                            <span key={si} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#334155' }}>{src}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={20} color="#94A3B8" /></div>

                      <div style={{ padding: '20px', background: '#0F172A', borderRadius: '8px', textAlign: 'center' }}>
                        <Title level={4} style={{ color: '#FFFFFF', margin: 0, fontWeight: 700, letterSpacing: '0.03em' }}>CALF DATA HUB</Title>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={20} color="#94A3B8" /></div>

                      <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>COMMAND CENTERS</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                          {["Executive Command Center", "Operations Command Center", "Customer Intelligence"].map((intl, ii) => (
                            <span key={ii} style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{intl}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={20} color="#94A3B8" /></div>

                      <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>DOWNSTREAM APPLICATIONS</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                          {["CRM", "Loyalty", "Customer Care", "Mobile Apps", "AI"].map((app, ai) => (
                            <span key={ai} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#334155' }}>{app}</span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </SectionBox>

                  {/* BAB 8 & BAB 10 */}
                  <Row gutter={[20, 20]}>
                    <Col xs={24} lg={12}>
                      <SectionBox title={t("Data Flow", "Alur Data")} chapter="BAB 8">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {[
                            "1. Source Systems",
                            "2. Data Acquisition Layer",
                            "3. Raw Data Layer",
                            "4. Validation Layer",
                            "5. Transformation Layer",
                            "6. Data Warehouse",
                            "7. Dashboard & Applications"
                          ].map((step, stI) => (
                            <div key={stI} style={{ padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', fontWeight: 600, color: '#334155', fontSize: '13px' }}>
                              {step}
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={12}>
                      <SectionBox title={t("CALF Data Warehouse", "Data Warehouse CALF")} chapter="BAB 10">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px' }}>Raw Layer:</Text>
                            <Text style={{ fontSize: '12px', color: '#475569', fontFamily: 'monospace' }}>raw_sales, raw_customer, raw_finance, raw_hr</Text>
                          </div>
                          <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px' }}>Business Layer:</Text>
                            <Text style={{ fontSize: '12px', color: '#475569', fontFamily: 'monospace' }}>fact_sales, fact_customer, fact_product, fact_outlet, fact_inventory</Text>
                          </div>
                          <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px' }}>Dimension Layer:</Text>
                            <Text style={{ fontSize: '12px', color: '#475569', fontFamily: 'monospace' }}>dim_date, dim_product, dim_customer, dim_outlet</Text>
                          </div>
                          <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
                            <Text style={{ color: '#0F172A', fontWeight: 700, fontSize: '12px' }}>{t("Output: Single Source of Truth", "Luaran: Sumber Referensi Data Tunggal (SSOT)")}</Text>
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
              label: <span style={{ fontWeight: 600, fontSize: '14px', padding: '0 4px' }}>{t("03 / Domains & Governance", "03 / Domain & Tata Kelola")}</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  
                  {/* BAB 6 */}
                  <SectionBox title={t("Data Domains", "Domain Data")} chapter="BAB 6">
                    <Row gutter={[12, 12]}>
                      {[
                        { dom: 'Sales Domain', sub: 'Revenue, Transaction, Promotion, Refund' },
                        { dom: 'Customer Domain', sub: 'Customer Profile, Visit, Purchase History' },
                        { dom: 'Product Domain', sub: 'Product, Category, Recipe, COGS' },
                        { dom: 'Inventory Domain', sub: 'Stock, Waste, Transfer' },
                        { dom: 'Finance Domain', sub: 'Revenue, Expense, Budget' },
                        { dom: 'HR Domain', sub: 'Employee, Attendance, Payroll' },
                        { dom: 'Operations Domain', sub: 'Checklist, Incident, Outlet Performance' },
                        { dom: 'Customer Care Domain', sub: 'Complaint, Feedback, Review' },
                        { dom: 'Infrastructure Domain', sub: 'CCTV, Internet, Device, Asset' },
                        { dom: 'Marketing Domain', sub: 'Campaign, Social Media, Engagement' },
                      ].map((dm, di) => (
                        <Col xs={24} sm={12} md={8} xl={6} key={di}>
                          <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '6px', background: '#FFFFFF', height: '100%' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', display: 'block', marginBottom: '4px' }}>{dm.dom}</Text>
                            <Text style={{ fontSize: '12px', color: '#64748B' }}>{dm.sub}</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </SectionBox>

                  {/* BAB 7 & BAB 9 */}
                  <Row gutter={[20, 20]}>
                    <Col xs={24} lg={14}>
                      <SectionBox title={t("Data Acquisition Strategy", "Strategi Akuisisi Data")} chapter="BAB 7">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[
                            { t: 'A. File Integration', d: 'CSV, Excel, Google Sheet' },
                            { t: 'B. API Integration', d: 'POS, HR System, Third Party System' },
                            { t: 'C. Manual Operational Form', d: 'Complaint, Checklist, Incident, Stock Opname' },
                            { t: 'D. Device Integration', d: 'CCTV, GPS, IoT' },
                            { t: 'E. Future Event Streaming', d: 'Kafka, Event Bus' },
                          ].map((acq, ai) => (
                            <div key={ai} style={{ padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                              <Text style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>{acq.t}</Text>
                              <Text style={{ fontSize: '12px', color: '#64748B' }}>{acq.d}</Text>
                            </div>
                          ))}
                        </div>
                        <Text style={{ fontSize: '12px', color: '#475569', marginTop: '10px', display: 'block' }}>{t("Objective: Accommodate all digital maturity levels across the enterprise.", "Tujuan: Mengakomodasi seluruh tingkat kematangan digital perusahaan.")}</Text>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={10}>
                      <SectionBox title={t("Data Governance", "Tata Kelola Data")} chapter="BAB 9">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px' }}>Data Owner:</Text>
                            <Text style={{ fontSize: '12px', color: '#475569' }}>Finance, HR, Operations, Marketing</Text>
                          </div>
                          <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px' }}>Data Steward:</Text>
                            <Text style={{ fontSize: '12px', color: '#475569' }}>IT / Data Team</Text>
                          </div>
                          <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                            <Text style={{ fontWeight: 700, color: '#0F172A', display: 'block', fontSize: '13px' }}>Data Consumer:</Text>
                            <Text style={{ fontSize: '12px', color: '#475569' }}>Founder, COO, Manager, Supervisor</Text>
                          </div>
                        </div>
                        <Text style={{ fontSize: '12px', color: '#475569', marginTop: '10px', display: 'block' }}>{t("Objective: Ensure data quality, security, and enterprise consistency.", "Tujuan: Menjamin kualitas, keamanan, dan konsistensi data.")}</Text>
                      </SectionBox>
                    </Col>
                  </Row>

                  {/* BAB 16 */}
                  <SectionBox title={t("KPI Dictionary", "Kamus KPI")} chapter="BAB 16">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {[
                        "Revenue", "Revenue Growth", "Transaction Growth", "Average Basket", 
                        "Top Product", "Slow Moving Product", "Outlet Growth", "Customer Growth", 
                        "Retention Rate", "Churn Rate", "Complaint Resolution", "Company Health Score"
                      ].map((kpiName, kI) => (
                        <span key={kI} style={{ padding: '6px 14px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                          {kpiName}
                        </span>
                      ))}
                    </div>
                  </SectionBox>

                </div>
              )
            },
            {
              key: '4',
              label: <span style={{ fontWeight: 600, fontSize: '14px', padding: '0 4px' }}>{t("04 / Command Centers", "04 / Pusat Komando")}</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  
                  {/* BAB 11 */}
                  <SectionBox title={t("Executive Command Center", "Pusat Komando Eksekutif")} chapter="BAB 11">
                    <Text style={{ fontSize: '14px', color: '#475569', marginBottom: '4px' }}>{t("Founder & Executive Management Dashboard:", "Dashboard Founder & Management:")}</Text>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={8}>
                        <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', height: '100%' }}>
                          <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Revenue Intelligence</Text>
                          <ul style={{ margin: 0, paddingLeft: '16px', color: '#475569', fontSize: '13px', lineHeight: 1.8 }}>
                            <li>Revenue Today</li>
                            <li>Revenue MTD</li>
                            <li>Revenue YTD</li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', height: '100%' }}>
                          <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Outlet Intelligence</Text>
                          <ul style={{ margin: 0, paddingLeft: '16px', color: '#475569', fontSize: '13px', lineHeight: 1.8 }}>
                            <li>Top Outlet</li>
                            <li>Bottom Outlet</li>
                            <li>Growth Outlet</li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={24} md={8}>
                        <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', height: '100%' }}>
                          <Text style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Customer Intelligence</Text>
                          <ul style={{ margin: 0, paddingLeft: '16px', color: '#475569', fontSize: '13px', lineHeight: 1.8 }}>
                            <li>New Customer</li>
                            <li>Repeat Customer</li>
                            <li>VIP Customer</li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                      <span style={{ padding: '8px 16px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Company Health Score</span>
                      <span style={{ padding: '8px 16px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Risk Alert Center</span>
                    </div>
                  </SectionBox>

                  {/* BAB 12 & BAB 13 */}
                  <Row gutter={[20, 20]}>
                    <Col xs={24} lg={12}>
                      <SectionBox title={t("Operations Command Center", "Pusat Komando Operasional")} chapter="BAB 12">
                        <Text style={{ color: '#475569', fontSize: '13px', marginBottom: '4px' }}>{t("Centralized Surveillance:", "Pemantauan Terpusat:")}</Text>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 2 }}>
                          <li>CCTV Monitoring</li>
                          <li>Internet Monitoring</li>
                          <li>Device Monitoring</li>
                          <li>Asset Monitoring</li>
                          <li>Vehicle Monitoring</li>
                          <li>Incident Monitoring</li>
                        </ul>
                        <Text style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', display: 'block' }}>{t("Objective: Provide centralized operational visibility across all branch outlets.", "Tujuan: Memberikan visibilitas operasional seluruh outlet dari pusat.")}</Text>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={12}>
                      <SectionBox title={t("Customer Intelligence", "Intelijen Pelanggan")} chapter="BAB 13">
                        <Text style={{ color: '#475569', fontSize: '13px', marginBottom: '4px' }}>{t("Customer 360 View:", "Profil Konsumen 360:")}</Text>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          {[
                            "Customer Profile", "Purchase History", "Frequency", "Monetary Value", "Segment", "Churn Indicator"
                          ].map((c360, ci) => (
                            <div key={ci} style={{ padding: '8px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', fontWeight: 600, color: '#334155', fontSize: '12px' }}>
                              {c360}
                            </div>
                          ))}
                        </div>
                        <Text style={{ fontSize: '12px', color: '#64748B', marginTop: '12px', display: 'block' }}>{t("Output: Data-driven marketing and loyalty strategy.", "Output: Strategi marketing dan loyalty berbasis data.")}</Text>
                      </SectionBox>
                    </Col>
                  </Row>

                </div>
              )
            },
            {
              key: '5',
              label: <span style={{ fontWeight: 600, fontSize: '14px', padding: '0 4px' }}>{t("05 / Roadmap & Tech", "05 / Peta Jalan & Teknologi")}</span>,
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  
                  {/* BAB 14 & BAB 17 */}
                  <SectionBox title={t("Implementation Roadmap & Future Ecosystem", "Roadmap Implementasi & Ekosistem Masa Depan")} chapter="BAB 14 & BAB 17">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { pri: 'Priority 1', q: 'Q3 2026', t: 'CALF Data Hub', d: t('Audit Data & Build Data Hub MVP', 'Audit Data & Bangun MVP Data Hub') },
                        { pri: 'Priority 2', q: 'Q4 2026', t: 'Executive Command Center', d: t('Founder & Executive Management Dashboard', 'Dashboard Founder & Management') },
                        { pri: 'Priority 3', q: 'H1 2027', t: 'Operations Command Center', d: t('Centralized ops monitoring', 'Pemantauan operasional terpusat') },
                        { pri: 'Priority 4', q: 'H2 2027', t: 'CRM', d: t('Customer segmentation & profile', 'Segmentasi & profil konsumen') },
                        { pri: 'Priority 5', q: '2028', t: 'Loyalty & Customer Care', d: t('Centralized complaint & membership', 'Layanan keluhan & keanggotaan terpusat') },
                        { pri: 'Priority 6', q: '2029', t: 'Mobile Apps / Super App', d: t('Direct ordering app', 'Aplikasi pemesanan mandiri') },
                        { pri: 'Priority 7', q: '2030', t: 'AI Platform', d: t('Forecasting & AI layer', 'Lapisan prediksi & AI') },
                      ].map((rm, ri) => (
                        <div key={ri} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', width: '75px' }}>{rm.pri}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', width: '70px' }}>{rm.q}</span>
                          <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', minWidth: '180px' }}>{rm.t}</span>
                          <span style={{ fontSize: '12px', color: '#475569', flex: 1 }}>{rm.d}</span>
                        </div>
                      ))}
                    </div>
                  </SectionBox>

                  {/* BAB 15 */}
                  <SectionBox title={t("Team Growth Plan", "Rencana Pertumbuhan Tim")} chapter="BAB 15">
                    <Row gutter={[24, 24]} align="middle">
                      <Col xs={24} lg={12}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[
                            { ph: 'Phase 1', role: t('1 IT / Digital Transformation Lead', '1 Lead IT / Transformasi Digital') },
                            { ph: 'Phase 2', role: t('+ Fullstack Developer', '+ Fullstack Developer') },
                            { ph: 'Phase 3', role: t('+ BI / Data Analyst', '+ Analis Data / BI') },
                            { ph: 'Phase 4', role: t('+ Infrastructure Engineer', '+ Engineer Infrastruktur') },
                            { ph: 'Phase 5', role: t('+ Product & Mobile Team', '+ Tim Produk & Mobile Apps') },
                          ].map((tm, tI) => (
                            <div key={tI} style={{ padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', width: '60px' }}>{tm.ph}</span>
                              <Text style={{ fontWeight: 600, color: '#334155', fontSize: '13px' }}>{tm.role}</Text>
                            </div>
                          ))}
                        </div>
                        <Text style={{ fontSize: '12px', color: '#64748B', marginTop: '12px', display: 'block' }}>{t("Target: Build internal digital team progressively aligned with business growth.", "Target: Membangun tim digital internal secara bertahap sesuai pertumbuhan bisnis.")}</Text>
                      </Col>

                      <Col xs={24} lg={12}>
                        <div style={{ height: '220px', width: '100%', background: '#FFFFFF', padding: '16px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                          <Text style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Internal Headcount Projection</Text>
                          <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={teamHeadcountData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis dataKey="phase" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(val) => [`${val} People`, 'Headcount']} contentStyle={{ borderRadius: '6px', fontSize: '12px' }} />
                              <Area type="monotone" dataKey="headcount" stroke="#0F172A" strokeWidth={2} fill="#0F172A" fillOpacity={0.05} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </Col>
                    </Row>
                  </SectionBox>

                  {/* BAB 18 & BAB 19 */}
                  <Row gutter={[20, 20]}>
                    <Col xs={24} lg={10}>
                      <SectionBox title={t("Required Discovery", "Discovery & Investigasi Awal")} chapter="BAB 18">
                        <Text style={{ color: '#475569', fontSize: '13px', marginBottom: '8px' }}>{t("Before finalizing the tech stack, audits must be conducted on:", "Sebelum stack final ditentukan perlu dilakukan audit:")}</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {[
                            "POS / ESB", "Finance Process", "HR Process", "Inventory Process", 
                            "Complaint Process", "Review Process", "CCTV Infrastructure", 
                            "Internet Infrastructure", "Vehicle Monitoring", "Third Party Applications"
                          ].map((aud, auI) => (
                            <span key={auI} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#334155' }}>{aud}</span>
                          ))}
                        </div>
                        <Text style={{ fontSize: '12px', color: '#64748B', marginTop: '14px', display: 'block' }}>{t("Objective: Prevent over-engineering and ensure cost efficiency.", "Tujuan: Menghindari over-engineering dan memastikan efisiensi biaya.")}</Text>
                      </SectionBox>
                    </Col>

                    <Col xs={24} lg={14}>
                      <SectionBox title={t("Recommended Technology Direction", "Rekomendasi Arah Teknologi")} chapter="BAB 19">
                        <Row gutter={[10, 10]}>
                          {[
                            { layer: 'Data Acquisition', stk: 'Python ETL, n8n, API Integration' },
                            { layer: 'Data Warehouse', stk: 'PostgreSQL' },
                            { layer: 'Dashboard Base', stk: 'Custom with ReactJS/NextJS Web Base' },
                            { layer: 'Mobile App', stk: 'Custom with React Native/Flutter' },
                            { layer: 'Monitoring Ops', stk: 'Grafana' },
                            { layer: 'Storage Asset', stk: 'MinIO' },
                            { layer: 'Infrastructure', stk: 'Docker, Ubuntu, DigitalOcean / AWS / Dedicated Internal Server' },
                          ].map((tc, tcI) => (
                            <Col xs={24} sm={12} key={tcI}>
                              <div style={{ padding: '10px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                                <Text style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block' }}>{tc.layer}</Text>
                                <Text style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{tc.stk}</Text>
                              </div>
                            </Col>
                          ))}
                        </Row>
                        <Text style={{ fontSize: '11px', color: '#64748B', marginTop: '12px', display: 'block', fontStyle: 'italic' }}>{t("Note: Final tech stack determined post-discovery.", "Catatan: Final stack ditentukan setelah discovery selesai.")}</Text>
                      </SectionBox>
                    </Col>
                  </Row>

                  {/* BAB 20 */}
                  <div style={{ 
                    background: '#0F172A', 
                    borderRadius: '8px', 
                    padding: '32px 36px', 
                    color: '#FFFFFF'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.04em', display: 'block', marginBottom: '12px' }}>{t("BAB 20 / FINAL RECOMMENDATION", "BAB 20 / REKOMENDASI AKHIR")}</span>
                    <Title level={2} style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '24px', margin: '0 0 14px 0', letterSpacing: '-0.01em' }}>
                      {t("Calf Coffee's digital transformation should begin with the CALF Data Hub.", "Transformasi digital Kopi Calf sebaiknya dimulai dari CALF Data Hub.")}
                    </Title>
                    <Text style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: 1.6, display: 'block', maxWidth: '850px', marginBottom: '24px' }}>
                      {t("By establishing the data foundation first, subsequent digital roadmaps (CRM, Loyalty, Customer Care, Mobile Apps, AI) can be built faster, more cost-effectively, and with measurable impact.", "Dengan membangun fondasi data terlebih dahulu, seluruh roadmap digital seperti CRM, Loyalty, Customer Care, Mobile Apps, hingga AI dapat dibangun lebih cepat, lebih murah, dan lebih terukur.")}
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ padding: '8px 16px', background: '#1E293B', borderRadius: '6px', border: '1px solid #334155' }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '13px' }}>START WITH DATA, NOT APPLICATIONS.</Text>
                      </div>
                      <div style={{ padding: '8px 16px', background: '#1E293B', borderRadius: '6px', border: '1px solid #334155' }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '13px' }}>BUILD THE FOUNDATION FIRST.</Text>
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
