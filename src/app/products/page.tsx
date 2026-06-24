"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Card, Typography, Table, Space, Spin, Empty, Tooltip } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShoppingBag, Star, Tag, BarChart3 } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useMemo } from "react";

const { Title, Text } = Typography;

const COLORS = ['#1F5EFF', '#0ea5e9', '#8b5cf6', '#f97316', '#14b8a6', '#ef4444'];

export default function ProductIntelligencePage() {
  const { orderItems, isLoading } = useIntelligenceData();

  const productStats = useMemo(() => {
    if (!orderItems.length) return [];
    const map: Record<string, { qty: number, revenue: number }> = {};
    orderItems.forEach(item => {
      const name = item.menu_name || 'Unknown';
      if (!map[name]) map[name] = { qty: 0, revenue: 0 };
      map[name].qty += Number(item.menu_qty || 0);
      map[name].revenue += Number(item.menu_subtotal || 0);
    });
    return Object.entries(map).map(([name, stat]) => ({
      name,
      qty: stat.qty,
      revenue: stat.revenue
    })).sort((a, b) => b.revenue - a.revenue);
  }, [orderItems]);

  const topProduct = productStats[0] || { name: '-', qty: 0, revenue: 0 };
  const totalItemsSold = productStats.reduce((sum, p) => sum + p.qty, 0);
  const avgItemPrice = totalItemsSold > 0 ? productStats.reduce((sum, p) => sum + p.revenue, 0) / totalItemsSold : 0;

  const kpiCards = [
    { label: 'Total Items Sold', tooltip: 'Jumlah keseluruhan produk yang terjual.', value: totalItemsSold.toLocaleString('id-ID'), icon: ShoppingBag, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Top Selling Product', tooltip: 'Produk yang menghasilkan volume atau pendapatan tertinggi.', value: topProduct.name, icon: Star, color: '#f59e0b', bg: '#fffbeb', trend: 'Trending' },
    { label: 'Avg Item Price', tooltip: 'Harga rata-rata dari seluruh produk yang dibeli.', value: `Rp ${avgItemPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, icon: Tag, color: '#14b8a6', bg: '#f0fdfa', trend: '+2.1%' },
    { label: 'Active Menu Items', tooltip: 'Jumlah varian menu yang aktif dipesan pelanggan.', value: productStats.length.toString(), icon: BarChart3, color: '#8b5cf6', bg: '#f5f3ff', trend: 'Stable' },
  ];

  const columns = [
    { title: '#', dataIndex: 'rank', key: 'rank', width: 60, render: (_: any, __: any, idx: number) => <Text type="secondary">{idx + 1}</Text> },
    { title: 'Product Name', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
    { title: 'Items Sold', dataIndex: 'qty', key: 'qty', align: 'right' as const, render: (val: number) => <Text>{val.toLocaleString('id-ID')}</Text> },
    { title: 'Total Revenue', dataIndex: 'revenue', key: 'revenue', align: 'right' as const, render: (val: number) => <Text strong style={{ color: '#1F5EFF' }}>Rp {val.toLocaleString('id-ID')}</Text> },
  ];

  return (
    <MainLayout title="Product Intelligence" subtitle="Analisis performa produk, penjualan menu, dan pergerakan item">
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
              <Card title={<Space><Text strong>Top 5 Products (by Revenue)</Text><Tooltip title="Peringkat 5 produk yang menghasilkan uang paling banyak."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ height: '100%', borderRadius: 12 }}>
                {productStats.length > 0 ? (
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={productStats.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" tickFormatter={(val) => `${val/1000000}M`} />
                        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                        <RechartsTooltip formatter={(val: any) => `Rp ${val.toLocaleString('id-ID')}`} />
                        <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                          {productStats.slice(0, 5).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title={<Space><Text strong>Top 5 Products (by Volume Sold)</Text><Tooltip title="Peringkat 5 produk yang paling laku secara kuantitas."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ height: '100%', borderRadius: 12 }}>
                {productStats.length > 0 ? (
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[...productStats].sort((a,b) => b.qty - a.qty).slice(0, 5)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                        <RechartsTooltip formatter={(val: any) => `${val.toLocaleString('id-ID')} items`} />
                        <Bar dataKey="qty" fill="#14b8a6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </Card>
            </Col>
          </Row>

          <Card title={<Space><Text strong>Product Leaderboard</Text><Tooltip title="Tabel lengkap seluruh performa produk dari A-Z."><InfoCircleOutlined size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ marginBottom: 24, borderRadius: 12 }}>
            <Table 
              columns={columns} 
              dataSource={productStats} 
              pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} produk` }}
              size="middle"
              rowKey="name"
              scroll={{ x: 600 }}
            />
          </Card>
        </>
      )}
    </MainLayout>
  );
}
