"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Input } from 'antd';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Search, Sparkles, Map, Store, ShieldCheck, MapPin } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useOperationsData } from '@/hooks/useDashboardModules';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useState, useMemo } from "react";

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function OutletsPage() {
  const { branches, isLoading: isOpsLoading } = useOperationsData();
  const { kitchenTickets, deliveryTracking, isLoading: isIntelLoading } = useIntelligenceData();
  
  const isLoading = isOpsLoading || isIntelLoading;

  const [searchText, setSearchText] = useState("");

  const filteredBranches = useMemo(() => branches.filter((b: any) => {
    return (b.branch_name || '').toLowerCase().includes(searchText.toLowerCase()) || 
           (b.branch_code || '').toLowerCase().includes(searchText.toLowerCase()) ||
           (b.city || '').toLowerCase().includes(searchText.toLowerCase());
  }), [branches, searchText]);

  const outletStats = useMemo(() => {
    const total = branches.length || 0;
    
    const regions: Record<string, number> = {};
    const memberships: Record<string, number> = {};
    const cities = new Set<string>();

    branches.forEach((b: any) => {
      const reg = b.region || 'Unknown';
      const mem = b.membership_type || 'Standard';
      if (b.city) cities.add(b.city);

      regions[reg] = (regions[reg] || 0) + 1;
      memberships[mem] = (memberships[mem] || 0) + 1;
    });

    const regionData = Object.entries(regions).map(([name, value], i) => ({
      name, value, color: ['#1F5EFF', '#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444'][i % 5]
    })).sort((a,b) => b.value - a.value);

    const memData = Object.entries(memberships).map(([name, value], i) => ({
      name, value, color: ['#64748b', '#3b82f6', '#10b981'][i % 3]
    })).sort((a,b) => b.value - a.value);

    return { total, citiesCount: cities.size, regionData, memData, topRegion: regionData[0]?.name || '-' };
  }, [branches]);

  const summaryInsight = useMemo(() => {
    if (!branches.length) return "Mengumpulkan data outlet...";
    return `Terdapat ${outletStats.total} outlet yang beroperasi dan tersebar di ${outletStats.citiesCount} kota berbeda. Konsentrasi outlet terbesar berada di region ${outletStats.topRegion}. Pertumbuhan keanggotaan dan distribusi regional berada dalam status operasional normal. Rekomendasi: Alokasikan anggaran pemasaran lokal untuk melakukan penetrasi pasar pada wilayah di luar region ${outletStats.topRegion}.`;
  }, [branches, outletStats]);

  const kpiCards = [
    { label: 'Total Outlets', tooltip: 'Jumlah total cabang yang terdaftar dalam sistem.', value: outletStats.total, icon: Store, trend: 'Active' },
    { label: 'Regions Covered', tooltip: 'Jumlah wilayah besar jangkauan operasional.', value: outletStats.regionData.length, icon: Map, trend: 'Expanding' },
    { label: 'Cities Present', tooltip: 'Jumlah kota spesifik di mana cabang berada.', value: outletStats.citiesCount, icon: MapPin, trend: 'Growing' },
    { label: 'Primary Region', tooltip: 'Wilayah dengan jumlah cabang terbanyak.', value: outletStats.topRegion, icon: ShieldCheck, trend: 'Dominant' },
  ];

  const columns = [
    { 
      title: 'Branch Details', 
      dataIndex: 'branch_name', 
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
            <Store size={14} color="#64748b" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ color: '#0f172a' }}>{text || 'Unknown'}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>Code: {record.branch_code}</Text>
          </div>
        </Space>
      )
    },
    { 
      title: 'Location', 
      dataIndex: 'city', 
      key: 'city', 
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text strong style={{ fontSize: 13, color: '#334155' }}>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.region}</Text>
        </div>
      )
    },
    { 
      title: 'Membership Type', 
      dataIndex: 'membership_type', 
      key: 'membership', 
      render: (type: string) => {
        const val = type || 'Standard';
        return (
          <div style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: '1px solid #e2e8f0' }}>
            {val.toUpperCase()}
          </div>
        );
      }
    },
    { 
      title: 'Status', 
      key: 'status', 
      align: 'right' as const,
      render: () => (
        <div style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: '1px solid #10b98130' }}>
          OPERATIONAL
        </div>
      )
    }
  ];

  const kitchenColumns = [
    { title: 'Order ID', dataIndex: 'order_id', key: 'id', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Received At', dataIndex: 'ticket_received_at', key: 'recv', render: (d: string) => new Date(d).toLocaleTimeString('id-ID') },
    { title: 'Prep Time (sec)', dataIndex: 'prep_time_seconds', key: 'prep', render: (v: number) => <Text>{v}s</Text> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => <div style={{ background: t === 'completed' ? '#ecfdf5' : '#fffbeb', color: t === 'completed' ? '#10b981' : '#f59e0b', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t.toUpperCase()}</div> }
  ];

  const deliveryColumns = [
    { title: 'Order ID', dataIndex: 'order_id', key: 'id', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Provider', dataIndex: 'provider', key: 'prov' },
    { title: 'Courier', dataIndex: 'courier_name', key: 'cour' },
    { title: 'Delivery Time (sec)', dataIndex: 'delivery_time_seconds', key: 'time', render: (v: number) => <Text>{v}s</Text> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => <div style={{ background: t === 'delivered' ? '#ecfdf5' : '#fffbeb', color: t === 'delivered' ? '#10b981' : '#f59e0b', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t.toUpperCase()}</div> }
  ];

  return (
    <MainLayout title="Outlet Intelligence" subtitle="Direktori lengkap cabang Calf beserta sebaran geografisnya">
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
                      <span style={{ color: '#10b981', fontSize: 12, fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
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
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Map size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Distribution by Region</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {outletStats.regionData.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={outletStats.regionData} 
                          innerRadius={70} 
                          outerRadius={100} 
                          paddingAngle={2} 
                          dataKey="value" 
                          stroke="none"
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toLocaleString('id-ID', { maximumFractionDigits: 0 })}%`}
                          labelLine={false}
                        >
                          {outletStats.regionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val} Outlets`, 'Total']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Store size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Membership Types</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {outletStats.memData.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={outletStats.memData} 
                          innerRadius={0} 
                          outerRadius={100} 
                          dataKey="value" 
                          stroke="#fff"
                          strokeWidth={2}
                          label={({ name }) => name}
                        >
                          {outletStats.memData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val} Outlets`, 'Total']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Store size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Outlet Directory</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
              </Space>
              <Input 
                placeholder="Search branch code, name or city..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#94a3b8" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredBranches} 
              pagination={{ pageSize: 5, showSizeChanger: true }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>


          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Kitchen Operations SLA</Title>
                </div>
                <Table columns={kitchenColumns} dataSource={kitchenTickets} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Fleet & Delivery SLA</Title>
                </div>
                <Table columns={deliveryColumns} dataSource={deliveryTracking} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
          </Row>
        </>
      )}
    </MainLayout>
  );
}
