"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Tag, Space, Spin, Tooltip, Progress , Input } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Wallet, TrendingUp, Percent, DollarSign, Calendar, Package, CreditCard, ShoppingBag, Utensils, Truck, Sparkles , Search } from 'lucide-react';
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

export default function RevenueIntelligencePage() {
  const { orders, orderItems, payments, voids, taxes, isLoading } = useIntelligenceData();

  const [searchText, setSearchText] = useState("");
  const filteredOrders = useMemo(() => orders.filter((o: any) => String(o.order_id || "").toLowerCase().includes(searchText.toLowerCase()) || String(o.payment_method || "").toLowerCase().includes(searchText.toLowerCase())), [orders, searchText]);


  const metrics = useMemo(() => {
    if (!orders.length) return { gross: 0, net: 0, discount: 0, aov: 0 };
    const gross = orders.reduce((sum, o) => sum + Number(o.subtotal || 0), 0);
    const net = orders.reduce((sum, o) => sum + Number(o.total_payment || 0), 0);
    const discount = orders.reduce((sum, o) => sum + Number(o.total_discount || 0), 0);
    const aov = net / orders.length;
    return { gross, net, discount, aov };
  }, [orders]);

  // Payment method data
  const paymentData = useMemo(() => {
    const methods: Record<string, number> = {};
    orders.forEach(o => {
      const pm = o.payment_method || 'Unknown';
      methods[pm] = (methods[pm] || 0) + Number(o.total_payment || 0);
    });
    return Object.entries(methods).map(([name, value], i) => ({
      name,
      value,
      fill: COLORS[i % COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [orders]);

  // Order type data
  const orderTypeData = useMemo(() => {
    const types: Record<string, number> = {};
    orders.forEach(o => {
      const type = o.order_type_name || 'Unknown';
      types[type] = (types[type] || 0) + Number(o.total_payment || 0);
    });
    return Object.entries(types).map(([name, value], i) => ({
      name,
      value,
      fill: COLORS[(i + 2) % COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [orders]);

  // Revenue trend data
  const revenueTrendData = useMemo(() => {
    const trend: Record<string, number> = {};
    orders.forEach(o => {
      if (!o.transaction_date) return;
      const date = new Date(o.transaction_date).toISOString().split('T')[0];
      trend[date] = (trend[date] || 0) + Number(o.total_payment || 0);
    });
    return Object.entries(trend).map(([date, revenue]) => ({
      date,
      revenue
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [orders]);

  // Dynamic Summary
  const summaryInsight = useMemo(() => {
    if (!orders.length || !orderItems.length) return "Mengumpulkan data untuk membuat ringkasan...";
    
    // Most popular payment method
    const topPayment = paymentData[0]?.name || '-';
    
    // Highest revenue day
    let highestDay = { date: '-', revenue: 0 };
    revenueTrendData.forEach(d => {
      if (d.revenue > highestDay.revenue) highestDay = d;
    });
    
    const bestDay = highestDay.date !== '-' ? new Date(highestDay.date).toLocaleDateString('id-ID', { weekday: 'long' }) : '-';
    
    return `Berdasarkan data dari ${orders.length} transaksi terakhir, tren transaksi saat ini didominasi oleh pembayaran via ${topPayment}. Pencapaian omzet tertinggi tercatat pada hari ${bestDay}. Rekomendasi: Fokuskan kampanye promosi pada metode ${topPayment} menjelang jam sibuk di hari ${bestDay}.`;
  }, [orders, orderItems, paymentData, revenueTrendData]);

  const kpiCards = [
    { label: 'Net Revenue', tooltip: 'Total pendapatan bersih setelah diskon.', value: `Rp ${(metrics.net / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`, icon: Wallet, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Gross Revenue', tooltip: 'Total pendapatan sebelum potongan.', value: `Rp ${(metrics.gross / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`, icon: TrendingUp, color: '#0ea5e9', bg: '#f0f9ff', trend: '+5.2%' },
    { label: 'Total Discount', tooltip: 'Total nilai diskon yang diberikan.', value: `Rp ${(metrics.discount / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`, icon: Percent, color: '#8b5cf6', bg: '#f5f3ff', trend: '-2.1%' },
    { label: 'Avg Order Value', tooltip: 'Rata-rata nilai per transaksi.', value: `Rp ${(metrics.aov).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, icon: DollarSign, color: '#14b8a6', bg: '#f0fdfa', trend: '+8.1%' },
  ];

  const paymentColumns = [
    { title: 'Payment Channel', dataIndex: 'payment_channel', key: 'channel', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Transaction ID', dataIndex: 'transaction_id', key: 'trx' },
    { title: 'Gross Amount', dataIndex: 'gross_amount', key: 'gross', render: (v: number) => `Rp ${v?.toLocaleString('id-ID') || 0}` },
    { title: 'MDR Fee (%)', dataIndex: 'mdr_fee_percentage', key: 'mdr', render: (v: number) => `${v}%` },
    { title: 'Net Amount', dataIndex: 'net_amount', key: 'net', render: (v: number) => <Text strong style={{color: '#10b981'}}>{`Rp ${v?.toLocaleString('id-ID') || 0}`}</Text> }
  ];

  const voidColumns = [
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t: string) => <div style={{ background: t==='Refund'?'#fef2f2':'#fffbeb', color: t==='Refund'?'#ef4444':'#f59e0b', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t}</div> },
    { title: 'Order ID', dataIndex: ['orders', 'order_id'], key: 'order', render: (t: string) => <Text strong>#{t}</Text> },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'Authorized By', dataIndex: 'authorized_by', key: 'auth' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (v: number) => `Rp ${v?.toLocaleString('id-ID') || 0}` }
  ];

  const taxColumns = [
    { title: 'Order ID', dataIndex: 'order_id', key: 'id', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Subtotal', dataIndex: 'subtotal', key: 'sub', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'PB1 (Tax)', dataIndex: 'tax_amount', key: 'tax', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Service Charge', dataIndex: 'service_charge', key: 'svc', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Total Amount', dataIndex: 'total_amount', key: 'total', align: 'right' as const, render: (v: number) => <Text strong style={{color: '#1F5EFF'}}>{`Rp ${v?.toLocaleString('id-ID')}`}</Text> }
  ];

  const columns = [
    { 
      title: 'Transaction Details', 
      dataIndex: 'order_id', 
      key: 'order_id', 
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text strong style={{ color: '#0f172a' }}>#{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(record.transaction_date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
          </Text>
        </div>
      ) 
    },
    { 
      title: 'Order Type', 
      dataIndex: 'order_type_name', 
      key: 'type',
      render: (type: string) => {
        const isDineIn = type?.toLowerCase().includes('dine');
        const isDelivery = type?.toLowerCase().includes('delivery') || type?.toLowerCase().includes('gojek') || type?.toLowerCase().includes('grab') || type?.toLowerCase().includes('shopee');
        return (
          <Space>
            <div style={{ padding: 6, borderRadius: 6, background: isDineIn ? '#eff6ff' : isDelivery ? '#fef2f2' : '#fffbeb' }}>
              {isDineIn ? <Utensils size={14} color="#475569" /> : isDelivery ? <Truck size={14} color="#475569" /> : <ShoppingBag size={14} color="#475569" />}
            </div>
            <Text strong style={{ color: '#334155' }}>{type || 'Unknown'}</Text>
          </Space>
        );
      }
    },
    { 
      title: 'Payment Info', 
      dataIndex: 'payment_method', 
      key: 'payment',
      render: (payment: string, record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text strong style={{ color: '#334155' }}>{payment || '-'}</Text>
          <Text type="secondary" style={{ fontSize: 12, color: record.payment_status?.toLowerCase() === 'paid' ? '#10b981' : '#f59e0b' }}>
            {record.payment_status?.toUpperCase() || 'UNPAID'}
          </Text>
        </div>
      )
    },
    { 
      title: 'Amount Breakdown', 
      dataIndex: 'total_payment', 
      key: 'amount', 
      align: 'right' as const, 
      render: (val: number, record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 14, color: '#0f172a' }}>Rp {val?.toLocaleString('id-ID') || 0}</Text>
          {Number(record.total_discount) > 0 && (
            <Text type="secondary" style={{ fontSize: 12, color: '#ef4444' }}>
              - Rp {Number(record.total_discount).toLocaleString('id-ID')} (Discount)
            </Text>
          )}
        </div>
      ) 
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      align: 'center' as const,
      render: (status: string) => {
        const st = status?.toLowerCase();
        let bg = '#f1f5f9';
        let textColor = '#64748b';
        if (st === 'completed') { bg = '#ecfdf5'; textColor = '#10b981'; }
        else if (st === 'cancelled') { bg = '#fef2f2'; textColor = '#ef4444'; }
        else { bg = '#eff6ff'; textColor = '#1F5EFF'; }
        return (
          <div style={{ background: bg, color: textColor, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${textColor}30` }}>
            {status?.toUpperCase() || '-'}
          </div>
        );
      }
    },
  ];

  return (
    <MainLayout title="Revenue Intelligence" subtitle="Analisis pendapatan, metode pembayaran, dan riwayat transaksi">
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
                    <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>{kpi.value}</Title>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: kpi.trend.startsWith('+') ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 700, background: kpi.trend.startsWith('+') ? '#ecfdf5' : '#fef2f2', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
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

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ marginBottom: 20 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} />
                </div>
                <Title level={4} style={{ margin: 0 }}>Revenue Trend Over Time</Title>
                <Tooltip title="Grafik area yang menampilkan fluktuasi total pendapatan harian selama periode transaksi terakhir.">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
            </div>
            <div style={{ height: 300, width: '100%' }}>
              {revenueTrendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueTrendData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F5EFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1F5EFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `Rp ${(val / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`} dx={-10} />
                    <RechartsTooltip 
                      formatter={(val: any) => [`Rp ${val.toLocaleString('id-ID')}`, 'Revenue']}
                      labelStyle={{ color: '#0f172a', fontWeight: 600, marginBottom: 8 }}
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="revenue" fill="#bfdbfe" radius={[4, 4, 0, 0]} barSize={32} />
                    <Line type="monotone" dataKey="revenue" stroke="#1F5EFF" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>Belum ada data transaksi</div>
              )}
            </div>
          </SectionContainer>

          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CreditCard size={18} />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Payment Method</Title>
                    <Tooltip title="Distribusi pendapatan berdasarkan metode pembayaran (Tunai, Debit, QRIS, dll).">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                <div style={{ height: 280, width: '100%', marginTop: 24 }}>
                  {paymentData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Pie
                          data={paymentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {paymentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`Rp ${val.toLocaleString('id-ID')}`, 'Revenue']}
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>Belum ada data pembayaran</div>
                  )}
                </div>
              </SectionContainer>
            </Col>
            
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingBag size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Order Type</Title>
                    <Tooltip title="Pendapatan berdasarkan tipe pesanan (Dine-in, Takeaway, dan Delivery).">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                <div style={{ height: 280, width: '100%', marginTop: 24 }}>
                  {orderTypeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Pie
                          data={orderTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toLocaleString('id-ID', { maximumFractionDigits: 0 })}%`}
                          labelLine={false}
                        >
                          {orderTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`Rp ${val.toLocaleString('id-ID')}`, 'Revenue']}
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>Belum ada data tipe pesanan</div>
                  )}
                </div>
              </SectionContainer>
            </Col>


          </Row>

          <SectionContainer>
            <div style={{ marginBottom: 20 }}>
              <Space align="center">
                <Title level={4} style={{ margin: 0 }}>Recent Transactions</Title>
                <Tooltip title="Daftar transaksi terakhir, menampilkan 10 data per halaman.">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredOrders} 
              pagination={{ pageSize: 10, showSizeChanger: false, showTotal: (t) => `Total ${t} transaksi` }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>

          <Row gutter={[24, 24]} style={{ marginBottom: 24, marginTop: 24 }}>
            <Col xs={24} lg={14}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Payments & Settlement Ledger</Title>
                </div>
                <Table columns={paymentColumns} dataSource={payments} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={10}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Voids & Refunds (Leakage)</Title>
                </div>
                <Table columns={voidColumns} dataSource={voids} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} />
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
              <Title level={4} style={{ margin: 0 }}>Taxes & Service Charge Compliance</Title>
            </div>
            <Table columns={taxColumns} dataSource={taxes} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}

