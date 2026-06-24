"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Progress, Input } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ActivitySquare, Video, Wifi, PackageMinus, Info, Search, Sparkles, Building2, Server, ServerCrash, AlertTriangle } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useOperationsData } from '@/hooks/useDashboardModules';
import { useState, useMemo } from "react";

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function OperationsPage() {
  const { infrastructures, inventories, branches, purchaseOrders, shifts, attendances, suppliers, stockAdjustments, isLoading } = useOperationsData();

  const [searchText, setSearchText] = useState("");

  const filteredInfra = useMemo(() => infrastructures.filter((i: any) => {
    const branchName = i.branches?.branch_name || '';
    return branchName.toLowerCase().includes(searchText.toLowerCase());
  }), [infrastructures, searchText]);

  const opsStats = useMemo(() => {
    const totalBranches = branches.length || 0;
    const cctvOnline = infrastructures.filter((i: any) => i.cctv_status === 'online').length;
    const internetOnline = infrastructures.filter((i: any) => i.internet_status === 'online').length;
    const lowStockItems = inventories.filter((i: any) => Number(i.current_stock) <= Number(i.minimum_stock));
    
    // Status distribution
    const cctvDist = [
      { name: 'Online', value: cctvOnline, color: '#10b981' },
      { name: 'Offline/Warning', value: infrastructures.length - cctvOnline, color: '#ef4444' }
    ];

    const topLowStock = [...lowStockItems]
      .sort((a: any, b: any) => Number(a.current_stock) - Number(b.current_stock))
      .slice(0, 5)
      .map((i: any) => ({
        name: i.item_name?.substring(0, 15),
        fullName: i.item_name,
        stock: Number(i.current_stock),
        min: Number(i.minimum_stock)
      }));

    return { totalBranches, cctvOnline, internetOnline, lowStockCount: lowStockItems.length, cctvDist, topLowStock };
  }, [infrastructures, inventories, branches]);

  const summaryInsight = useMemo(() => {
    if (!infrastructures.length) return "Mengumpulkan data operasional...";
    const infraHealth = infrastructures.length > 0 ? ((opsStats.cctvOnline / infrastructures.length) * 100).toLocaleString('id-ID', { maximumFractionDigits: 0 }) : 0;
    return `Sistem memantau operasional di ${opsStats.totalBranches} cabang aktif. Saat ini, kesehatan infrastruktur (CCTV) berada di tingkat ${infraHealth}%. Terdapat peringatan untuk ${opsStats.lowStockCount} item inventaris yang stoknya menipis. Rekomendasi: Segera jadwalkan pengiriman stok (*restock*) untuk ${opsStats.lowStockCount} barang tersebut dan kirimkan teknisi pemeliharaan ke cabang dengan gangguan infrastruktur.`;
  }, [infrastructures, opsStats]);

  const kpiCards = [
    { label: 'Active Branches', tooltip: 'Jumlah total cabang yang sedang aktif beroperasi saat ini.', value: opsStats.totalBranches, icon: ActivitySquare, trend: 'Stable' },
    { label: 'CCTV Online', tooltip: 'Rasio kamera pengawas yang terhubung dan aktif.', value: `${opsStats.cctvOnline} / ${infrastructures.length}`, icon: Video, trend: 'Monitor' },
    { label: 'Internet Online', tooltip: 'Rasio koneksi internet yang stabil di setiap cabang.', value: `${opsStats.internetOnline} / ${infrastructures.length}`, icon: Wifi, trend: 'Monitor' },
    { label: 'Low Stock Alerts', tooltip: 'Jumlah item inventaris yang stoknya berada di bawah ambang batas aman.', value: opsStats.lowStockCount, icon: PackageMinus, trend: 'Action Required' },
  ];

  const columns = [
    { 
      title: 'Branch Details', 
      dataIndex: ['branches', 'branch_name'], 
      key: 'branch',
      render: (text: string) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
            <Building2 size={14} color="#64748b" />
          </div>
          <Text strong style={{ color: '#0f172a' }}>{text || 'Unknown'}</Text>
        </Space>
      )
    },
    { 
      title: 'CCTV Status', 
      dataIndex: 'cctv_status', 
      key: 'cctv', 
      render: (status: string) => {
        const isOnline = status === 'online';
        const color = isOnline ? '#10b981' : '#ef4444';
        return (
          <div style={{ background: `${color}15`, color: color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${color}30` }}>
            {status ? status.toUpperCase() : 'UNKNOWN'}
          </div>
        );
      }
    },
    { 
      title: 'Internet Status', 
      dataIndex: 'internet_status', 
      key: 'internet', 
      render: (status: string) => {
        const isOnline = status === 'online';
        const color = isOnline ? '#10b981' : '#ef4444';
        return (
          <div style={{ background: `${color}15`, color: color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${color}30` }}>
            {status ? status.toUpperCase() : 'UNKNOWN'}
          </div>
        );
      }
    },
    { 
      title: 'Last Checked', 
      dataIndex: 'last_checked', 
      key: 'checked', 
      align: 'right' as const,
      render: (val: string) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 13, color: '#334155' }}>{val ? new Date(val).toLocaleDateString('id-ID') : '-'}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{val ? new Date(val).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}</Text>
        </div>
      )
    }
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

  const shiftColumns = [
    { title: 'Cashier Name', dataIndex: 'cashier_name', key: 'cashier', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Start Time', dataIndex: 'shift_start', key: 'start', render: (d: string) => new Date(d).toLocaleString('id-ID') },
    { title: 'Expected Cash', dataIndex: 'expected_cash', key: 'expected', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Actual Cash', dataIndex: 'actual_cash', key: 'actual', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Variance', dataIndex: 'cash_variance', key: 'var', align: 'right' as const, render: (v: number) => <Text type={v < 0 ? 'danger' : 'success'}>{v === 0 ? '-' : `Rp ${v?.toLocaleString('id-ID')}`}</Text> }
  ];

  const attendanceColumns = [
    { title: 'Employee', dataIndex: 'employee_name', key: 'emp', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Clock In', dataIndex: 'clock_in', key: 'in', render: (d: string) => new Date(d).toLocaleString('id-ID') },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => <div style={{ background: t === 'present' ? '#ecfdf5' : '#fef2f2', color: t === 'present' ? '#10b981' : '#ef4444', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t.toUpperCase()}</div> }
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
    <MainLayout title="Operations Center" subtitle="Pemantauan kesehatan infrastruktur dan logistik cabang">
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
                    <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(kpi.value)}>{kpi.value}</Title>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: kpi.trend === 'Action Required' ? '#ef4444' : '#10b981', fontSize: 12, fontWeight: 700, background: kpi.trend === 'Action Required' ? '#fef2f2' : '#ecfdf5', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>status</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, color: '#0f172a', marginBottom: 4 }}>Calf Intelligence Summary</Title>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                {summaryInsight}
              </Text>
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={8}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Server size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>CCTV Health Status</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {opsStats.cctvDist.length > 0 ? (
                  <div style={{ height: 260, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={opsStats.cctvDist} 
                          innerRadius={60} 
                          outerRadius={90} 
                          paddingAngle={5} 
                          dataKey="value" 
                          stroke="none"
                        >
                          {opsStats.cctvDist.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val} Units`, 'Count']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                      {opsStats.cctvDist.map(s => (
                        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.color }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>{s.name} ({s.value})</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
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
                {opsStats.topLowStock.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={opsStats.topLowStock} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
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
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ServerCrash size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Infrastructure Directory</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
              </Space>
              <Input 
                placeholder="Search branch name..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#94a3b8" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredInfra} 
              pagination={{ pageSize: 15, showSizeChanger: true }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
              <Title level={4} style={{ margin: 0 }}>Supply Chain: Purchase Orders</Title>
            </div>
            <Table columns={poColumns} dataSource={purchaseOrders} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
          </SectionContainer>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>HR: Staff Attendances</Title>
                </div>
                <Table columns={attendanceColumns} dataSource={attendances} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>HR: Cashier Shifts & Variance</Title>
                </div>
                <Table columns={shiftColumns} dataSource={shifts} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Logistics: Supplier Performance</Title>
                </div>
                <Table columns={supplierColumns} dataSource={suppliers} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Inventory: Stock Adjustments & Wastage</Title>
                </div>
                <Table columns={adjustmentColumns} dataSource={stockAdjustments} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
          </Row>
        </>
      )}
    </MainLayout>
  );
}
