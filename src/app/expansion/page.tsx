"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useExpansionData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function ExpansionPage() {
  const { proposals, isLoading } = useExpansionData();

  const columns = [
    { title: 'Location', dataIndex: 'location_name', key: 'location', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Est. Cost', dataIndex: 'estimated_cost', key: 'cost', align: 'right' as const, render: (v: number) => <Text>Rp {v?.toLocaleString('id-ID')}</Text> },
    { title: 'Projected ROI', dataIndex: 'projected_roi', key: 'roi', align: 'right' as const, render: (v: number) => <Text strong style={{ color: '#22c55e' }}>{v}%</Text> },
    { title: 'Target Open Date', dataIndex: 'target_open_date', key: 'date', render: (d: string) => <Text>{new Date(d).toLocaleDateString()}</Text> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => {
      let color = 'default';
      if (status === 'approved') color = 'success';
      if (status === 'negotiation') color = 'processing';
      if (status === 'survey') color = 'warning';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    }}
  ];

  return (
    <MainLayout title="Expansion Proposals" subtitle="Pelacakan rencana pembukaan cabang baru dan proyeksi investasi">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
      ) : (
        <Card title={<Space><Text strong>New Branch Pipeline</Text><Tooltip title="Pelacakan lokasi calon cabang baru beserta estimasi ROI (Return of Investment)."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
          <Table 
            columns={columns} 
            dataSource={proposals} 
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} proposal` }} 
            size="middle" 
            rowKey="id" 
            scroll={{ x: 800 }} 
          />
        </Card>
      )}
    </MainLayout>
  );
}
