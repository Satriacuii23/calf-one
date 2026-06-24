"use client"

import dynamic from 'next/dynamic';

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Badge, Progress, Table, Button, Segmented, Space, Tag, Tooltip, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, TrendingUp, Receipt, Users, Building2, ShieldCheck, ArrowUpRight, ArrowDownRight, Video, Wifi, Truck, MessageSquare, ThumbsUp, Brain, ShoppingBag, Sparkles, HeartHandshake, Zap, Server, PieChart as PieChartIcon, AlertTriangle } from 'lucide-react';
import { topOutlets, infrastructureStatus, areaRevenueData, healthScoreData } from "@/lib/data";
import { useState, useMemo, useEffect } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useSocialData, useCustomerCareData } from '@/hooks/useDashboardModules';
import { formatNumber } from '@/lib/utils';

const OutletsMap = dynamic(() => import('@/components/dashboard/outlets-map'), { 
  ssr: false, 
  loading: () => (
    <div style={{ height: 400, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  )
});

const { Text, Title } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style, height: '100%' }}>
    {children}
  </div>
);

const allRevenueData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2026, 0, 1);
  date.setDate(date.getDate() + i);
  const base = 420000000 + (i % 7 === 0 || i % 7 === 6 ? 120000000 : 0) + (i * 800000);
  return { date: date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }), revenue: base, target: base * 1.05 };
});

const areaColors = ['#1F5EFF', '#0ea5e9', '#8b5cf6', '#f97316', '#14b8a6', '#ef4444'];
const areaData = areaRevenueData.map((item, index) => ({
  name: item.area, value: Math.round(item.revenue / 1000000), color: areaColors[index % areaColors.length]
}));

const FILTER_RANGES: Record<string, number> = { '7D': 7, '30D': 30, '90D': 90, '12M': 365 };

export default function OverviewPage() {
  const [revenueFilter, setRevenueFilter] = useState('30D');
  const dashboardData = useDashboardData();
  const { sentiments } = useSocialData();
  const { complaints } = useCustomerCareData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for layout matching
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const filteredRevenue = useMemo(() => {
    const days = FILTER_RANGES[revenueFilter];
    return allRevenueData.slice(-days);
  }, [revenueFilter]);

  const totalScore = Math.round(healthScoreData.reduce((acc, item) => acc + item.score * (item.weight / 100), 0));

  const kpiCards = [
    { label: 'Total Revenue', tooltip: 'Total pendapatan kotor.', value: `Rp ${(dashboardData.totalRevenue / 1000000).toFixed(1)}M`, icon: TrendingUp, trend: '+12.5%' },
    { label: 'Total Orders', tooltip: 'Jumlah keseluruhan pesanan.', value: formatNumber(dashboardData.totalTransactions), icon: ShoppingBag, trend: '+5.2%' },
    { label: 'Active Members', tooltip: 'Pelanggan aktif loyalitas.', value: formatNumber(dashboardData.totalCustomers), icon: Users, trend: '+18.4%' },
    { label: 'Active Outlets', tooltip: 'Jumlah gerai beroperasi.', value: `${dashboardData.totalOutlets}`, icon: Building2, trend: '0%' },
    { label: 'Health Score', tooltip: 'Indeks kesehatan operasional.', value: `${totalScore}/100`, icon: ShieldCheck, trend: '+1.2%' },
  ];

  const summaryInsight = "Data eksekutif menunjukkan performa stabil dengan total pendapatan mencapai target harian. Infrastruktur fisik beroperasi optimal pada tingkat 100%, didukung oleh metrik sentimen pelanggan yang terus menunjukkan tren positif. Rekomendasi utama: Tingkatkan utilisasi AI Executive Insights untuk mengidentifikasi pola anomali lebih awal.";

  return (
    <MainLayout title="Executive Command Center" subtitle="Ringkasan performa Kopi Calf secara real-time">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ overflowX: 'hidden', width: '100%' }}>
          <div style={{ marginBottom: 32, padding: '8px 0 24px 0', borderBottom: '1px solid #f1f5f9' }}>
            <Row gutter={[24, 24]}>
              {kpiCards.map((kpi) => (
                <Col xs={24} sm={12} lg={4} key={kpi.label} style={{ flex: '1 1 18%', minWidth: 200 }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <kpi.icon size={16} color="#475569" />
                      </div>
                      <Text type="secondary" style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>{kpi.label}</Text>
                      <Tooltip title={kpi.tooltip}>
                        <InfoCircleOutlined style={{ fontSize: 13, color: '#cbd5e1', cursor: 'help' }} />
                      </Tooltip>
                    </div>
                    <Title level={2} style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={kpi.value}>{kpi.value}</Title>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: kpi.trend.startsWith('+') ? '#10b981' : kpi.trend.startsWith('-') ? '#ef4444' : '#64748b', fontSize: 12, fontWeight: 700, background: kpi.trend.startsWith('+') ? '#ecfdf5' : kpi.trend.startsWith('-') ? '#fef2f2' : '#f1f5f9', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>vs last month</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, color: '#0f172a', marginBottom: 4 }}>Calf Executive Summary</Title>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{summaryInsight}</Text>
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={16}>
              <SectionContainer>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrendingUp size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Revenue Trend</Title>
                    <Tooltip title="Pergerakan pendapatan kotor."><InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} /></Tooltip>
                  </Space>
                  <Segmented options={['7D', '30D', '90D', '12M']} value={revenueFilter} onChange={setRevenueFilter} />
                </div>
                <div style={{ height: 280, width: '100%' }}>
                  <ResponsiveContainer>
                    <BarChart data={filteredRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} dy={10} minTickGap={30} />
                      <YAxis tickFormatter={(val) => `${val/1000000}M`} tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} dx={-10} />
                      <RechartsTooltip formatter={(value: any) => [`Rp ${(value/1000000).toFixed(1)} Juta`, 'Revenue']} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f8fafc' }} />
                      <Bar dataKey="revenue" fill="#1F5EFF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SectionContainer>
            </Col>
            <Col xs={24} lg={8}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PieChartIcon size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Revenue by Area</Title>
                  </Space>
                </div>
                <div style={{ height: 180, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={areaData} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                        {areaData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <RechartsTooltip formatter={(val) => `Rp ${val}M`} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  {areaData.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Space size={8}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
                        <Text style={{ fontSize: 13, color: '#475569' }}>{item.name}</Text>
                      </Space>
                      <Text strong style={{ fontSize: 13, color: '#0f172a' }}>Rp {item.value}M</Text>
                    </div>
                  ))}
                </div>
              </SectionContainer>
            </Col>
            <Col xs={24}>
              <SectionContainer style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Top Outlets Performer</Title>
                  </Space>
                  <Button type="link" size="small">Lihat Detail</Button>
                </div>
                <div style={{ padding: '0 24px 24px 24px' }}>
                  <OutletsMap />
                </div>
              </SectionContainer>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={16}>
              <SectionContainer>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Server size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Infrastructure Status</Title>
                  </Space>
                  <Tag color="success">LIVE</Tag>
                </div>
                <Row gutter={[16, 16]}>
                  {[
                    { icon: Video, label: 'CCTV Online', value: infrastructureStatus.cctv.online, total: infrastructureStatus.cctv.total, color: '#1F5EFF', pct: (infrastructureStatus.cctv.online/infrastructureStatus.cctv.total)*100 },
                    { icon: Wifi, label: 'Internet Online', value: infrastructureStatus.internet.online, total: infrastructureStatus.internet.total, color: '#14b8a6', pct: (infrastructureStatus.internet.online/infrastructureStatus.internet.total)*100 },
                    { icon: Truck, label: 'Vehicle Online', value: infrastructureStatus.vehicle.online, total: infrastructureStatus.vehicle.total, color: '#8b5cf6', pct: (infrastructureStatus.vehicle.online/infrastructureStatus.vehicle.total)*100 },
                    { icon: ShieldCheck, label: 'Global Health', value: totalScore, total: '100', color: '#22c55e', pct: totalScore },
                  ].map(item => (
                    <Col xs={24} sm={12} lg={12} xl={6} key={item.label}>
                      <div style={{ padding: 16, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                          <item.icon size={18} color="#475569" />
                        </div>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4, minHeight: 18 }}>{item.label}</Text>
                        <Space align="baseline" size={4} wrap={false} style={{ whiteSpace: 'nowrap', display: 'flex' }}>
                          <Text strong style={{ fontSize: 20, color: item.color }}>{item.value}</Text>
                          {item.total && <Text type="secondary" style={{ fontSize: 13 }}>/{item.total}</Text>}
                        </Space>
                        {item.pct > 0 && <Progress percent={item.pct} showInfo={false} strokeColor={item.color} size="small" style={{ marginBottom: 0, marginTop: 8 }} />}
                      </div>
                    </Col>
                  ))}
                </Row>
              </SectionContainer>
            </Col>
            <Col xs={24} lg={8}>
              <SectionContainer>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertTriangle size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Risk Alerts</Title>
                  </Space>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {dashboardData.riskAlerts.slice(0, 4).map((alert: any) => {
                    const color = alert.severity === 'high' ? '#ef4444' : alert.severity === 'medium' ? '#f59e0b' : '#3b82f6';
                    return (
                      <div key={alert.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12, borderBottom: '1px dashed #e2e8f0' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginTop: 6 }} />
                        <div style={{ flex: 1 }}>
                          <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.4, marginBottom: 4, color: '#0f172a' }}>{alert.title}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>{new Date(alert.created_at).toLocaleDateString()}</Text>
                        </div>
                        {!alert.is_dismissed && <Badge dot color="red" />}
                      </div>
                    )
                  })}
                </div>
              </SectionContainer>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={12}>
              <SectionContainer>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Brain size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>AI Assistant Insights</Title>
                  </Space>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {dashboardData.aiInsights.map((rec: any) => (
                    <div key={rec.id} style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', borderLeft: '4px solid #8b5cf6' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <Text strong style={{ fontSize: 14, color: '#0f172a' }}>{rec.title}</Text>
                        <Tag color="purple" style={{ margin: 0 }}>Impact: {rec.expected_impact || 'High'}</Tag>
                      </div>
                      <Text type="secondary" style={{ display: 'block', marginBottom: 16, lineHeight: 1.5, fontSize: 13 }}>{rec.description}</Text>
                      <Button type="primary" size="small" icon={<Zap size={14} />} style={{ background: '#8b5cf6', borderColor: '#8b5cf6' }}>Apply Action</Button>
                    </div>
                  ))}
                </div>
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HeartHandshake size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Brand Sentiments</Title>
                  </Space>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {sentiments.slice(0, 4).map((s: any) => (
                    <div key={s.id} style={{ display: 'flex', gap: 12, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ThumbsUp size={18} color="#475569" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text strong style={{ fontSize: 13 }}>{s.platform}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>{new Date(s.post_date).toLocaleDateString()}</Text>
                        </div>
                        <Text style={{ fontSize: 13, color: '#475569', lineHeight: 1.4 }}>"{s.comment}"</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionContainer>
            </Col>
          </Row>
          </div>
      )}
    </MainLayout>
  )
}
