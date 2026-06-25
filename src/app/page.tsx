"use client"

import dynamic from 'next/dynamic';
import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Progress, Segmented, Spin, Table, Tag, Tabs, Badge, Space } from 'antd';
import { 
  BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  TrendingUp, Users, ShieldCheck, Video, Wifi, ShoppingBag, 
  AlertTriangle, Sparkles, Activity, HeartHandshake, MapPin, Layers, Briefcase, FileText
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { 
  useOperationsData, useSocialData, useCustomerCareData, 
  useRiskAndInsightsData, useExpansionData 
} from '@/hooks/useDashboardModules';
import { formatNumber } from '@/lib/utils';
import { areaRevenueData, topOutlets } from "@/lib/data";

const OutletsMap = dynamic(() => import('@/components/dashboard/outlets-map'), { 
  ssr: false, 
  loading: () => (
    <div style={{ height: 400, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  )
});

const { Text, Title } = Typography;

// Rich varied chart mock data with real fallbacks
const defaultRevenueVelocity = Array.from({ length: 12 }, (_, i) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseRev = 320 + Math.sin(i) * 60 + i * 18;
  return {
    month: months[i],
    actualRevenue: Math.round(baseRev),
    targetRevenue: Math.round(310 + i * 16),
    orderVolume: Math.round(4200 + i * 280)
  };
});

const paymentMethodsData = [
  { name: 'QRIS', value: 48, color: '#1F5EFF' },
  { name: 'Credit / Debit Card', value: 26, color: '#0EA5E9' },
  { name: 'E-Wallet (Gopay/OVO)', value: 17, color: '#10B981' },
  { name: 'Cash', value: 9, color: '#F59E0B' },
];

const Card = ({ children, title, action, style }: any) => (
  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)', ...style }}>
    {(title || action) && (
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
        {typeof title === 'string' ? <Text style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{title}</Text> : title}
        {action}
      </div>
    )}
    <div style={{ padding: '20px' }}>
      {children}
    </div>
  </div>
);

export default function OverviewPage() {
  const [chartTimeframe, setChartTimeframe] = useState('12M');
  const [activeTab, setActiveTab] = useState('outlets');

  // Multi-page Cross-Data Hooks
  const dashboardData = useDashboardData();
  const { orders } = useIntelligenceData();
  const { infrastructures, attendances } = useOperationsData();
  const { complaints } = useCustomerCareData();
  const { sentiments } = useSocialData();
  const { proposals } = useExpansionData();
  const { alerts } = useRiskAndInsightsData();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Compute live cross-page metrics safely
  const liveStats = useMemo(() => {
    const rev = dashboardData.totalRevenue || 4850000000;
    const trx = dashboardData.totalTransactions || 18420;
    const cctvOnlineCount = infrastructures.filter((i: any) => i.cctv_status === 'online').length || 108;
    const totalInfra = infrastructures.length || 115;
    const openComplaintsCount = complaints.filter((c: any) => c.status !== 'resolved').length || 4;
    const sentimentPos = sentiments.length ? 82 : 79;
    const activeProposals = proposals.length || 6;

    return { rev, trx, cctvOnlineCount, totalInfra, openComplaintsCount, sentimentPos, activeProposals };
  }, [dashboardData, infrastructures, complaints, sentiments, proposals]);

  const kpiCards = [
    { label: 'Enterprise Gross Revenue', value: `Rp ${(liveStats.rev / 1000000000).toFixed(2)}B`, trend: '+14.2%', status: 'success', source: 'Revenue Page' },
    { label: 'Total Network Orders', value: formatNumber(liveStats.trx), trend: '+8.5%', status: 'success', source: 'Orders Page' },
    { label: 'CCTV Surveillance Ratio', value: `${liveStats.cctvOnlineCount} / ${liveStats.totalInfra}`, trend: `${Math.round((liveStats.cctvOnlineCount/liveStats.totalInfra)*100)}% Online`, status: 'neutral', source: 'Operations Page' },
    { label: 'Brand Public Sentiment', value: `${liveStats.sentimentPos}% Positive`, trend: '+4.1%', status: 'success', source: 'Social Page' },
    { label: 'Active Customer Issues', value: `${liveStats.openComplaintsCount} Cases`, trend: '-2 Resolved', status: liveStats.openComplaintsCount > 5 ? 'warning' : 'success', source: 'Care Page' },
    { label: 'Expansion Pipeline', value: `${liveStats.activeProposals} Proposals`, trend: 'Reviewing', status: 'neutral', source: 'Expansion Page' },
  ];

  const outletColumns = [
    { title: 'Branch Name', dataIndex: 'name', key: 'name', render: (text: string) => <Text style={{ fontWeight: 600, color: '#0F172A' }}>{text}</Text> },
    { title: 'Region Area', dataIndex: 'area', key: 'area', render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: 'Monthly Revenue', dataIndex: 'revenue', key: 'revenue', render: (val: number) => <Text style={{ fontWeight: 600 }}>Rp {(val / 1000000).toFixed(1)}M</Text> },
    { 
      title: 'Growth Rate', 
      dataIndex: 'growth', 
      key: 'growth', 
      render: (val: number) => (
        <span style={{ color: val >= 0 ? '#059669' : '#EF4444', backgroundColor: val >= 0 ? '#D1FAE5' : '#FEE2E2', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
          {val >= 0 ? '+' : ''}{val}%
        </span>
      )
    },
    { 
      title: 'Ops Health Score', 
      dataIndex: 'healthScore', 
      key: 'healthScore', 
      render: (val: number) => <Progress percent={val} size="small" strokeColor={val > 90 ? '#059669' : val > 75 ? '#F59E0B' : '#EF4444'} style={{ width: 120, margin: 0 }} /> 
    },
  ];

  const fallbackComplaints = [
    { id: 1, branch: 'Calf Dago Bandung', text: 'Waktu tunggu pesanan Takeaway melebihi 25 menit saat rush hour.', status: 'investigating', severity: 'High' },
    { id: 2, branch: 'Calf Sudirman Jakarta', text: 'Koneksi Wi-Fi publik sempat terputus di area indoor lantai 2.', status: 'in_progress', severity: 'Medium' },
    { id: 3, branch: 'Calf Grand Metropolitan', text: 'Kemasan cup minuman mengalami kebocoran kecil pada tutup seal.', status: 'resolved', severity: 'Low' },
  ];

  const fallbackProposals = [
    { id: 1, loc: 'Bintaro Xchange Mall Lt. G', city: 'Tangerang Selatan', budget: 520000000, status: 'Financial Review' },
    { id: 2, loc: 'Pakuwon Mall Food Society', city: 'Surabaya', budget: 680000000, status: 'Site Survey Approved' },
    { id: 3, loc: 'Summarecon Mall Bekasi', city: 'Bekasi', budget: 490000000, status: 'Drafting Layout' },
  ];

  return (
    <MainLayout title="Executive Command Center" subtitle="Holistic Cross-Page Operations & Revenue Intelligence">
      {isLoading ? (
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '48px' }}>
          
          {/* 1. VARIED CROSS-MODULE KPI GRID */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', overflow: 'hidden' }}>
            {kpiCards.map((kpi, idx) => (
              <div key={idx} style={{ padding: '20px 18px', borderRight: idx !== 5 ? '1px solid #E2E8F0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <Text style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{kpi.label}</Text>
                  <span style={{ fontSize: '9px', background: '#F1F5F9', color: '#475569', padding: '2px 5px', borderRadius: '3px', fontWeight: 600 }}>{kpi.source}</span>
                </div>
                <Text style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.2 }}>{kpi.value}</Text>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ 
                    fontSize: '11px', fontWeight: 700, 
                    color: kpi.status === 'success' ? '#059669' : kpi.status === 'warning' ? '#D97706' : '#475569', 
                    backgroundColor: kpi.status === 'success' ? '#D1FAE5' : kpi.status === 'warning' ? '#FEF3C7' : '#F1F5F9',
                    padding: '2px 6px', borderRadius: '4px'
                  }}>
                    {kpi.trend}
                  </span>
                  <Text style={{ fontSize: '11px', color: '#94A3B8' }}>live sync</Text>
                </div>
              </div>
            ))}
          </div>

          {/* 2. ADVANCED VARIED CHARTS: COMPOSED REVENUE VELOCITY & PAYMENT MIX */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={15}>
              <Card 
                title="Revenue Velocity vs Target Trajectory (Bar + Line Velocity)" 
                action={<Segmented options={['3M', '6M', '12M']} value={chartTimeframe} onChange={setChartTimeframe} size="small" />}
              >
                <div style={{ height: '320px', width: '100%' }}>
                  <ResponsiveContainer>
                    <ComposedChart data={defaultRevenueVelocity} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} dy={8} />
                      <YAxis yAxisId="left" tickFormatter={(val) => `Rp${val}M`} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => `${val} Trx`} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <RechartsTooltip formatter={(val: any, name: any) => [name === 'orderVolume' ? `${val} Orders` : `Rp ${val} Juta`, name === 'actualRevenue' ? 'Actual Revenue' : name === 'targetRevenue' ? 'Target KPI' : 'Order Volume']} contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px', fontWeight: 600 }} />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
                      <Bar yAxisId="left" dataKey="actualRevenue" name="Actual Revenue" fill="#1F5EFF" radius={[4, 4, 0, 0]} barSize={26} />
                      <Line yAxisId="left" type="monotone" dataKey="targetRevenue" name="Target KPI" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} />
                      <Line yAxisId="right" type="monotone" dataKey="orderVolume" name="Order Volume" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={9}>
              <Card title="Payment Preference Distribution">
                <div style={{ height: '230px', width: '100%', position: 'relative' }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={paymentMethodsData} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                        {paymentMethodsData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
                      </Pie>
                      <RechartsTooltip formatter={(val) => `${val}% Share`} contentStyle={{ borderRadius: '6px', fontSize: '12px', fontWeight: 600 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <Text style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Top Method</Text>
                    <Text style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>QRIS (48%)</Text>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                  {paymentMethodsData.map(item => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: item.color }} />
                      <Text style={{ fontSize: '12px', color: '#475569', fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Text>
                      <Text style={{ fontSize: '12px', color: '#0F172A', fontWeight: 700 }}>{item.value}%</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          {/* 3. GEOSPATIAL MAP & SHIFT ATTENDANCE MONITOR */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card 
                title="Geospatial Branch Surveillance Map" 
                action={
                  <Space size="middle">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Badge status="success" /><Text style={{ fontSize: 12, fontWeight: 600 }}>112 Online</Text></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Badge status="error" /><Text style={{ fontSize: 12, fontWeight: 600 }}>3 Warning</Text></span>
                  </Space>
                }
              >
                <div style={{ height: '360px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                  <OutletsMap />
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Shift Discipline & CCTV Health">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <Text style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>📹 CCTV Uptime Availability</Text>
                      <Text style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>94.2%</Text>
                    </div>
                    <Progress percent={94} strokeColor="#10B981" showInfo={false} size="small" />
                    <Text style={{ fontSize: '11px', color: '#64748B' }}>108 of 115 cameras streaming 1080p live</Text>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <Text style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>🧑‍🍳 Cashier Shift Attendance</Text>
                      <Text style={{ fontSize: '13px', fontWeight: 700, color: '#1F5EFF' }}>98.1% Present</Text>
                    </div>
                    <Progress percent={98} strokeColor="#1F5EFF" showInfo={false} size="small" />
                    <Text style={{ fontSize: '11px', color: '#64748B' }}>142 staff checked in on-time across all regions</Text>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <Text style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>📦 Inventory Stock Accuracy</Text>
                      <Text style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>89.5%</Text>
                    </div>
                    <Progress percent={89} strokeColor="#F59E0B" showInfo={false} size="small" />
                    <Text style={{ fontSize: '11px', color: '#64748B' }}>12 stock adjustments pending review in Operations</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 4. CROSS-PAGE EXECUTIVE AI ANALYSIS & CONCLUSIONS */}
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#1F5EFF" />
                <Text style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.01em' }}>EXECUTIVE CROSS-DATA ANALYSIS & CONCLUSIONS</Text>
              </div>
            }
            style={{ borderColor: '#93C5FD', background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}
          >
            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <div style={{ padding: '16px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', borderLeft: '4px solid #1F5EFF', height: '100%' }}>
                  <Text style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <TrendingUp size={16} color="#1F5EFF" /> Kesimpulan Pendapatan & Penjualan (Revenue & Orders)
                  </Text>
                  <Text style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Pendapatan kotor jaringan tercatat kuat pada angka **Rp {(liveStats.rev/1000000000).toFixed(2)} Milyar** (+14.2% YoY). Lonjakan terbesar didorong oleh cabang **Tasikmalaya (+22.1%)** dan **Bekasi (+18.5%)**. Preferensi konsumen didominasi pembayaran digital QRIS (48%). Rekomendasi: Alokasikan promosi agresif pada jam 11:00-14:00 menggunakan metode QRIS.
                  </Text>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div style={{ padding: '16px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', borderLeft: '4px solid #10B981', height: '100%' }}>
                  <Text style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <ShieldCheck size={16} color="#10B981" /> Kesimpulan Operasional & Infrastruktur (Operations)
                  </Text>
                  <Text style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Stabilitas jaringan berada di level **{Math.round((liveStats.cctvOnlineCount/liveStats.totalInfra)*100)}% online**. Kedisiplinan absensi shift kasir mencapai 98.1%. Namun, 7 unit CCTV di area Cirebon dan Asia Afrika menunjukkan status *warning/offline*. Rekomendasi: Dispatch teknisi IT ke outlet Cirebon untuk mencegah blank spot pengawasan CCTV.
                  </Text>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div style={{ padding: '16px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', borderLeft: '4px solid #F59E0B', height: '100%' }}>
                  <Text style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <HeartHandshake size={16} color="#F59E0B" /> Kesimpulan Sentimen & Customer Care (Social & Care)
                  </Text>
                  <Text style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Sentimen brand di media sosial bertahan positif di **82%**. Tim Customer Care sedang menangani **{liveStats.openComplaintsCount} keluhan aktif**, mayoritas terkait keterlambatan penyajian saat *rush hour* take-away. Rekomendasi: Penambahan buffer stock bahan baku mentah di kitchen cabang Dago saat akhir pekan.
                  </Text>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div style={{ padding: '16px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', borderLeft: '4px solid #8B5CF6', height: '100%' }}>
                  <Text style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Layers size={16} color="#8B5CF6" /> Kesimpulan Strategi & Ekspansi Cabang (Expansion)
                  </Text>
                  <Text style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    Pipeline ekspansi memuat **{liveStats.activeProposals} proposal lokasi baru** dengan estimasi total investasi Rp 1.68 Milyar. Lokasi Pakuwon Surabaya telah lolos survei lapangan. Rekomendasi: Segera finalisasi tinjauan finansial untuk proposal Bintaro Xchange agar dapat mengejar target pembukaan kuartal depan.
                  </Text>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 5. ENTERPRISE TABBED DATA EXPLORER (OUTLETS, CARE, EXPANSION) */}
          <Card style={{ padding: 0 }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              tabBarStyle={{ padding: '0 20px', background: '#F8FAFC', margin: 0, borderBottom: '1px solid #E2E8F0' }}
              items={[
                {
                  key: 'outlets',
                  label: <span style={{ fontWeight: 700, fontSize: 13 }}>🏪 Top Outlets Performance</span>,
                  children: (
                    <div style={{ padding: '20px' }}>
                      <Table dataSource={topOutlets} columns={outletColumns} pagination={{ pageSize: 5 }} rowKey="id" size="small" scroll={{ x: 650 }} />
                    </div>
                  )
                },
                {
                  key: 'care',
                  label: <span style={{ fontWeight: 700, fontSize: 13 }}>🎧 Customer Care Active Tickets</span>,
                  children: (
                    <div style={{ padding: '20px' }}>
                      <Table 
                        dataSource={complaints.length ? complaints : fallbackComplaints} 
                        columns={[
                          { title: 'Outlet Branch', dataIndex: 'branch', key: 'b', render: (t:any) => <Text strong>{t?.branch_name || t || 'Calf Dago'}</Text> },
                          { title: 'Customer Issue Description', dataIndex: ['complaint_text'], key: 'txt', render: (t:string, r:any) => <Text>{t || r.text}</Text> },
                          { title: 'Severity', dataIndex: 'severity', key: 'sev', render: (s:string) => <Tag color={s==='High'?'red':'orange'}>{s || 'Medium'}</Tag> },
                          { title: 'Ticket Status', dataIndex: 'status', key: 'st', render: (s:string) => <Tag color={s==='resolved'?'green':'blue'}>{(s||'in_progress').toUpperCase()}</Tag> }
                        ]} 
                        pagination={false} rowKey="id" size="small" 
                      />
                    </div>
                  )
                },
                {
                  key: 'expansion',
                  label: <span style={{ fontWeight: 700, fontSize: 13 }}>🚀 Expansion Pipeline Review</span>,
                  children: (
                    <div style={{ padding: '20px' }}>
                      <Table 
                        dataSource={proposals.length ? proposals : fallbackProposals} 
                        columns={[
                          { title: 'Proposed Site Name', dataIndex: ['location_name'], key: 'ln', render: (t:string, r:any) => <Text strong>{t || r.loc}</Text> },
                          { title: 'City / Region', dataIndex: 'city', key: 'c' },
                          { title: 'Est. Budget', dataIndex: ['est_budget'], key: 'eb', render: (v:number, r:any) => <Text>Rp {((v || r.budget)/1000000).toFixed(0)}M</Text> },
                          { title: 'Stage Status', dataIndex: 'status', key: 'st', render: (s:string) => <Tag color="purple">{s.toUpperCase()}</Tag> }
                        ]} 
                        pagination={false} rowKey="id" size="small" 
                      />
                    </div>
                  )
                }
              ]}
            />
          </Card>

        </div>
      )}
    </MainLayout>
  );
}
