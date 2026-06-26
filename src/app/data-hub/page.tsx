"use client"

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Typography, Space, Button } from 'antd';
import { Layers, Database, FileSpreadsheet, Sliders } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const { Title, Text } = Typography;

export default function DataHubPage() {
  const { t } = useLanguage();

  return (
    <MainLayout title="Data HUB" subtitle={t("Centralized Enterprise Data Engine", "Pusat Mesin Data Perusahaan")}>
      <div style={{ paddingBottom: '60px' }}>
        
        {/* EDITORIAL HERO HEADER */}
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>{t("Executive Board", "Dewan Eksekutif")}</span>
          </div>
          <Title level={1} style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
            {t("CALF Centralized Data HUB", "Pusat Repositori Data Terpusat CALF")}
          </Title>
          <Text style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, display: 'block', maxWidth: '750px', marginBottom: '24px' }}>
            {t(
              "Centralized management hub for operational data repositories. Select an action below or navigate via the sidebar to ingest documents, classify schema, standardize KPIs, or inspect live PostgreSQL data.",
              "Pusat manajemen repositori data operasional terpusat. Silakan pilih menu di bawah atau melalui navigasi sidebar untuk mengimpor dokumen, mengklasifikasi skema, mengonfigurasi standar KPI, atau memantau data aktual SSOT kita."
            )}
          </Text>

          <Space size="middle" wrap>
            <Link href="/data-hub/documents">
              <Button type="primary" size="large" icon={<FileSpreadsheet size={16} />} style={{ background: '#0F172A', fontWeight: 600, borderRadius: '6px' }}>
                {t("Access Documents Portal (User Import)", "Akses Sub-Halaman Documents (Impor User)")}
              </Button>
            </Link>
            <Link href="/data-hub/classification">
              <Button size="large" icon={<Layers size={16} />} style={{ fontWeight: 600, borderRadius: '6px' }}>
                {t("Access Classification Studio", "Akses Sub-Halaman Classification")}
              </Button>
            </Link>
            <Link href="/data-hub/kpi-standardization">
              <Button size="large" icon={<Sliders size={16} />} style={{ fontWeight: 600, borderRadius: '6px', border: '1px solid #0F172A', color: '#0F172A' }}>
                {t("Access KPI & Standardization", "Akses KPI & Standarisasi")}
              </Button>
            </Link>
            <Link href="/data-hub/view">
              <Button size="large" icon={<Database size={16} />} style={{ fontWeight: 600, borderRadius: '6px' }}>
                {t("Access Data Preview (Live SSOT)", "Akses Sub-Halaman Preview Data")}
              </Button>
            </Link>
          </Space>
        </div>

      </div>
    </MainLayout>
  );
}
