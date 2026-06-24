"use client"

import { MainLayout } from "@/components/layout/main-layout";
import {
  Row,
  Col,
  Card,
  Typography,
  Badge,
  Progress,
  Table,
  Button,
  Segmented,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  Receipt,
  Users,
  Building2,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Video,
  Wifi,
  Truck,
  MessageSquare,
  ThumbsUp,
  Brain,
  ShoppingBag,
} from 'lucide-react';
import {
  topOutlets,
  infrastructureStatus,
  areaRevenueData,
  healthScoreData,
} from "@/lib/data";
import { useState, useMemo } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatNumber } from '@/lib/utils';

const { Text, Title } = Typography;

const allRevenueData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2026, 0, 1);
  date.setDate(date.getDate() + i);
  const base = 420000000 + (i % 7 === 0 || i % 7 === 6 ? 120000000 : 0) + (i * 800000);
  return {
    date: date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    revenue: base,
    target: base * 1.05,
  };
});

const areaColors = ['#1F5EFF', '#0ea5e9', '#8b5cf6', '#f97316', '#14b8a6', '#ef4444'];
const areaData = areaRevenueData.map((item, index) => ({
  name: item.area,
  value: Math.round(item.revenue / 1000000),
  color: areaColors[index % areaColors.length],
}));

const FILTER_RANGES: Record<string, number> = { '7D': 7, '30D': 30, '90D': 90, '12M': 365 };

export default function OverviewPage() {
  const [revenueFilter, setRevenueFilter] = useState('30D');
  const dashboardData = useDashboardData();

  const filteredRevenue = useMemo(() => {
    const days = FILTER_RANGES[revenueFilter];
    return allRevenueData.slice(-days);
  }, [revenueFilter]);

  const totalScore = Math.round(
    healthScoreData.reduce((acc, item) => acc + item.score * (item.weight / 100), 0)
  );

  const kpiCards = [
    { label: 'Total Revenue', tooltip: 'Total pendapatan kotor dari seluruh cabang yang terdata.', value: `Rp ${(dashboardData.totalRevenue / 1000000).toFixed(1)}M`, icon: TrendingUp, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Total Orders', tooltip: 'Jumlah keseluruhan pesanan (Dine-in, Takeaway, dan Delivery).', value: formatNumber(dashboardData.totalTransactions), icon: ShoppingBag, color: '#f59e0b', bg: '#fffbeb', trend: '+5.2%' },
    { label: 'Active Members', tooltip: 'Pelanggan aktif yang terdaftar dalam program loyalitas.', value: formatNumber(dashboardData.totalCustomers), icon: Users, color: '#8b5cf6', bg: '#f5f3ff', trend: '+18.4%' },
    { label: 'Active Outlets', tooltip: 'Jumlah gerai yang saat ini beroperasi aktif.', value: `${dashboardData.totalOutlets}`, icon: Building2, color: '#22c55e', bg: '#f0fdf4', trend: '0%' },
    { label: 'Health Score', tooltip: 'Indeks kesehatan operasional berdasarkan skor performa.', value: `${totalScore}/100`, icon: ShieldCheck, color: '#f59e0b', bg: '#fffbeb', trend: '+1.2%' },
  ];

  const tableColumns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (_: any, __: any, index: number) => <Text type="secondary">{index + 1}</Text> },
    { title: 'Outlet', key: 'outlet', render: (record: any) => (<div><Text strong>{record.name}</Text><br/><Text type="secondary" style={{ fontSize: 12 }}>{record.area}</Text></div>) },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', align: 'right' as const, render: (rev: number) => <Text strong>Rp {(rev / 1000000).toFixed(0)}M</Text> },
    { title: 'Growth', dataIndex: 'growth', key: 'growth', align: 'right' as const, render: (growth: number) => (
      <Space size={4}>
        {growth >= 0 ? <ArrowUpRight size={14} color="#22c55e" /> : <ArrowDownRight size={14} color="#ef4444" />}
        <Text strong style={{ color: growth >= 0 ? '#22c55e' : '#ef4444' }}>{growth >= 0 ? '+' : ''}{growth}%</Text>
      </Space>
    )},
    { title: 'Health Score', dataIndex: 'healthScore', key: 'healthScore', align: 'center' as const, render: (score: number) => (
      <Space size={8}>
        <Progress percent={score} showInfo={false} strokeColor={score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'} style={{ width: 50, marginBottom: 0 }} />
        <Text strong style={{ color: score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444' }}>{score}</Text>
      </Space>
    )},
    { title: 'Status', dataIndex: 'status', key: 'status', align: 'center' as const, render: (status: string) => (
      <Tag color={status === 'online' ? 'success' : status === 'warning' ? 'warning' : 'error'}>{status.toUpperCase()}</Tag>
    )},
  ];

  return (
    <MainLayout title="Executive Command Center" subtitle="Ringkasan performa Kopi Calf secara real-time">
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {kpiCards.map((kpi) => (
          <Col xs={24} sm={12} lg={8} xl={4} key={kpi.label}>
            <Card variant="outlined" style={{ borderTop: `3px solid ${kpi.color}`, height: '100%', borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <Space align="center" size={4}>
                  <Text type="secondary" style={{ fontSize: 13, fontWeight: 600 }}>{kpi.label}</Text>
                  <Tooltip title={kpi.tooltip}>
                    <InfoCircleOutlined style={{ color: '#94a3b8', fontSize: 13, cursor: 'help' }} />
                  </Tooltip>
                </Space>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <kpi.icon size={16} color={kpi.color} />
                </div>
              </div>
              <Title level={3} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{kpi.value}</Title>
              <Text style={{ color: '#10b981', fontSize: 13, fontWeight: 500, display: 'inline-block', marginTop: 8 }}>{kpi.trend} <span style={{ color: '#64748b', fontWeight: 400 }}>vs last month</span></Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<Space><Text strong>Revenue Trend</Text><Tooltip title="Grafik pergerakan pendapatan kotor harian."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} extra={
            <Segmented options={['7D', '30D', '90D', '12M']} value={revenueFilter} onChange={setRevenueFilter} />
          } styles={{ body: { padding: 16 } }} style={{ height: '100%' }}>
            <div style={{ height: 260, width: '100%' }}>
              <ResponsiveContainer>
                <AreaChart data={filteredRevenue} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F5EFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1F5EFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(val) => `${val/1000000}M`} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <RechartsTooltip formatter={(value: any) => `Rp ${(value/1000000).toFixed(0)}M`} />
                  <Area type="monotone" dataKey="revenue" stroke="#1F5EFF" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeDasharray="5 5" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Revenue by Area" styles={{ body: { padding: 16 } }} style={{ height: '100%' }}>
            <div style={{ height: 160, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={areaData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                    {areaData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip formatter={(val) => `Rp ${val}M`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
              {areaData.map(item => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Space size={8}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
                    <Text style={{ fontSize: 13 }}>{item.name}</Text>
                  </Space>
                  <Text strong style={{ fontSize: 13 }}>Rp {item.value}M</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Risk Alert" extra={<Button type="link" size="small" style={{ padding: 0 }}>Lihat Semua</Button>} styles={{ body: { padding: 16 } }} style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {dashboardData.riskAlerts.map((alert: any) => {
                const color = alert.severity === 'high' ? '#ef4444' : alert.severity === 'medium' ? '#f59e0b' : '#3b82f6';
                return (
                  <div key={alert.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginTop: 6 }} />
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.3, marginBottom: 2 }}>{alert.title}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>{new Date(alert.created_at).toLocaleDateString()}</Text>
                    </div>
                    {!alert.is_dismissed && <Badge dot color="red" />}
                  </div>
                )
              })}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title={<Space><Text strong>Top Outlet (by Revenue)</Text><Tooltip title="Peringkat cabang dengan performa pendapatan tertinggi."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} extra={<Button type="link">Lihat Semua</Button>} style={{ marginBottom: 24, borderRadius: 12 }}>
        <Table 
          columns={tableColumns} 
          dataSource={topOutlets} 
          pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t) => `Total ${t} outlet` }}
          size="middle"
          rowKey="id"
          scroll={{ x: 600 }}
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title={<Space><Text strong>Infrastructure Status</Text><Tooltip title="Pantauan kondisi CCTV dan jaringan di seluruh lokasi cabang."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} extra={<Tag color="success">LIVE</Tag>} style={{ height: '100%', borderRadius: 12 }}>
            <Row gutter={[16, 16]}>
              {[
                { icon: Video, label: 'CCTV Online', value: infrastructureStatus.cctv.online, total: infrastructureStatus.cctv.total, color: '#1F5EFF', pct: (infrastructureStatus.cctv.online/infrastructureStatus.cctv.total)*100 },
                { icon: Wifi, label: 'Internet Online', value: infrastructureStatus.internet.online, total: infrastructureStatus.internet.total, color: '#14b8a6', pct: (infrastructureStatus.internet.online/infrastructureStatus.internet.total)*100 },
                { icon: Truck, label: 'Vehicle Online', value: infrastructureStatus.vehicle.online, total: infrastructureStatus.vehicle.total, color: '#8b5cf6', pct: (infrastructureStatus.vehicle.online/infrastructureStatus.vehicle.total)*100 },
                { icon: MessageSquare, label: 'Open Complaint', value: infrastructureStatus.openComplaint, total: '', color: '#f59e0b', pct: 0 },
                { icon: ThumbsUp, label: 'Social Sentiment', value: `${infrastructureStatus.socialSentiment}%`, total: 'Positif', color: '#22c55e', pct: infrastructureStatus.socialSentiment },
              ].map(item => (
                <Col xs={24} sm={12} lg={12} xl={4} key={item.label}>
                  <div style={{ padding: 12, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                      <item.icon size={16} color={item.color} />
                    </div>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4, minHeight: 18 }}>{item.label}</Text>
                    <Space align="baseline" size={4} wrap={false} style={{ whiteSpace: 'nowrap', display: 'flex' }}>
                      <Text strong style={{ fontSize: 18, color: item.color }}>{item.value}</Text>
                      {item.total && <Text type="secondary" style={{ fontSize: 12 }}>/{item.total}</Text>}
                    </Space>
                    {item.pct > 0 && <Progress percent={item.pct} showInfo={false} strokeColor={item.color} size="small" style={{ marginBottom: 0, marginTop: 4 }} />}
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={<Space><Text strong>AI Executive Assistant</Text><Tooltip title="Rekomendasi otomatis dari algoritma CALF ONE."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ height: '100%', borderRadius: 12 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={18} color="#1F5EFF" />
              </div>
              <div>
                <Text strong style={{ fontSize: 14, display: 'block' }}>AI Recommendation</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>Powered by CALF AI</Text>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {dashboardData.aiInsights.map((rec: any) => (
                <div key={rec.id} style={{ padding: 12, border: '1px solid #e2e8f0', borderLeft: '3px solid #1F5EFF', borderRadius: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 6 }}>
                    <Text strong style={{ fontSize: 13, lineHeight: 1.3 }}>{rec.title}</Text>
                    <div><Tag color="blue" style={{ margin: 0, whiteSpace: 'normal', height: 'auto' }}>Impact: {rec.expected_impact || 'High'}</Tag></div>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12 }}>{rec.description}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  )
}
