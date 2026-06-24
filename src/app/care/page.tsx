"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useCustomerCareData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useState, useMemo } from "react";
import { Sparkles, ActivitySquare, Search } from 'lucide-react';

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function CarePage() {
  const { complaints, isLoading } = useCustomerCareData();

  const summaryInsight = useMemo(() => {
    if (!complaints || complaints.length === 0) return "Mengumpulkan data keluhan pelanggan...";
    const openCount = complaints.filter((c: any) => c.status === 'open').length;
    const highPriority = complaints.filter((c: any) => c.priority === 'high' && c.status === 'open').length;
    
    let rec = "";
    if (highPriority > 0) {
      rec = `Terdapat ${highPriority} keluhan berprioritas tinggi yang belum terselesaikan. Segera tugaskan tim khusus untuk menanganinya.`;
    } else if (openCount > 0) {
      rec = `Selesaikan ${openCount} tiket yang masih berstatus terbuka untuk menjaga kepuasan pelanggan.`;
    } else {
      rec = "Semua keluhan pelanggan telah tertangani. Pertahankan kualitas pelayanan di setiap cabang.";
    }
    return `Kinerja Customer Care saat ini memantau ${complaints.length} tiket. ${rec}`;
  }, [complaints]);

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
        <>
          <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, color: '#0f172a', marginBottom: 4 }}>Calf Intelligence Summary</Title>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                {summaryInsight}
              </Text>
            </div>
          </div>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ActivitySquare size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Active & Historical Customer Complaints</Title>
                <Tooltip title="Log aduan, keluhan, dan tiket dukungan pelanggan dari berbagai kanal (WhatsApp, Form, dll).">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
            </div>
            <Table 
              columns={columns} 
              dataSource={complaints} 
              pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t) => `Total ${t} tiket` }} 
              size="middle" 
              rowKey="id" 
              scroll={{ x: 1000 }} 
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}
