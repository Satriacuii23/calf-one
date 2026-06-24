"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useRiskAndInsightsData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useState, useMemo } from "react";
import { Sparkles, BrainCircuit, Search } from 'lucide-react';

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function InsightsPage() {
  const { insights, isLoading } = useRiskAndInsightsData();

  const summaryInsight = useMemo(() => {
    if (!insights || insights.length === 0) return "Memproses data intelijen AI...";
    const pendingCount = insights.filter((i: any) => !i.is_implemented).length;
    const totalPotential = insights.reduce((sum: number, i: any) => sum + (Number(i.potential_revenue) || 0), 0);
    
    let rec = "";
    if (pendingCount > 0) {
      rec = `Saat ini terdapat ${pendingCount} rekomendasi AI yang menunggu implementasi. Jika dijalankan seluruhnya, berpotensi menambah penghematan/pendapatan hingga Rp ${totalPotential.toLocaleString('id-ID')}.`;
    } else {
      rec = "Semua saran komputasi AI telah berhasil dieksekusi secara efisien.";
    }
    return `Sistem AI menghasilkan ${insights.length} insight berbasis data operasional. ${rec}`;
  }, [insights]);

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
                  <BrainCircuit size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Generated Insights & Recommendations</Title>
                <Tooltip title="Saran, deteksi anomali, dan rekomendasi optimalisasi yang dihasilkan oleh AI secara otomatis.">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
            </div>
            <Table 
              columns={columns} 
              dataSource={insights} 
              pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t) => `Total ${t} insight` }} 
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
