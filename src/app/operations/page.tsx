"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Card, Typography, Table, Tag, Space, Spin, Tooltip } from 'antd';
import { ActivitySquare, Video, Wifi, PackageMinus, Info, Thermometer } from 'lucide-react';
import { useOperationsData } from '@/hooks/useDashboardModules';

const { Title, Text } = Typography;

export default function OperationsPage() {
  const { infrastructures, inventories, branches, isLoading } = useOperationsData();

  const totalBranches = branches.length;
  const cctvOnline = infrastructures.filter((i: any) => i.cctv_status === 'online').length;
  const internetOnline = infrastructures.filter((i: any) => i.internet_status === 'online').length;
  const lowStockCount = inventories.filter((i: any) => Number(i.current_stock) <= Number(i.minimum_stock)).length;

  const kpiCards = [
    { label: 'Active Branches', tooltip: 'Jumlah total cabang yang sedang aktif beroperasi saat ini.', value: totalBranches, icon: ActivitySquare, color: '#1F5EFF', bg: '#eff6ff', trend: 'Stable' },
    { label: 'CCTV Online', tooltip: 'Rasio kamera pengawas yang terhubung dan aktif.', value: `${cctvOnline} / ${infrastructures.length}`, icon: Video, color: '#14b8a6', bg: '#f0fdfa', trend: 'Stable' },
    { label: 'Internet Online', tooltip: 'Rasio koneksi internet yang stabil di setiap cabang.', value: `${internetOnline} / ${infrastructures.length}`, icon: Wifi, color: '#8b5cf6', bg: '#f5f3ff', trend: 'Stable' },
    { label: 'Low Stock Alerts', tooltip: 'Jumlah item inventaris yang stoknya berada di bawah ambang batas aman.', value: lowStockCount, icon: PackageMinus, color: '#ef4444', bg: '#fef2f2', trend: 'Attention' },
  ];

  const infraColumns = [
    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch' },
    { title: 'CCTV Status', dataIndex: 'cctv_status', key: 'cctv', render: (status: string) => <Tag color={status === 'online' ? 'success' : 'error'}>{status?.toUpperCase()}</Tag> },
    { title: 'Internet Status', dataIndex: 'internet_status', key: 'internet', render: (status: string) => <Tag color={status === 'online' ? 'success' : 'error'}>{status?.toUpperCase()}</Tag> },
    { title: 'Last Checked', dataIndex: 'last_checked', key: 'checked', render: (val: string) => <Text>{val ? new Date(val).toLocaleString() : '-'}</Text> }
  ];

  const invColumns = [
    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch' },
    { title: 'Item Name', dataIndex: 'item_name', key: 'item', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Current Stock', dataIndex: 'current_stock', key: 'current', render: (v: number, record: any) => (
      <Text style={{ color: Number(v) <= Number(record.minimum_stock) ? '#ef4444' : 'inherit' }} strong>
        {v} {record.unit}
      </Text>
    )},
    { title: 'Minimum Stock', dataIndex: 'minimum_stock', key: 'min', render: (v: number, r: any) => <Text>{v} {r.unit}</Text> },
    { title: 'Status', key: 'status', render: (_: any, record: any) => {
      const isLow = Number(record.current_stock) <= Number(record.minimum_stock);
      return <Tag color={isLow ? 'error' : 'success'}>{isLow ? 'LOW STOCK' : 'OK'}</Tag>;
    }}
  ];

  return (
    <MainLayout title="Operations Center" subtitle="Pemantauan infrastruktur dan inventaris operasional cabang">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
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
                        <Info size={14} style={{ color: '#94a3b8', cursor: 'help' }} />
                      </Tooltip>
                    </Space>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <kpi.icon size={16} color={kpi.color} />
                    </div>
                  </div>
                  <Title level={3} style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{kpi.value}</Title>
                  <Text style={{ color: '#64748b', fontSize: 13, fontWeight: 500, display: 'inline-block', marginTop: 8 }}>{kpi.trend}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title={<Space><Text strong>Infrastructure Status</Text><Tooltip title="Tabel real-time kondisi infrastruktur di setiap cabang."><Info size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
                <Table columns={infraColumns} dataSource={infrastructures} pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} records` }} size="middle" rowKey="id" scroll={{ x: 500 }} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title={<Space><Text strong>Critical Inventories</Text><Tooltip title="Tabel stok inventaris yang menipis."><Info size={14} style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
                <Table columns={invColumns} dataSource={inventories} pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} records` }} size="middle" rowKey="id" scroll={{ x: 500 }} />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </MainLayout>
  );
}
