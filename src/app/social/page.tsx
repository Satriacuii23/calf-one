"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useSocialData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function SocialPage() {
  const { sentiments, isLoading } = useSocialData();

  const columns = [
    { title: 'Date', dataIndex: 'post_date', key: 'date', width: 120, render: (d: string) => <Text>{new Date(d).toLocaleDateString()}</Text> },
    { title: 'Platform', dataIndex: 'platform', key: 'platform', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Sentiment', dataIndex: 'sentiment', key: 'sentiment', render: (s: string) => {
      const color = s === 'positive' ? 'success' : s === 'negative' ? 'error' : 'default';
      return <Tag color={color}>{s.toUpperCase()}</Tag>;
    }},
    { title: 'Comment / Post', dataIndex: 'comment', key: 'comment' }
  ];

  return (
    <MainLayout title="Social Intelligence" subtitle="Pemantauan sentimen media sosial dan ulasan pelanggan">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
      ) : (
        <Card title={<Space><Text strong>Social Media Mentions & Reviews</Text><Tooltip title="Pemantauan opini, komentar, dan tingkat kepuasan pelanggan di seluruh platform (Google, Instagram, dll)."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
          <Table 
            columns={columns} 
            dataSource={sentiments} 
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} interaksi` }} 
            size="middle" 
            rowKey="id" 
            scroll={{ x: 800 }} 
          />
        </Card>
      )}
    </MainLayout>
  );
}
