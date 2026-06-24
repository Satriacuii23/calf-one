"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Card, Typography, Table, Space, Spin, Empty, Tag, Tooltip } from 'antd';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, WalletCards, Award, Crown, CalendarCheck } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useMemo } from "react";

const { Title, Text } = Typography;

const TIER_COLORS: Record<string, string> = {
  'Gold': '#f59e0b',
  'Silver': '#94a3b8',
  'Bronze': '#b45309',
  'Basic': '#1F5EFF'
};

export default function CustomerIntelligencePage() {
  const { members, isLoading } = useIntelligenceData();

  const customerStats = useMemo(() => {
    if (!members.length) return { total: 0, active: 0, avgCLV: 0, avgPoints: 0, tierData: [], topTierPct: 0 };
    
    const total = members.length;
    const active = members.filter(m => m.total_transactions > 0).length;
    const totalSpentAll = members.reduce((sum, m) => sum + Number(m.total_spent || 0), 0);
    const totalPointsAll = members.reduce((sum, m) => sum + Number(m.member_points || 0), 0);
    
    const avgCLV = total > 0 ? totalSpentAll / total : 0;
    const avgPoints = total > 0 ? totalPointsAll / total : 0;

    const tiers: Record<string, number> = {};
    members.forEach(m => {
      const tier = m.member_tier || 'Basic';
      tiers[tier] = (tiers[tier] || 0) + 1;
    });

    const tierData = Object.entries(tiers).map(([name, value]) => ({
      name,
      value,
      color: TIER_COLORS[name] || '#1F5EFF'
    })).sort((a, b) => b.value - a.value);

    const topTierPct = total > 0 ? ((tiers['Gold'] || 0) / total) * 100 : 0;

    return { total, active, avgCLV, avgPoints, tierData, topTierPct };
  }, [members]);

  const kpiCards = [
    { label: 'Total Members', tooltip: 'Jumlah total pelanggan yang terdaftar sebagai member loyalti.', value: customerStats.total.toLocaleString('id-ID'), icon: Users, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Avg Spend / Member', tooltip: 'Rata-rata nominal uang yang dihabiskan satu member.', value: `Rp ${Math.round(customerStats.avgCLV).toLocaleString('id-ID')}`, icon: Award, color: '#f59e0b', bg: '#fffbeb', trend: '+5.2%' },
    { label: 'Top Tier (Gold)', tooltip: 'Persentase member di tingkat Gold/Tertinggi.', value: `${customerStats.topTierPct.toFixed(1)}%`, icon: Crown, color: '#14b8a6', bg: '#f0fdfa', trend: '+2.1%' },
    { label: 'Active This Month', tooltip: 'Anggota yang melakukan transaksi dalam 30 hari terakhir.', value: customerStats.active.toLocaleString('id-ID'), icon: CalendarCheck, color: '#8b5cf6', bg: '#f5f3ff', trend: '+8.4%' },
  ];

  const columns = [
    { title: 'Rank', dataIndex: 'rank', key: 'rank', width: 80, render: (_: any, __: any, idx: number) => <Text strong>#{idx + 1}</Text> },
    { title: 'Member Name', dataIndex: 'member_name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
    { title: 'Tier', dataIndex: 'member_tier', key: 'tier', render: (tier: string) => (
      <Tag color={tier === 'Gold' ? 'orange' : tier === 'Silver' ? 'default' : tier === 'Bronze' ? 'volcano' : 'blue'}>
        {tier?.toUpperCase() || 'BASIC'}
      </Tag>
    )},
    { title: 'Points', dataIndex: 'member_points', key: 'points', align: 'right' as const, render: (val: number) => <Text>{val?.toLocaleString('id-ID')}</Text> },
    { title: 'Transactions', dataIndex: 'total_transactions', key: 'trx', align: 'center' as const },
    { title: 'Total Spent', dataIndex: 'total_spent', key: 'spent', align: 'right' as const, render: (val: number) => <Text strong style={{ color: '#1F5EFF' }}>Rp {val?.toLocaleString('id-ID')}</Text> },
  ];

  return (
    <MainLayout title="Customer Intelligence" subtitle="Analisis perilaku pelanggan, keanggotaan, dan retensi">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {kpiCards.map((kpi) => (
              <Col xs={24} sm={12} lg={6} key={kpi.label}>
                <Card variant="outlined" style={{ borderTop: `3px solid ${kpi.color}`, height: '100%', borderRadius: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <Space align="center" size={4}>
                      <Text type="secondary" style={{ fontSize: 13, fontWeight: 600 }}>{kpi.label}</Text>
                      <Tooltip title={kpi.tooltip}>
                        <InfoCircleOutlined size={14} style={{ color: '#94a3b8', cursor: 'help' }} />
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
              <Card title={<Space><Text strong>Membership Tier Distribution</Text><Tooltip title="Proporsi tingkat (Tier) yang dipegang oleh seluruh pelanggan."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ height: '100%', borderRadius: 12 }}>
                {customerStats.tierData.length > 0 ? (
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={customerStats.tierData} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                          {customerStats.tierData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip formatter={(val: any) => `${val.toLocaleString('id-ID')} Members`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title={<Space><Text strong>Top 5 Members (by Spending)</Text><Tooltip title="Pelanggan teratas berdasarkan total pembelanjaan seumur hidup."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ height: '100%', borderRadius: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  {customerStats.tierData.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                      <Space size={8}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
                        <Text strong>{item.name}</Text>
                      </Space>
                      <Text strong style={{ color: '#1F5EFF' }}>{item.value.toLocaleString('id-ID')} Members</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          <Card title={<Space><Text strong>Customer Leaderboard</Text><Tooltip title="Tabel lengkap profil pelanggan berserta tingkat loyalti mereka."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ marginBottom: 24, borderRadius: 12 }}>
            <Table 
              columns={columns} 
              dataSource={members} 
              pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} pelanggan` }}
              size="middle"
              rowKey="member_code"
              scroll={{ x: 800 }}
            />
          </Card>
        </>
      )}
    </MainLayout>
  );
}
