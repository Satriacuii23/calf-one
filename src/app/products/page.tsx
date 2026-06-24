"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Progress , Input } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Star, Tag, BarChart3, Sparkles , Search, AlertTriangle, PackageMinus } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useOperationsData } from '@/hooks/useDashboardModules';
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
  const { orderItems, recipes, isLoading: intelLoading } = useIntelligenceData();
  const { inventories, purchaseOrders, suppliers, stockAdjustments, isLoading: opsLoading } = useOperationsData();
  const isLoading = intelLoading || opsLoading;

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

  const lowStockItems = useMemo(() => {
    return inventories.filter((i: any) => Number(i.current_stock) <= Number(i.minimum_stock));
  }, [inventories]);

  const topLowStock = useMemo(() => {
    return [...lowStockItems]
      .sort((a: any, b: any) => Number(a.current_stock) - Number(b.current_stock))
      .slice(0, 5)
      .map((i: any) => ({
        name: i.item_name?.substring(0, 15),
        fullName: i.item_name,
        stock: Number(i.current_stock),
        min: Number(i.minimum_stock)
      }));
  }, [lowStockItems]);

  // Dynamic Summary
  const summaryInsight = useMemo(() => {
    if (!orderItems.length || !inventories.length) return "Mengumpulkan data untuk membuat ringkasan...";
    
    return `Performa produk menunjukkan bahwa ${topProduct.name} adalah penyumbang pendapatan tertinggi, sementara ${topProductByVol.name} merupakan produk yang paling laku secara kuantitas. Total keseluruhan item yang terjual mencapai ${totalItemsSold.toLocaleString('id-ID')} unit dengan rata-rata harga per item Rp ${avgItemPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}. Terdapat peringatan untuk ${lowStockItems.length} item inventaris yang stoknya menipis. Rekomendasi: Segera jadwalkan pengiriman stok (*restock*) untuk ${lowStockItems.length} barang tersebut dan pertimbangkan strategi *bundling* untuk produk unggulan ${topProduct.name}.`;
  }, [orderItems, inventories, topProduct, topProductByVol, totalItemsSold, avgItemPrice, lowStockItems.length]);

  const kpiCards = [
    { label: 'Total Items Sold', tooltip: 'Jumlah keseluruhan produk yang terjual.', value: totalItemsSold.toLocaleString('id-ID'), icon: ShoppingBag, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Top Selling Product', tooltip: 'Produk yang menghasilkan pendapatan tertinggi.', value: topProduct.name, icon: Star, color: '#f59e0b', bg: '#fffbeb', trend: 'Trending' },
    { label: 'Avg Item Price', tooltip: 'Harga rata-rata dari seluruh produk yang dibeli.', value: `Rp ${avgItemPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, icon: Tag, color: '#14b8a6', bg: '#f0fdfa', trend: '+2.1%' },
    { label: 'Low Stock Alerts', tooltip: 'Jumlah item inventaris yang stoknya berada di bawah ambang batas aman.', value: lowStockItems.length, icon: PackageMinus, color: '#ef4444', bg: '#fef2f2', trend: 'Action Required' },
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

  const poColumns = [
    { title: 'PO Number', dataIndex: 'po_number', key: 'po', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Supplier', dataIndex: 'supplier_name', key: 'sup' },
    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => {
        const color = t === 'Received' ? '#10b981' : t === 'Pending' ? '#f59e0b' : '#ef4444';
        const bg = t === 'Received' ? '#ecfdf5' : t === 'Pending' ? '#fffbeb' : '#fef2f2';
        return <div style={{ background: bg, color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t}</div>;
      }
    },
    { title: 'Total Cost', dataIndex: 'total_cost', key: 'cost', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Est. Delivery', dataIndex: 'expected_delivery', key: 'deliv', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  const supplierColumns = [
    { title: 'Supplier Name', dataIndex: 'supplier_name', key: 'sup', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Category', dataIndex: 'category', key: 'cat' },
    { title: 'Avg Lead Time', dataIndex: 'avg_lead_time_days', key: 'lead', render: (v: number) => `${v} Days` },
    { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (v: number) => <Text strong style={{ color: '#f59e0b' }}>★ {v}</Text> }
  ];

  const adjustmentColumns = [
    { title: 'Item', dataIndex: ['inventories', 'item_name'], key: 'item', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Adjustment Qty', dataIndex: 'adjustment_qty', key: 'qty', render: (v: number) => <Text type="danger">{v}</Text> },
    { title: 'Reason', dataIndex: 'reason', key: 'reason', render: (t: string) => <Text style={{ textTransform: 'capitalize' }}>{t?.replace('_', ' ')}</Text> },
    { title: 'Date', dataIndex: 'created_at', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
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

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={16}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertTriangle size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Critical Low Stock Items</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {topLowStock.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topLowStock} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis type="category" dataKey="name" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} width={100} />
                        <RechartsTooltip 
                          formatter={(val: any, name: any) => [val, name === 'stock' ? 'Current Stock' : 'Min Threshold']}
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                        <Bar dataKey="stock" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={16} name="Current Stock" />
                        <Bar dataKey="min" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={16} name="Min Threshold" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">All stock levels are healthy.</Text>
                  </div>
                )}
              </SectionContainer>
            </Col>
            <Col xs={24} lg={8}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Inventory: Stock Adjustments</Title>
                </div>
                <Table columns={adjustmentColumns} dataSource={stockAdjustments} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 300 }} />
              </SectionContainer>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Supply Chain: Purchase Orders</Title>
                </div>
                <Table columns={poColumns} dataSource={purchaseOrders} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Logistics: Supplier Performance</Title>
                </div>
                <Table columns={supplierColumns} dataSource={suppliers} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
          </Row>
        </>
      )}
    </MainLayout>
  );
}
