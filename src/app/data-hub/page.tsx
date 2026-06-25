"use client"

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Typography, Card, Space, Button } from 'antd';
import { HardDrive, PlusCircle, Database } from 'lucide-react';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function DataHubPage() {
  return (
    <MainLayout title="Data HUB" subtitle="Centralized Enterprise Data Engine">
      <div style={{ paddingBottom: '60px' }}>
        
        {/* EDITORIAL HERO HEADER (MATCHING WHY CALF ONE) */}
        <div style={{ 
          background: '#FFFFFF', 
          border: '1px solid #E2E8F0', 
          borderRadius: '8px', 
          padding: '36px 40px', 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', background: '#F1F5F9', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>CALF ONE</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Executive Board</span>
          </div>
          <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
            CALF Centralized Data HUB
          </Title>
          <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', maxWidth: '750px', marginBottom: '24px' }}>
            Pusat manajemen repositori data operasional terpusat. Silakan pilih menu di bawah atau melalui navigasi sidebar untuk mengelola data.
          </Text>

          <Space size="middle" wrap>
            <Link href="/data-hub/insert">
              <Button type="primary" size="large" icon={<PlusCircle size={16} />} style={{ background: '#0F172A', fontWeight: 600, borderRadius: '6px' }}>
                Akses Sub-Halaman Insert
              </Button>
            </Link>
            <Link href="/data-hub/view">
              <Button size="large" icon={<Database size={16} />} style={{ fontWeight: 600, borderRadius: '6px' }}>
                Akses Sub-Halaman View
              </Button>
            </Link>
          </Space>
        </div>

      </div>
    </MainLayout>
  );
}
