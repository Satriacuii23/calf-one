"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Card, Typography, Table, Tag, Space, Spin, Empty, Tooltip } from 'antd';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, Receipt, Percent, DollarSign } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useMemo } from "react";

const { Title, Text } = Typography;

const COLORS = ['#1F5EFF', '#0ea5e9', '#8b5cf6', '#f97316', '#14b8a6', '#ef4444'];

export default function RevenueIntelligencePage() {
  const { orders, isLoading } = useIntelligenceData();

  const metrics = useMemo(() => {
    if (!orders.length) return { gross: 0, net: 0, discount: 0, aov: 0 };
    const gross = orders.reduce((sum, o) => sum + Number(o.subtotal || 0), 0);
    const net = orders.reduce((sum, o) => sum + Number(o.total_payment || 0), 0);
    const discount = orders.reduce((sum, o) => sum + Number(o.total_discount || 0), 0);
    const aov = net / orders.length;
    return { gross, net, discount, aov };
  }, [orders]);

  const paymentData = useMemo(() => {
    const methods: Record<string, number> = {};
    orders.forEach(o => {
      const pm = o.payment_method || 'Unknown';
      methods[pm] = (methods[pm] || 0) + Number(o.total_payment || 0);
    });
    return Object.entries(methods).map(([name, value], i) => ({
      name,
      value,
      color: COLORS[i % COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [orders]);

  const kpiCards = [
    { label: 'Net Revenue', tooltip: 'Total pendapatan bersih setelah diskon.', value: `Rp ${(metrics.net / 1000000).toFixed(1)}M`, icon: Wallet, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Gross Revenue', tooltip: 'Total pendapatan sebelum potongan.', value: `Rp ${(metrics.gross / 1000000).toFixed(1)}M`, icon: TrendingUp, color: '#0ea5e9', bg: '#f0f9ff', trend: '+5.2%' },
    { label: 'Total Discount', tooltip: 'Total nilai diskon yang diberikan.', value: `Rp ${(metrics.discount / 1000000).toFixed(1)}M`, icon: Percent, color: '#8b5cf6', bg: '#f5f3ff', trend: '-2.1%' },
    { label: 'Avg Order Value', tooltip: 'Rata-rata nilai per transaksi.', value: `Rp ${(metrics.aov).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, icon: DollarSign, color: '#14b8a6', bg: '#f0fdfa', trend: '+8.1%' },
  ];

  const columns = [
    { title: 'Order ID', dataIndex: 'order_id', key: 'order_id', render: (text: string) => <Text strong>{text}</Text> },
    { title: 'Date', dataIndex: 'transaction_date', key: 'date', render: (date: string) => <Text>{new Date(date).toLocaleString('id-ID')}</Text> },
    { title: 'Type', dataIndex: 'order_type_name', key: 'type' },
    { title: 'Payment', dataIndex: 'payment_method', key: 'payment' },
    { title: 'Amount', dataIndex: 'total_payment', key: 'amount', align: 'right' as const, render: (val: number) => <Text strong>Rp {val.toLocaleString('id-ID')}</Text> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => (
      <Tag color={status.toLowerCase() === 'completed' ? 'success' : status.toLowerCase() === 'cancelled' ? 'error' : 'processing'}>
        {status.toUpperCase()}
      </Tag>
    )},
  ];

  return (
    <MainLayout title="Revenue Intelligence" subtitle="Analisis pendapatan, metode pembayaran, dan riwayat transaksi">
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
              <Card title="Payment Method Breakdown" style={{ height: '100%', borderRadius: 12 }}>
                {paymentData.length > 0 ? (
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={paymentData} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                          {paymentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip formatter={(val: any) => `Rp ${val.toLocaleString('id-ID')}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Payment Method (Value)" style={{ height: '100%', borderRadius: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  {paymentData.map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                      <Space size={8}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
                        <Text strong>{item.name}</Text>
                      </Space>
                      <Text strong style={{ color: '#1F5EFF' }}>Rp {item.value.toLocaleString('id-ID')}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          <Card title={<Space><Text strong>Recent Transactions</Text><Tooltip title="Daftar menyeluruh transaksi terakhir."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ marginBottom: 24, borderRadius: 12 }}>
            <Table 
              columns={columns} 
              dataSource={orders} 
              pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} transaksi` }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
            />
          </Card>
        </>
      )}
    </MainLayout>
  );
}
