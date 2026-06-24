"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useRiskAndInsightsData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function RiskPage() {
  const { alerts, isLoading } = useRiskAndInsightsData();

  const columns = [
    { title: 'Date', dataIndex: 'created_at', key: 'date', render: (d: string) => <Text>{new Date(d).toLocaleDateString()}</Text> },
    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch', render: (t: string) => <Text strong>{t || 'HQ'}</Text> },
    { title: 'Severity', dataIndex: 'severity', key: 'severity', render: (s: string) => {
      const color = s === 'high' ? 'error' : s === 'medium' ? 'warning' : 'processing';
      return <Tag color={color}>{s.toUpperCase()}</Tag>
    }},
    { title: 'Risk Type', dataIndex: 'risk_type', key: 'type', render: (t: string) => <Tag>{t}</Tag> },
    { title: 'Title', dataIndex: 'title', key: 'title', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Status', key: 'status', render: (_: any, r: any) => (
      <Tag color={r.is_dismissed ? 'default' : 'error'}>{r.is_dismissed ? 'DISMISSED' : 'ACTIVE'}</Tag>
    )}
  ];

  return (
    <MainLayout title="Risk Center" subtitle="Pusat peringatan dini dan manajemen risiko operasional">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
      ) : (
        <Card title={<Space><Text strong>Active & Historical Risk Alerts</Text><Tooltip title="Tabel pencatatan peringatan dini terkait operasional, mesin, atau tren penurunan transaksi."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
          <Table 
            columns={columns} 
            dataSource={alerts} 
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} peringatan` }} 
            size="middle" 
            rowKey="id" 
            scroll={{ x: 800 }} 
          />
        </Card>
      )}
    </MainLayout>
  );
}
