"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useRiskAndInsightsData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function InsightsPage() {
  const { insights, isLoading } = useRiskAndInsightsData();

  const columns = [
    { title: 'Date', dataIndex: 'created_at', key: 'date', width: 120, render: (d: string) => <Text>{new Date(d).toLocaleDateString()}</Text> },
    { title: 'Category', dataIndex: 'insight_category', key: 'category', render: (t: string) => <Tag color="blue">{t}</Tag> },
    { title: 'Title', dataIndex: 'title', key: 'title', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Confidence', dataIndex: 'confidence', key: 'confidence', render: (v: number) => (
      <Text style={{ color: v >= 80 ? '#22c55e' : v >= 60 ? '#f59e0b' : '#ef4444' }} strong>{v}%</Text>
    )},
    { title: 'Expected Impact', dataIndex: 'expected_impact', key: 'impact' },
    { title: 'Potential Revenue', dataIndex: 'potential_revenue', key: 'revenue', align: 'right' as const, render: (v: number) => <Text strong>Rp {v?.toLocaleString('id-ID')}</Text> },
    { title: 'Status', key: 'status', render: (_: any, r: any) => (
      <Tag color={r.is_implemented ? 'success' : 'default'}>{r.is_implemented ? 'IMPLEMENTED' : 'PENDING'}</Tag>
    )}
  ];

  return (
    <MainLayout title="AI Insights" subtitle="Rekomendasi cerdas berbasis kecerdasan buatan dari CALF AI">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
      ) : (
        <Card title={<Space><Text strong>Generated Insights & Recommendations</Text><Tooltip title="Saran, deteksi anomali, dan rekomendasi optimalisasi yang dihasilkan oleh AI secara otomatis."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
          <Table 
            columns={columns} 
            dataSource={insights} 
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} insight` }} 
            size="middle" 
            rowKey="id" 
            scroll={{ x: 1000 }} 
          />
        </Card>
      )}
    </MainLayout>
  );
}
