"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useCustomerCareData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function CarePage() {
  const { complaints, isLoading } = useCustomerCareData();

  const columns = [
    { title: 'Date', dataIndex: 'created_at', key: 'date', width: 120, render: (d: string) => <Text>{new Date(d).toLocaleDateString()}</Text> },
    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch', render: (t: string) => <Text strong>{t || 'HQ'}</Text> },
    { title: 'Customer', dataIndex: ['members', 'member_name'], key: 'member' },
    { title: 'Issue Type', dataIndex: 'issue_type', key: 'type', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (s: string) => {
      const color = s === 'high' ? 'error' : s === 'medium' ? 'warning' : 'processing';
      return <Tag color={color}>{s.toUpperCase()}</Tag>
    }},
    { title: 'Description', dataIndex: 'description', key: 'desc' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => (
      <Tag color={status === 'open' ? 'error' : 'success'}>{status.toUpperCase()}</Tag>
    )}
  ];

  return (
    <MainLayout title="Customer Care" subtitle="Manajemen tiket keluhan pelanggan dan resolusi masalah">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
      ) : (
        <Card title={<Space><Text strong>Active & Historical Customer Complaints</Text><Tooltip title="Log aduan, keluhan, dan tiket dukungan pelanggan dari berbagai kanal (WhatsApp, Form, dll)."><InfoCircleOutlined style={{ color: '#94a3b8' }} /></Tooltip></Space>} style={{ borderRadius: 12 }}>
          <Table 
            columns={columns} 
            dataSource={complaints} 
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `Total ${t} tiket` }} 
            size="middle" 
            rowKey="id" 
            scroll={{ x: 1000 }} 
          />
        </Card>
      )}
    </MainLayout>
  );
}
