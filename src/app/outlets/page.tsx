"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Tooltip, Space } from 'antd';
import { useOperationsData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function OutletsPage() {
  const { branches, isLoading } = useOperationsData();

  const columns = [
    { title: 'Code', dataIndex: 'branch_code', key: 'code', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Branch Name', dataIndex: 'branch_name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Region', dataIndex: 'region', key: 'region' },
    { 
      title: (
        <Space size={4}>
          Membership
          <Tooltip title="Tingkat keanggotaan atau klasifikasi outlet">
            <InfoCircleOutlined style={{ color: '#94a3b8' }} />
          </Tooltip>
        </Space>
      ), 
      dataIndex: 'membership_type', 
      key: 'membership' 
    },
    { title: 'Status', key: 'status', render: (_: any, r: any) => {
      if (r.is_temporary_closed) return <Tag color="warning">TEMP CLOSED</Tag>;
      return <Tag color={r.is_active ? 'success' : 'error'}>{r.is_active ? 'ACTIVE' : 'INACTIVE'}</Tag>;
    }},
    { title: 'Store Status', dataIndex: 'is_open', key: 'open', render: (open: boolean) => (
      <Tag color={open ? 'processing' : 'default'}>{open ? 'OPEN NOW' : 'CLOSED'}</Tag>
    )}
  ];

  return (
    <MainLayout title="Outlet Intelligence" subtitle="Direktori dan ringkasan performa cabang Kopi Calf">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>
      ) : (
        <Card title="All Branches Directory">
          <Table 
            columns={columns} 
            dataSource={branches} 
            pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (total) => `Total ${total} outlets` }} 
            size="middle" 
            rowKey="id" 
            scroll={{ x: 800 }} 
          />
        </Card>
      )}
    </MainLayout>
  );
}
