"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Progress , Input } from 'antd';
import { ShoppingBag, Star, Tag, BarChart3, Sparkles , Search } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useState, useMemo } from "react";

const { Title, Text } = Typography;

const COLORS = ['#1F5EFF', '#0ea5e9', '#8b5cf6', '#f97316', '#14b8a6', '#ef4444'];

// Custom Container Component
const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function ProductIntelligencePage() {
  const { orderItems, recipes, isLoading } = useIntelligenceData();

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
  const topProductByVol = [...productStats].sort((a,b) => b.qty - a.qty)[0] || { name: '-', qty: 0, revenue: 0 };
  const totalItemsSold = productStats.reduce((sum, p) => sum + p.qty, 0);
  const avgItemPrice = totalItemsSold > 0 ? productStats.reduce((sum, p) => sum + p.revenue, 0) / totalItemsSold : 0;

  const [searchText, setSearchText] = useState("");
  const filteredStats = useMemo(() => productStats.filter((p: any) => p.name.toLowerCase().includes(searchText.toLowerCase())), [productStats, searchText]);


  // Dynamic Summary
  const summaryInsight = useMemo(() => {
    if (!orderItems.length) return "Mengumpulkan data untuk membuat ringkasan...";
    
    return `Performa produk menunjukkan bahwa ${topProduct.name} adalah penyumbang pendapatan tertinggi, sementara ${topProductByVol.name} merupakan produk yang paling laku secara kuantitas. Total keseluruhan item yang terjual mencapai ${totalItemsSold.toLocaleString('id-ID')} unit dengan rata-rata harga per item Rp ${avgItemPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}. Rekomendasi: Pertimbangkan strategi *bundling* untuk produk unggulan ${topProduct.name} bersama item dengan pergerakan lambat guna mendongkrak kuantitas transaksi.`;
  }, [orderItems, topProduct, topProductByVol, totalItemsSold, avgItemPrice]);

  const kpiCards = [
    { label: 'Total Items Sold', tooltip: 'Jumlah keseluruhan produk yang terjual.', value: totalItemsSold.toLocaleString('id-ID'), icon: ShoppingBag, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Top Selling Product', tooltip: 'Produk yang menghasilkan pendapatan tertinggi.', value: topProduct.name, icon: Star, color: '#f59e0b', bg: '#fffbeb', trend: 'Trending' },
    { label: 'Avg Item Price', tooltip: 'Harga rata-rata dari seluruh produk yang dibeli.', value: `Rp ${avgItemPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, icon: Tag, color: '#14b8a6', bg: '#f0fdfa', trend: '+2.1%' },
    { label: 'Active Menu Items', tooltip: 'Jumlah varian menu yang aktif dipesan pelanggan.', value: productStats.length.toString(), icon: BarChart3, color: '#8b5cf6', bg: '#f5f3ff', trend: 'Stable' },
  ];

  const columns = [
    { 
      title: 'Product Details', 
      dataIndex: 'name', 
      key: 'name', 
      render: (text: string, record: any, idx: number) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
            <Text type="secondary" strong style={{ fontSize: 12 }}>#{idx + 1}</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ color: '#0f172a' }}>{text}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>Menu Item</Text>
          </div>
        </Space>
      ) 
    },
    { 
      title: 'Performance', 
      key: 'performance',
      render: (_: any, record: any) => {
        const maxRev = productStats[0]?.revenue || 1;
        const percent = Math.round((record.revenue / maxRev) * 100);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', width: 120 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>Rev. Score</Text>
              <Text strong style={{ fontSize: 12, color: percent > 80 ? '#10b981' : percent > 50 ? '#f59e0b' : '#64748b' }}>{percent}%</Text>
            </div>
            <Progress percent={percent} showInfo={false} size="small" strokeColor={percent > 80 ? '#10b981' : percent > 50 ? '#f59e0b' : '#94a3b8'} railColor="#f1f5f9" />
          </div>
        );
      }
    },
    { 
      title: 'Volume Sold', 
      dataIndex: 'qty', 
      key: 'qty', 
      align: 'right' as const, 
      render: (val: number) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 14, color: '#334155' }}>{val.toLocaleString('id-ID')}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Units</Text>
        </div>
      ) 
    },
    { 
      title: 'Total Revenue', 
      dataIndex: 'revenue', 
      key: 'revenue', 
      align: 'right' as const, 
      render: (val: number) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 14, color: '#1F5EFF' }}>Rp {val.toLocaleString('id-ID')}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Gross</Text>
        </div>
      ) 
    },
  ];

  const recipeColumns = [
    { title: 'Menu Name', dataIndex: 'menu_name', key: 'menu', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Raw Material (Inventory)', dataIndex: ['inventories', 'item_name'], key: 'inv' },
    { title: 'Requirement', dataIndex: 'qty_required', key: 'qty', align: 'right' as const, render: (v: number, r: any) => <Text strong style={{ color: '#0ea5e9' }}>{v} {r.uom}</Text> }
  ];

  return (
    <MainLayout title="Product Intelligence" subtitle="Analisis performa produk, penjualan menu, dan pergerakan item">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 32, padding: '8px 0 24px 0', borderBottom: '1px solid #f1f5f9' }}>
            <Row gutter={[24, 24]}>
              {kpiCards.map((kpi) => (
                <Col xs={24} sm={12} lg={6} key={kpi.label}>
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
                    <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={kpi.value}>{kpi.value}</Title>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: kpi.trend.startsWith('+') || kpi.trend === 'Trending' || kpi.trend === 'Stable' ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 700, background: kpi.trend.startsWith('+') || kpi.trend === 'Trending' || kpi.trend === 'Stable' ? '#ecfdf5' : '#fef2f2', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>vs last month</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Smart Summary */}
          <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, color: '#0f172a', marginBottom: 4 }}>Calf Intelligence Summary</Title>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                {summaryInsight}
              </Text>
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Top 5 Products (by Revenue)</Title>
                    <Tooltip title="Peringkat 5 produk yang menghasilkan uang paling banyak.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {productStats.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
                    {productStats.slice(0, 5).map((item, idx) => {
                      const maxVal = productStats[0].revenue;
                      const percent = (item.revenue / maxVal) * 100;
                      return (
                        <div key={item.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text strong style={{ color: '#334155', fontSize: 13 }}>{idx + 1}. {item.name}</Text>
                            <Text strong style={{ color: '#0f172a', fontSize: 13 }}>Rp {item.revenue.toLocaleString('id-ID')}</Text>
                          </div>
                          <Progress percent={percent} showInfo={false} strokeColor={COLORS[idx % COLORS.length]} railColor="#f1f5f9" size="small" />
                        </div>
                      );
                    })}
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingBag size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Top 5 Products (by Volume)</Title>
                    <Tooltip title="Peringkat 5 produk yang paling laku secara kuantitas.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {productStats.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
                    {[...productStats].sort((a,b) => b.qty - a.qty).slice(0, 5).map((item, idx, arr) => {
                      const maxVal = arr[0].qty;
                      const percent = (item.qty / maxVal) * 100;
                      return (
                        <div key={item.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text strong style={{ color: '#334155', fontSize: 13 }}>{idx + 1}. {item.name}</Text>
                            <Text strong style={{ color: '#0f172a', fontSize: 13 }}>{item.qty.toLocaleString('id-ID')} items</Text>
                          </div>
                          <Progress percent={percent} showInfo={false} strokeColor="#14b8a6" railColor="#ccfbf1" size="small" />
                        </div>
                      );
                    })}
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart3 size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Product Leaderboard</Title>
                <Tooltip title="Tabel lengkap seluruh performa produk dari A-Z.">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Input 
                placeholder="Search product name..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#94a3b8" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredStats} 
              pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} produk` }}
              size="middle"
              rowKey="name"
              scroll={{ x: 600 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
              <Title level={4} style={{ margin: 0 }}>Bill of Materials (BOM) & Recipes</Title>
            </div>
            <Table columns={recipeColumns} dataSource={recipes} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}
