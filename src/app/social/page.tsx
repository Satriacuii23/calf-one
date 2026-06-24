"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Table, Tag, Spin, Space, Tooltip } from 'antd';
import { useSocialData } from '@/hooks/useDashboardModules';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useState, useMemo } from "react";
import { Sparkles, Users, Search } from 'lucide-react';

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function SocialPage() {
  const { sentiments, isLoading } = useSocialData();

  const summaryInsight = useMemo(() => {
    if (!sentiments || sentiments.length === 0) return "Mengumpulkan data sentimen media sosial...";
    const positiveCount = sentiments.filter((s: any) => s.sentiment === 'positive').length;
    const negativeCount = sentiments.filter((s: any) => s.sentiment === 'negative').length;
    const total = sentiments.length;
    const positiveRate = ((positiveCount / total) * 100).toFixed(0);
    
    let rec = "";
    if (negativeCount > positiveCount) {
      rec = "Terdapat lonjakan sentimen negatif. Segera kordinasi dengan tim operasional untuk memitigasi keluhan.";
    } else {
      rec = "Kinerja sosial brand cukup baik. Fokuskan promosi pada sentimen positif yang sering dibahas pelanggan.";
    }
    return `Dari total ${total} interaksi sosial terbaru, ${positiveRate}% bersentimen positif. ${rec}`;
  }, [sentiments]);

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
                  <Users size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Social Media Mentions & Reviews</Title>
                <Tooltip title="Pemantauan opini, komentar, dan tingkat kepuasan pelanggan di seluruh platform (Google, Instagram, dll).">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
            </div>
            <Table 
              columns={columns} 
              dataSource={sentiments} 
              pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t) => `Total ${t} interaksi` }} 
              size="middle" 
              rowKey="id" 
              scroll={{ x: 800 }} 
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}
