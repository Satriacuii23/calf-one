"use client"

import React, { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';
import { ArrowRight, Server, CheckCircle2, Database, ShieldAlert, Zap, Network, BrainCircuit, Activity, LineChart, Cpu, Store, Video, Target } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar } from 'recharts';

const { Title, Text } = Typography;

export default function WhyCalfOnePage() {
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

  const maturityData = [
    { subject: 'Business Intelligence', current: 20, target: 90, fullMark: 100 },
    { subject: 'Customer Intel', current: 10, target: 90, fullMark: 100 },
    { subject: 'Operational Monitoring', current: 35, target: 100, fullMark: 100 },
    { subject: 'Infrastructure Mgmt', current: 45, target: 95, fullMark: 100 },
    { subject: 'Automation', current: 15, target: 80, fullMark: 100 },
    { subject: 'AI Readiness', current: 5, target: 70, fullMark: 100 },
  ];

  const visibilityData = [
    { name: 'Revenue', current: 35, target: 95 },
    { name: 'Customer', current: 10, target: 90 },
    { name: 'Outlet', current: 50, target: 100 },
    { name: 'Infrastructure', current: 15, target: 95 },
    { name: 'CCTV', current: 20, target: 100 },
    { name: 'Social', current: 5, target: 80 },
  ];

  const teamData = [
    { year: 'Juni 2026', headcount: 1 },
    { year: '2027', headcount: 3 },
    { year: '2028', headcount: 6 },
    { year: '2029+', headcount: 8 },
  ];

  return (
    <div style={{ backgroundColor: bg, color: textDark, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HEADER NAVBAR */}
      <div style={{ padding: '24px 40px', borderBottom: `1px solid ${borderLight}`, backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Text style={{ color: primary, fontSize: '18px', fontWeight: 800, letterSpacing: '1px', lineHeight: 1 }}>KOPI CALF</Text>
          <div style={{ width: '1px', height: '20px', backgroundColor: borderLight }} />
          <Text style={{ color: textLight, fontSize: '13px', letterSpacing: '1px', fontWeight: 600 }}>WHY CALF ONE PRESENTATION</Text>
        </div>
      </div>

      {/* SLIDE 1: DIGITAL MATURITY */}
      <Slide 
        title="Where Are We Today?"
        subtitle="Current Digital Maturity Assessment of Kopi Calf"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text style={{ fontSize: '14px', color: textLight, fontWeight: 700, letterSpacing: '1px' }}>OVERALL MATURITY SCORE</Text>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '8px' }}>
              <Title level={1} style={{ fontSize: '100px', margin: 0, color: textDark, lineHeight: 1, letterSpacing: '-4px' }}>32</Title>
              <Text style={{ fontSize: '28px', color: textLight, fontWeight: 500 }}>/ 100</Text>
            </div>
            <div style={{ marginTop: '32px', borderLeft: `4px solid #EF4444`, paddingLeft: '24px' }}>
              <Text style={{ color: '#EF4444', fontWeight: 800, display: 'block', marginBottom: '8px', letterSpacing: '1px', fontSize: '14px' }}>LEVEL 1 - FOUNDATIONAL STAGE</Text>
              <Text style={{ color: textLight, fontSize: '16px', lineHeight: 1.6 }}>Highly fragmented operations lacking unified data insights. Business intelligence, customer tracking, and AI readiness are currently below 20%.</Text>
            </div>
          </div>
        }
        rightContent={
          <div style={{ height: '450px', width: '100%', backgroundColor: bg, padding: '20px 0' }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={maturityData}>
                  <PolarGrid stroke={borderLight} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: textLight, fontSize: 13, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#CBD5E1', fontSize: 11 }} />
                  <Radar name="Target State" dataKey="target" stroke={secondary} strokeWidth={3} fill={secondary} fillOpacity={0.05} />
                  <Radar name="Current State" dataKey="current" stroke="#EF4444" strokeWidth={3} fill="#EF4444" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: `1px solid ${borderLight}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        }
      />

      {/* SLIDE 2: VISIBILITY */}
      <Slide 
        altBg={true}
        title="Management Visibility"
        subtitle="How much of the business operations can we actually see today?"
        leftContent={
          <div style={{ padding: '40px 0', backgroundColor: bg, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <Text style={{ fontSize: '14px', color: textLight, fontWeight: 700, letterSpacing: '1px' }}>CURRENT VISIBILITY AVERAGE</Text>
              <Title level={2} style={{ color: '#EF4444', margin: '8px 0 0 0', fontSize: '56px', letterSpacing: '-2px' }}>26%</Title>
            </div>
            <div style={{ width: '40px', height: '4px', backgroundColor: borderLight }} />
            <div>
              <Text style={{ fontSize: '14px', color: secondary, fontWeight: 700, letterSpacing: '1px' }}>CALF ONE TARGET</Text>
              <Title level={2} style={{ color: primary, margin: '8px 0 0 0', fontSize: '56px', letterSpacing: '-2px' }}>92%</Title>
            </div>
          </div>
        }
        rightContent={
          <div style={{ height: '450px', width: '100%', backgroundColor: bg, padding: '20px 0' }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visibilityData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={borderLight} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: textLight }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: textDark, fontWeight: 700, fontSize: 14 }} width={120} />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '8px', border: `1px solid ${borderLight}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 600 }} />
                  <Bar dataKey="current" name="Current Visibility" fill="#EF4444" radius={[0, 6, 6, 0]} barSize={24} />
                  <Bar dataKey="target" name="Target CALF ONE" fill={secondary} radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        }
      />

      {/* SLIDE 3: CHALLENGES */}
      <Slide 
        title="Current State Challenges"
        subtitle="Systemic operational limitations and executive pain points"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { t: 'Data Fragmentation', d: 'ESB data exists but is not transformed into actionable business intelligence.' },
              { t: 'No Single Source of Truth', d: 'Data is scattered across systems causing executive misalignment.' },
              { t: 'No CRM & Loyalty', d: 'Customer data cannot be leveraged for retention and growth.' },
              { t: 'No Centralized CCTV', d: 'Operations visibility requires manual individual checking.' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '4px', backgroundColor: '#EF4444', borderRadius: '2px', flexShrink: 0 }} />
                <div>
                  <Text style={{ color: textDark, fontWeight: 700, fontSize: '18px', display: 'block', marginBottom: '8px' }}>{c.t}</Text>
                  <Text style={{ color: textLight, fontSize: '15px', lineHeight: 1.6 }}>{c.d}</Text>
                </div>
              </div>
            ))}
          </div>
        }
        rightContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Text style={{ fontSize: '18px', fontWeight: 700, color: textDark, marginBottom: '8px' }}>The reality of answering critical questions:</Text>
            {[
              { q: "What is today's real-time revenue?", a: "Requires manual reporting." },
              { q: "Which outlet has operational issues?", a: "Not immediately visible." },
              { q: "Who are our most valuable customers?", a: "Data currently unavailable." },
              { q: "What are customers saying online?", a: "No centralized brand monitoring." },
            ].map((qa, i) => (
              <div key={i} style={{ padding: '24px 0', borderBottom: `1px solid ${borderLight}`, backgroundColor: bg }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <Text style={{ fontWeight: 800, color: textDark, fontSize: '16px' }}>Q:</Text>
                  <Text style={{ fontWeight: 700, color: textDark, fontSize: '16px' }}>{qa.q}</Text>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Text style={{ fontWeight: 800, color: '#EF4444', fontSize: '16px' }}>A:</Text>
                  <Text style={{ color: textLight, fontSize: '16px' }}>{qa.a}</Text>
                </div>
              </div>
            ))}
          </div>
        }
      />

      {/* SLIDE 4: VISION */}
      <Slide 
        altBg={true}
        title="CALF ONE Vision"
        subtitle="The Centralized Intelligence Ecosystem"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Text style={{ fontSize: '18px', color: textLight, lineHeight: 1.6 }}>
              CALF ONE is not just another application. It is the core operating system that bridges fragmented data into a unified platform.
            </Text>
            <div style={{ padding: '32px', backgroundColor: primary, borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 45, 107, 0.15)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><Database size={20} /> ONE DATA</div>
                <div style={{ padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><Activity size={20} /> ONE DASHBOARD</div>
                <div style={{ padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><Target size={20} /> ONE CUSTOMER</div>
              </div>
            </div>
          </div>
        }
        rightContent={
          <div style={{ padding: '40px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, padding: '24px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '8px', textAlign: 'center' }}>
                <Text style={{ fontWeight: 700, color: textDark }}>Legacy Sources</Text>
              </div>
              <ArrowRight size={20} color="#CBD5E1" />
              <div style={{ flex: 1.5, padding: '32px 24px', backgroundColor: bg, border: `2px solid ${secondary}`, borderRadius: '8px', textAlign: 'center' }}>
                <Server size={32} color={secondary} style={{ margin: '0 auto 12px auto' }} />
                <Text style={{ fontWeight: 800, color: primary, fontSize: '18px' }}>CALF ONE</Text>
              </div>
              <ArrowRight size={20} color="#CBD5E1" />
              <div style={{ flex: 1, padding: '24px', backgroundColor: primary, borderRadius: '8px', textAlign: 'center' }}>
                <Text style={{ fontWeight: 800, color: '#FFFFFF' }}>End Users</Text>
              </div>
            </div>
          </div>
        }
      />

      {/* SLIDE 5: ROADMAP */}
      <Slide 
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '40px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '8px' }}>
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
                <div style={{ flex: 1, height: '12px', backgroundColor: bg, border: `1px solid ${borderLight}`, borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: r.w, backgroundColor: r.c, borderRadius: '6px' }} />
                </div>
                <Text style={{ width: '60px', fontSize: '12px', fontWeight: 600, color: textLight, textAlign: 'right' }}>{r.y}</Text>
              </div>
            ))}
          </div>
        }
      />

      {/* SLIDE 6: TEAM GROWTH PLAN */}
      <Slide 
        altBg={true}
        title="Team Growth Plan"
        subtitle="Scaling capabilities alongside technological complexity"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px 0', borderBottom: `1px solid ${borderLight}`, backgroundColor: bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 700, fontSize: '15px', color: textDark }}>Juni 2026</Text>
                <Text style={{ fontWeight: 700, fontSize: '14px', color: secondary }}>1 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block', lineHeight: 1.6 }}>
                Digital Transformation Lead. Fokus pada assessment & vendor management.
              </Text>
            </div>

            <div style={{ padding: '20px 0', borderBottom: `1px solid ${borderLight}`, backgroundColor: bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 700, fontSize: '15px', color: textDark }}>Tahun 2027</Text>
                <Text style={{ fontWeight: 700, fontSize: '14px', color: secondary }}>2-3 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block', lineHeight: 1.6 }}>
                Penambahan tim operasional: Digital Transformation Lead, Infrastructure Engineer, Junior Software Engineer.
              </Text>
            </div>

            <div style={{ padding: '20px 0', borderBottom: `1px solid ${borderLight}`, backgroundColor: bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text style={{ fontWeight: 700, fontSize: '15px', color: textDark }}>Tahun 2028</Text>
                <Text style={{ fontWeight: 700, fontSize: '14px', color: secondary }}>5-6 Person</Text>
              </div>
              <Text style={{ fontSize: '13px', color: textLight, display: 'block', lineHeight: 1.6 }}>
                Pengembangan platform (CRM & Loyalty): Lead, Infra, Backend, Frontend, IT Support, Data Engineer.
              </Text>
            </div>

            <div style={{ padding: '20px 0', borderBottom: `2px solid ${secondary}`, backgroundColor: bg }}>
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
          <div style={{ height: '450px', width: '100%', padding: '20px 0', backgroundColor: bg }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={teamData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorTeamWhy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={secondary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={secondary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={borderLight} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: textLight, fontSize: 13, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: textLight, fontSize: 13, fontWeight: 600 }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: `1px solid ${borderLight}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="headcount" name="Team Headcount" stroke={secondary} strokeWidth={3} fillOpacity={1} fill="url(#colorTeamWhy)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        }
      />

      {/* SLIDE 7: BUSINESS IMPACT */}
      <Slide 
        title="Business Impact"
        subtitle="Expected ROI & Efficiency Gains"
        leftContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ padding: '32px 24px', backgroundColor: bg, borderLeft: `4px solid ${borderLight}`, textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>+70%</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>DECISION SPEED</Text>
              </div>
              <div style={{ padding: '32px 24px', backgroundColor: bg, borderLeft: `4px solid ${borderLight}`, textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>5 Mins</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>REPORTING TIME</Text>
              </div>
              <div style={{ padding: '32px 24px', backgroundColor: bg, borderLeft: `4px solid ${borderLight}`, textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>100%</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>OUTLET VISIBILITY</Text>
              </div>
              <div style={{ padding: '32px 24px', backgroundColor: bg, borderLeft: `4px solid ${borderLight}`, textAlign: 'center' }}>
                <Title level={2} style={{ color: primary, margin: '0 0 8px 0', fontSize: '36px' }}>100%</Title>
                <Text style={{ color: textLight, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>CCTV VISIBILITY</Text>
              </div>
            </div>
          </div>
        }
        rightContent={
          <div style={{ padding: '40px', backgroundColor: primary, borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px' }}>
            <Title level={1} style={{ color: '#FFFFFF', fontSize: '48px', fontWeight: 800, margin: '0 0 24px 0', letterSpacing: '-1px', lineHeight: 1.2 }}>
              From Fragmented Operations<br/>
              <span style={{ color: '#93C5FD' }}>To Data-Driven Decisions.</span>
            </Title>
            <Text style={{ color: '#E2E8F0', fontSize: '18px', display: 'block', marginTop: '24px', letterSpacing: '2px', fontWeight: 700 }}>
              POWERED BY CALF ONE.
            </Text>
          </div>
        }
      />
      
    </div>
  );
}
