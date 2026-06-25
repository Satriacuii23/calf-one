"use client"

import React, { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';
import { ArrowRight, Server, CheckCircle2, Database, ShieldAlert, Zap, Network, BrainCircuit, Activity, LineChart, Cpu, Store, Video, Target } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const { Title, Text } = Typography;

export default function HybridStrategyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primary = '#0F2D6B';
  const secondary = '#1F5EFF';
  const textDark = '#0B192C';
  const textLight = '#64748B';
  const bg = '#FFFFFF';
  const borderLight = '#EAEDF2';

  const Slide = ({ title, subtitle, leftContent, rightContent, altBg = false }: any) => (
    <section style={{ 
      padding: '100px 40px', 
      backgroundColor: altBg ? '#FAFAFA' : bg, 
      borderBottom: `1px solid ${borderLight}`, 
      minHeight: '85vh', 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <Title level={2} style={{ color: textDark, fontSize: '40px', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>{title}</Title>
          {subtitle && <Text style={{ fontSize: '20px', color: textLight, display: 'block', marginTop: '16px', fontWeight: 500 }}>{subtitle}</Text>}
          <div style={{ width: '60px', height: '4px', backgroundColor: secondary, marginTop: '24px', borderRadius: '2px' }} />
        </div>
        <Row gutter={[80, 80]} align="middle">
          <Col xs={24} lg={10}>
            {leftContent}
          </Col>
          <Col xs={24} lg={14}>
            {rightContent}
          </Col>
        </Row>
      </div>
    </section>
  );

  const optionComparisonData = [
    { subject: 'Cost Efficiency', OptionA: 90, OptionB: 10, OptionC: 80, fullMark: 100 },
    { subject: 'Implementation Speed', OptionA: 100, OptionB: 20, OptionC: 75, fullMark: 100 },
    { subject: 'Data Ownership', OptionA: 10, OptionB: 100, OptionC: 100, fullMark: 100 },
    { subject: 'Scalability & AI', OptionA: 20, OptionB: 90, OptionC: 95, fullMark: 100 },
    { subject: 'Risk Mitigation', OptionA: 20, OptionB: 10, OptionC: 80, fullMark: 100 },
  ];

  const scatterData = [
    { name: 'Data Hub', x: 20, y: 95, z: 200, fill: secondary },
    { name: 'Command Center', x: 30, y: 90, z: 200, fill: secondary },
    { name: 'Ops Center', x: 40, y: 80, z: 150, fill: primary },
    { name: 'CRM & Loyalty', x: 60, y: 70, z: 100, fill: primary },
    { name: 'Mobile App', x: 80, y: 85, z: 150, fill: '#F59E0B' },
    { name: 'AI Layer', x: 90, y: 95, z: 150, fill: '#10B981' },
  ];

  const teamData = [
    { year: 'Juni 2026', headcount: 1 },
    { year: '2027', headcount: 3 },
    { year: '2028', headcount: 6 },
    { year: '2029+', headcount: 8 },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: bg, color: textDark, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HEADER NAVBAR */}
      <div style={{ padding: '24px 40px', borderBottom: `1px solid ${borderLight}`, backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Text style={{ color: primary, fontSize: '18px', fontWeight: 800, letterSpacing: '1px', lineHeight: 1 }}>KOPI CALF</Text>
          <div style={{ width: '1px', height: '20px', backgroundColor: borderLight }} />
          <Text style={{ color: textLight, fontSize: '13px', letterSpacing: '1px', fontWeight: 600 }}>HYBRID STRATEGY PRESENTATION</Text>
        </div>
      </div>

      {/* SLIDE 1: EXECUTIVE SUMMARY */}
      <Slide 
        title="Building The Digital Foundation"
        subtitle="Transforming Kopi Calf from fragmented systems into a centralized data-driven ecosystem."
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Text style={{ fontSize: '18px', color: textLight, lineHeight: 1.6 }}>
              Kopi Calf operates at a massive scale today. However, critical operational data remains locked within isolated legacy systems.
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <Title level={2} style={{ color: textDark, margin: '0 0 8px 0', fontSize: '36px' }}>115+</Title>
                <Text style={{ color: textLight, fontSize: '14px', fontWeight: 700, letterSpacing: '1px' }}>OUTLETS</Text>
              </div>
              <div>
                <Title level={2} style={{ color: textDark, margin: '0 0 8px 0', fontSize: '36px' }}>1000+</Title>
                <Text style={{ color: textLight, fontSize: '14px', fontWeight: 700, letterSpacing: '1px' }}>CCTV CAMERAS</Text>
              </div>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#FAFAFA', borderLeft: `4px solid ${secondary}` }}>
              <Text style={{ color: textDark, fontSize: '16px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>The Core Challenge:</Text>
              <Text style={{ color: textLight, fontSize: '15px' }}>It is no longer about collecting data. It is about transforming existing data into actionable decisions.</Text>
            </div>
          </div>
        }
        rightContent={
          <div style={{ padding: '60px', backgroundColor: primary, borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 40px rgba(15, 45, 107, 0.15)' }}>
            <Title level={1} style={{ color: '#FFFFFF', fontSize: '48px', fontWeight: 800, margin: '0 0 24px 0', letterSpacing: '-1px', lineHeight: 1.2 }}>
              Start With Data.<br/>
              <span style={{ color: '#EF4444' }}>Not Applications.</span>
            </Title>
            <Text style={{ color: '#93C5FD', fontSize: '20px', lineHeight: 1.6, fontWeight: 500, display: 'block', marginBottom: '40px' }}>
              The immediate objective is creating visibility, not replacing the existing POS.
            </Text>
            <div style={{ display: 'inline-block', padding: '16px 32px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', color: '#FFFFFF', fontWeight: 700, letterSpacing: '1px' }}>
              RECOMMENDATION: HYBRID STRATEGY
            </div>
          </div>
        }
      />

      {/* SLIDE 2: EVALUATING OPTIONS */}
      <Slide 
        altBg={true}
        title="Evaluating Transformation Options"
        subtitle="Why the Hybrid Strategy is the safest & most effective route"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '24px', border: `1px solid ${borderLight}`, borderRadius: '16px', backgroundColor: bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text style={{ fontSize: '16px', fontWeight: 700, color: textDark }}>Option A: ESB Forever</Text>
                <Text style={{ fontSize: '14px', fontWeight: 700, color: '#EF4444' }}>Risk: 75/100</Text>
              </div>
              <Text style={{ color: textLight, fontSize: '14px', lineHeight: 1.6 }}>Causes severe vendor dependency. Prevents data ownership and restricts future AI or CRM capabilities.</Text>
            </div>

            <div style={{ padding: '24px', border: `1px solid ${borderLight}`, borderRadius: '16px', backgroundColor: bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text style={{ fontSize: '16px', fontWeight: 700, color: textDark }}>Option B: Replace SmartPOS</Text>
                <Text style={{ fontSize: '14px', fontWeight: 700, color: '#EF4444' }}>Risk: 90/100</Text>
              </div>
              <Text style={{ color: textLight, fontSize: '14px', lineHeight: 1.6 }}>Requires massive upfront capital, triggers operational disruption, and demands a huge IT team.</Text>
            </div>

            <div style={{ padding: '24px', border: `2px solid ${secondary}`, borderRadius: '16px', backgroundColor: '#EFF6FF', boxShadow: '0 10px 30px rgba(31, 94, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color={secondary} />
                  <Text style={{ fontSize: '16px', fontWeight: 800, color: primary }}>Option C: HYBRID STRATEGY</Text>
                </div>
                <Text style={{ fontSize: '14px', fontWeight: 800, color: secondary }}>Risk: 25/100</Text>
              </div>
              <Text style={{ color: primary, fontSize: '14px', lineHeight: 1.6, fontWeight: 500 }}>
                Keep ESB running operations while extracting data into CALF Data Hub. 100% data ownership with 0% operational disruption.
              </Text>
            </div>
          </div>
        }
        rightContent={
          <div style={{ height: '450px', width: '100%', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '24px', padding: '20px' }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={optionComparisonData}>
                  <PolarGrid stroke={borderLight} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: textLight, fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#CBD5E1', fontSize: 11 }} />
                  <Radar name="A: ESB Forever" dataKey="OptionA" stroke="#EF4444" strokeWidth={2} fill="#EF4444" fillOpacity={0.05} />
                  <Radar name="B: Replace POS" dataKey="OptionB" stroke="#F59E0B" strokeWidth={2} fill="#F59E0B" fillOpacity={0.05} />
                  <Radar name="C: Hybrid" dataKey="OptionC" stroke={secondary} strokeWidth={3} fill={secondary} fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: `1px solid ${borderLight}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        }
      />

      {/* SLIDE 3: HYBRID ARCHITECTURE */}
      <Slide 
        title="Hybrid Architecture Flow"
        subtitle="Data ingestion without disrupting current outlet operations"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <Text style={{ fontWeight: 700, color: textDark, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: textLight }}>1</div>
                Legacy Sources
              </Text>
              <Text style={{ color: textLight, fontSize: '15px', lineHeight: 1.6, paddingLeft: '44px', display: 'block' }}>
                ESB POS and existing CCTV networks continue functioning normally at outlets. No disruption to daily transactions.
              </Text>
            </div>
            <div>
              <Text style={{ fontWeight: 700, color: secondary, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: secondary }}>2</div>
                CALF Data Hub
              </Text>
              <Text style={{ color: textLight, fontSize: '15px', lineHeight: 1.6, paddingLeft: '44px', display: 'block' }}>
                A centralized integration layer extracts, transforms, and loads (ETL) data from legacy systems into our proprietary database.
              </Text>
            </div>
            <div>
              <Text style={{ fontWeight: 700, color: primary, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F8FAFC', border: `1px solid ${borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: primary }}>3</div>
                Action Layer
              </Text>
              <Text style={{ color: textLight, fontSize: '15px', lineHeight: 1.6, paddingLeft: '44px', display: 'block' }}>
                Data feeds into the Executive Command Center, enabling real-time decisions, and paves the way for future CRM, App, and AI developments.
              </Text>
            </div>
          </div>
        }
        rightContent={
          <div style={{ padding: '40px', backgroundColor: '#FAFAFA', border: `1px solid ${borderLight}`, borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, padding: '24px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '12px', textAlign: 'center' }}>
                <Store size={24} color={textLight} style={{ margin: '0 auto 8px auto' }} />
                <Text style={{ fontWeight: 700, color: textDark }}>ESB POS</Text>
              </div>
              <ArrowRight size={20} color="#CBD5E1" />
              <div style={{ flex: 1.5, padding: '32px 24px', backgroundColor: bg, border: `2px solid ${secondary}`, borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(31, 94, 255, 0.08)' }}>
                <Database size={32} color={secondary} style={{ margin: '0 auto 12px auto' }} />
                <Text style={{ fontWeight: 800, color: primary, fontSize: '18px' }}>DATA HUB</Text>
              </div>
              <ArrowRight size={20} color="#CBD5E1" />
              <div style={{ flex: 1.5, padding: '32px 24px', backgroundColor: primary, borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(15, 45, 107, 0.15)' }}>
                <Activity size={32} color="#FFFFFF" style={{ margin: '0 auto 12px auto' }} />
                <Text style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '18px' }}>COMMAND CENTER</Text>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '120px' }}>
              <div style={{ width: '2px', height: '40px', backgroundColor: borderLight }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: bg, border: `1px dashed ${borderLight}`, borderRadius: '8px', textAlign: 'center', flex: 1, maxWidth: '140px' }}>
                <Text style={{ fontWeight: 600, color: textLight, fontSize: '13px' }}>CRM & Loyalty</Text>
              </div>
              <div style={{ padding: '16px', backgroundColor: bg, border: `1px dashed ${borderLight}`, borderRadius: '8px', textAlign: 'center', flex: 1, maxWidth: '140px' }}>
                <Text style={{ fontWeight: 600, color: textLight, fontSize: '13px' }}>Mobile App</Text>
              </div>
              <div style={{ padding: '16px', backgroundColor: bg, border: `1px dashed ${borderLight}`, borderRadius: '8px', textAlign: 'center', flex: 1, maxWidth: '140px' }}>
                <Text style={{ fontWeight: 600, color: textLight, fontSize: '13px' }}>AI Layer</Text>
              </div>
            </div>
          </div>
        }
      />

      {/* SLIDE 4: ROADMAP */}
      <Slide 
        altBg={true}
        title="Phased Execution Roadmap"
        subtitle="A systematic, risk-averse rollout plan (Jun 2026 - 2030)"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderLeft: `4px solid ${textLight}`, paddingLeft: '20px' }}>
              <Text style={{ fontSize: '12px', fontWeight: 800, color: textLight, letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>PHASE 0 • JUNI 2026</Text>
              <Text style={{ fontWeight: 700, fontSize: '16px', color: textDark, display: 'block', marginBottom: '4px' }}>Recruitment & Assessment</Text>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block' }}>Audit Digital, Infrastruktur, ESB, CCTV. Output: <span style={{fontWeight:700}}>Current State Assessment</span></Text>
            </div>
            
            <div style={{ borderLeft: `4px solid #EF4444`, paddingLeft: '20px' }}>
              <Text style={{ fontSize: '12px', fontWeight: 800, color: '#EF4444', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>PHASE 1-2 • JUL - DES 2026 (CRITICAL)</Text>
              <Text style={{ fontWeight: 700, fontSize: '16px', color: textDark, display: 'block', marginBottom: '4px' }}>Data Hub & Executive Command Center</Text>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block' }}>ESB Integration, Data Warehouse, Founder Dashboards. Output: <span style={{fontWeight:700}}>ONE DATA & ONE DASHBOARD</span></Text>
            </div>

            <div style={{ borderLeft: `4px solid #F59E0B`, paddingLeft: '20px' }}>
              <Text style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>PHASE 3-4 • 2027 (HIGH)</Text>
              <Text style={{ fontWeight: 700, fontSize: '16px', color: textDark, display: 'block', marginBottom: '4px' }}>Ops Command Center & CRM</Text>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block' }}>Centralized CCTV, Cust 360, Campaign Engine. Output: <span style={{fontWeight:700}}>ONE OPS CENTER & ONE CUSTOMER PROFILE</span></Text>
            </div>

            <div style={{ borderLeft: `4px solid ${secondary}`, paddingLeft: '20px' }}>
              <Text style={{ fontSize: '12px', fontWeight: 800, color: secondary, letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>PHASE 5-6 • 2028 (MEDIUM)</Text>
              <Text style={{ fontWeight: 700, fontSize: '16px', color: textDark, display: 'block', marginBottom: '4px' }}>Loyalty Platform & Care</Text>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block' }}>Membership, NPS, Complaint Management. Output: <span style={{fontWeight:700}}>REPEAT PURCHASE ENGINE & VOC</span></Text>
            </div>

            <div style={{ borderLeft: `4px solid #10B981`, paddingLeft: '20px' }}>
              <Text style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>PHASE 7-8 • 2029-2030 (FUTURE)</Text>
              <Text style={{ fontWeight: 700, fontSize: '16px', color: textDark, display: 'block', marginBottom: '4px' }}>Super App & AI Layer</Text>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block' }}>Direct Channel & Forecasting/Churn Prediction. Output: <span style={{fontWeight:700}}>DIRECT CUSTOMER CHANNEL & PREDICTIVE COMPANY</span></Text>
            </div>
          </div>
        }
        rightContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '40px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '24px' }}>
            {[
              { p: 0, t: 'ASSESSMENT', w: '10%', c: textLight, y: 'Jun 26' },
              { p: 1, t: 'DATA HUB', w: '20%', c: '#EF4444', y: 'Jul 26' },
              { p: 2, t: 'COMMAND CENTER', w: '35%', c: '#EF4444', y: 'Okt 26' },
              { p: 3, t: 'OPERATIONS CENTER', w: '45%', c: '#F59E0B', y: 'Jan 27' },
              { p: 4, t: 'CRM SYSTEM', w: '60%', c: '#F59E0B', y: 'Jul 27' },
              { p: 5, t: 'LOYALTY PLATFORM', w: '70%', c: secondary, y: 'Jan 28' },
              { p: 6, t: 'CALF CARE', w: '80%', c: secondary, y: 'Jul 28' },
              { p: 7, t: 'SUPER APP', w: '90%', c: '#10B981', y: '2029' },
              { p: 8, t: 'AI LAYER', w: '100%', c: '#10B981', y: '2030' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Text style={{ width: '130px', fontSize: '12px', fontWeight: 700, color: textDark }}>{r.t}</Text>
                <div style={{ flex: 1, height: '12px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: r.w, backgroundColor: r.c, borderRadius: '6px' }} />
                </div>
                <Text style={{ width: '60px', fontSize: '12px', fontWeight: 600, color: textLight, textAlign: 'right' }}>{r.y}</Text>
              </div>
            ))}
          </div>
        }
      />

      {/* SLIDE 5: TEAM & INFRASTRUCTURE */}
      <Slide 
        title="Team Growth Plan"
        subtitle="Scaling capabilities alongside technological complexity"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px', border: `1px solid ${borderLight}`, borderRadius: '12px', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 700, fontSize: '15px', color: textDark }}>Juni 2026</Text>
                <Text style={{ fontWeight: 700, fontSize: '14px', color: secondary }}>1 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block', lineHeight: 1.6 }}>
                Digital Transformation Lead (Yaitu Anda). Fokus pada assessment & vendor management.
              </Text>
            </div>

            <div style={{ padding: '20px', border: `1px solid ${borderLight}`, borderRadius: '12px', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 700, fontSize: '15px', color: textDark }}>Tahun 2027</Text>
                <Text style={{ fontWeight: 700, fontSize: '14px', color: secondary }}>2-3 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block', lineHeight: 1.6 }}>
                Penambahan tim operasional: Digital Transformation Lead, Infrastructure Engineer, Junior Software Engineer.
              </Text>
            </div>

            <div style={{ padding: '20px', border: `1px solid ${borderLight}`, borderRadius: '12px', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 700, fontSize: '15px', color: textDark }}>Tahun 2028</Text>
                <Text style={{ fontWeight: 700, fontSize: '14px', color: secondary }}>5-6 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block', lineHeight: 1.6 }}>
                Pengembangan platform (CRM & Loyalty): Lead, Infra, Backend, Frontend, IT Support, Data Engineer.
              </Text>
            </div>

            <div style={{ padding: '20px', border: `2px solid ${secondary}`, borderRadius: '12px', backgroundColor: '#EFF6FF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 800, fontSize: '15px', color: primary }}>Tahun 2029</Text>
                <Text style={{ fontWeight: 800, fontSize: '14px', color: primary }}>7-8 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: primary, display: 'block', lineHeight: 1.6, fontWeight: 500 }}>
                Enterprise Scale: Head of Digital mengepalai Infrastructure Team, Engineering Team, dan Data Team.
              </Text>
            </div>
          </div>
        }
        rightContent={
          <div style={{ height: '450px', width: '100%', padding: '20px', border: `1px solid ${borderLight}`, borderRadius: '24px', backgroundColor: '#FAFAFA' }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={teamData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorTeam3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={secondary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={secondary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={borderLight} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: textLight, fontSize: 13, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: textLight, fontSize: 13, fontWeight: 600 }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: `1px solid ${borderLight}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="headcount" name="Team Headcount" stroke={secondary} strokeWidth={3} fillOpacity={1} fill="url(#colorTeam3)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        }
      />

      {/* SLIDE 6: ROI & IMPACT */}
      <Slide 
        altBg={true}
        title="Investment vs Business Impact"
        subtitle="Expected ROI & strategic prioritization matrix"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ padding: '32px 24px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '16px', textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>+70%</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>DECISION SPEED</Text>
              </div>
              <div style={{ padding: '32px 24px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '16px', textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>5 Mins</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>REPORTING TIME</Text>
              </div>
              <div style={{ padding: '32px 24px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '16px', textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>100%</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>OUTLET VISIBILITY</Text>
              </div>
              <div style={{ padding: '32px 24px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '16px', textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>100%</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>CCTV VISIBILITY</Text>
              </div>
            </div>
          </div>
        }
        rightContent={
          <div style={{ height: '400px', width: '100%', padding: '20px', border: `1px solid ${borderLight}`, borderRadius: '24px', backgroundColor: bg }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={borderLight} />
                  <XAxis type="number" dataKey="x" name="Investment Required" tick={false} axisLine={{ stroke: borderLight }} label={{ value: 'Investment Required →', position: 'bottom', fill: textLight, fontSize: 12, fontWeight: 600 }} />
                  <YAxis type="number" dataKey="y" name="Business Impact" tick={false} axisLine={{ stroke: borderLight }} label={{ value: 'Business Impact →', angle: -90, position: 'left', fill: textLight, fontSize: 12, fontWeight: 600 }} />
                  <ZAxis type="number" dataKey="z" range={[100, 400]} name="Priority" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: `1px solid ${borderLight}`, padding: '12px' }} formatter={(value: any, name: any, props: any) => [props.payload.name, 'Project']} />
                  <Scatter name="Projects" data={scatterData} fill="#8884d8">
                    {scatterData.map((entry, index) => (
                      <circle key={`cell-${index}`} cx={entry.x} cy={entry.y} r={10} fill={entry.fill} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        }
      />
      
    </div>
  );
}
