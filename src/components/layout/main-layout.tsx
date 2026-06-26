"use client"

import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Badge, Input, Space, Button, Dropdown, Progress, ConfigProvider, Tooltip, Popover, Grid } from 'antd';
import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  Users,
  Package,
  AlertTriangle,
  Settings,
  BarChart3,
  Zap,
  Brain,
  Database,
  FileText,
  Bell,
  Search,
  LogOut,
  User,
  ActivitySquare,
  MessageSquare,
  HeadphonesIcon,
  HardDrive,
  FileSpreadsheet
} from 'lucide-react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const healthScore = 89;

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

function MainLayoutInner({ children, title, subtitle }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const { lang, setLang, t } = useLanguage();

  const navGroups = [
    {
      group: t("Executive Board", "Dewan Eksekutif"),
      items: [
        { 
          name: "Data HUB", 
          href: "/data-hub", 
          icon: HardDrive,
          subItems: [
            { name: t("Documents", "Dokumen Impor"), href: "/data-hub/documents" },
            { name: t("Classification", "Klasifikasi Engine"), href: "/data-hub/classification" },
            { name: t("KPI & Standardization", "KPI & Standarisasi"), href: "/data-hub/kpi-standardization" },
            { name: t("Preview Data", "Pratinjau Data"), href: "/data-hub/view" },
          ]
        },
        { name: t("Data Driven", "Data Driven"), href: "/about", icon: BarChart3 },
        { name: t("Overview", "Ringkasan Utama"), href: "/", icon: LayoutDashboard },
      ]
    },
    {
      group: t("Business Intelligence", "Intelijen Bisnis"),
      items: [
        { name: t("Revenue Intelligence", "Intelijen Pendapatan"), href: "/revenue", icon: TrendingUp },
        { name: t("Product Intelligence", "Intelijen Produk"), href: "/products", icon: Package },
        { name: t("Customer Intelligence", "Intelijen Pelanggan"), href: "/customers", icon: Users },
      ]
    },
    {
      group: t("Operations & Risk", "Operasional & Risiko"),
      items: [
        { name: t("Operations Center", "Pusat Operasional"), href: "/operations", icon: ActivitySquare },
        { name: t("Outlet Intelligence", "Intelijen Cabang"), href: "/outlets", icon: Building2 },
        { name: t("Expansions", "Ekspansi Jaringan"), href: "/expansion", icon: Zap },
        { name: t("Risk Center", "Pusat Mitigasi Risiko"), href: "/risk", icon: AlertTriangle },
      ]
    },
    {
      group: t("Brand & Engagement", "Brand & Engagement"),
      items: [
        { name: t("Social Intelligence", "Intelijen Medsos"), href: "/social", icon: MessageSquare },
        { name: t("Customer Care", "Layanan Konsumen"), href: "/care", icon: HeadphonesIcon },
      ]
    },
    {
      group: t("System & Administration", "Administrasi Sistem"),
      items: [
        { name: t("AI Insights", "Wawasan AI"), href: "/insights", icon: Brain },
        { name: t("Reports", "Laporan Bisnis"), href: "/reports", icon: FileText },
        { name: t("Settings", "Pengaturan"), href: "/settings", icon: Settings },
      ]
    }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/login');
  };

  const menuItems = navGroups.map((group, index) => ({
    key: `group-${index}`,
    type: 'group' as const,
    label: <Text type="secondary" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{group.group.toUpperCase()}</Text>,
    children: group.items.map((item: any) => {
      if (item.subItems) {
        return {
          key: item.name,
          icon: <item.icon size={16} />,
          label: item.name,
          children: item.subItems.map((sub: any) => ({
            key: sub.href,
            label: <Link href={sub.href}>{sub.name}</Link>,
          })),
        };
      }
      return {
        key: item.href,
        icon: <item.icon size={16} />,
        label: <Link href={item.href}>{item.name}</Link>,
      };
    }),
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={260} 
        theme="light" 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, borderRight: '1px solid #f0f0f0', zIndex: 100 }}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #f0f0f0', justifyContent: collapsed ? 'center' : 'flex-start', overflow: 'hidden' }}>
          {collapsed ? (
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#0A34A6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text strong style={{ color: 'white', fontSize: 16, fontFamily: 'Pacifico, cursive', fontStyle: 'italic' }}>C</Text>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 12 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                  <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#0F172A', fontFamily: 'cursive, Georgia, serif', lineHeight: 1, marginTop: -4 }}>Calf</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                  <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                </div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: '#0F172A', marginTop: 4 }}>DATA HUB</div>
            </div>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ borderRight: 0, padding: '12px 0' }}
        />

        {!collapsed && (
          <div style={{ padding: '20px 16px', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
            <Tooltip title={t("Overall Calf Coffee business health indicator", "Indikator kesehatan bisnis Calf Coffee aktual")} placement="right">
              <div style={{ padding: 16, backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', marginBottom: 16, cursor: 'pointer' }}>
                <Text type="secondary" strong style={{ fontSize: 11, display: 'block', marginBottom: 12, letterSpacing: 0.5 }}>CALF HEALTH SCORE</Text>
                <Space align="center" size="middle">
                  <Progress type="circle" percent={healthScore} size={48} strokeColor="#10b981" format={(percent) => <Text strong style={{ fontSize: 13, color: '#047857' }}>{percent}</Text>} />
                  <div>
                    <Text strong style={{ fontSize: 20, display: 'block', lineHeight: 1, marginBottom: 4 }}>{healthScore}<span style={{fontSize: 12, color: '#94a3b8'}}>/100</span></Text>
                    <Badge color="#10b981" text={<span style={{ color: '#10b981', fontWeight: 600, fontSize: 11 }}>{t("Excellent", "Sangat Baik")}</span>} />
                  </div>
                </Space>
              </div>
            </Tooltip>
            
            <Space align="center" style={{ width: '100%', justifyContent: 'space-between', padding: '0 4px' }}>
              <Space>
                <Avatar size={36} style={{ backgroundColor: '#1F5EFF', color: '#fff', fontWeight: 600 }}>F</Avatar>
                <div>
                  <Text strong style={{ display: 'block', fontSize: 14, lineHeight: 1.2, color: '#0f172a' }}>Founder</Text>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12, lineHeight: 1.2 }}>Executive Access</Text>
                </div>
              </Space>
            </Space>
          </div>
        )}
      </Sider>

      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 260), transition: 'all 0.2s', minHeight: '100vh' }}>
        <Header style={{ padding: isMobile ? '0 16px' : '0 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 50 }}>
          <Space align="center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 32, height: 32 }}
            />
            {(() => {
              const headerMap: Record<string, string> = {
                "Executive Board": "Dewan Eksekutif",
                "Data HUB": "Pusat Data (HUB)",
                "Data HUB / Documents Portal": "Data HUB / Portal Dokumen",
                "Data HUB / Preview Data": "Data HUB / Pratinjau Data",
                "Data HUB / Classification Studio": "Data HUB / Studio Klasifikasi",
                "Centralized Enterprise Analytics & Command Center": "Pusat Analisis & Komando Enterprise Terpusat",
                "Centralized Enterprise Data Engine": "Pusat Mesin Data Perusahaan",
                "Zero-Touch Enterprise Document & Spreadsheet Ingestion": "Gerbang Impor Dokumen Mandiri Tanpa Pilih Kategori",
                "Live Enterprise Data Warehouse Explorer": "Eksplorasi Repositori Live Data Warehouse",
                "Universal Document Sanitization & Column Classifier": "Diagnosis Dokumen Universal & Studio Klasifikasi",
                "Revenue Intelligence": "Intelijen Pendapatan",
                "Revenue analysis, payment methods, and transaction history": "Analisis pendapatan, metode pembayaran, dan riwayat transaksi",
                "Product Intelligence": "Intelijen Produk",
                "Product performance, category breakdown, and item analytics": "Performa produk, rincian kategori, dan analitik menu",
                "Customer Intelligence": "Intelijen Pelanggan",
                "Customer segments, retention analytics, and behavior": "Segmentasi konsumen, analitik retensi, dan perilaku",
                "Operations Center": "Pusat Operasional",
                "Shift discipline, infrastructure health, and inventory accuracy": "Kedisiplinan shift, kesehatan infrastruktur, dan akurasi stok",
                "Outlet Intelligence": "Intelijen Cabang",
                "Geospatial surveillance, regional performance, and branch health": "Pemantauan geospasial, performa wilayah, dan kesehatan cabang",
                "Expansions": "Ekspansi Jaringan",
                "Expansion Center": "Pusat Ekspansi",
                "New branch proposal pipeline, site survey status, and budgeting": "Pipeline proposal cabang baru, status survei, dan anggaran",
                "Risk Center": "Pusat Mitigasi Risiko",
                "Fraud detection, operational anomalies, and system alerts": "Deteksi kecurangan, anomali operasional, dan peringatan sistem",
                "Social Intelligence": "Intelijen Medsos",
                "Brand sentiment, public mentions, and campaign analytics": "Sentimen brand, pembicaraan publik, dan analitik kampanye",
                "Customer Care": "Layanan Konsumen",
                "Active complaint tickets, resolution tracking, and SLAs": "Tiket keluhan aktif, pelacakan penyelesaian, dan SLA",
                "AI Insights": "Wawasan AI",
                "Strategic executive recommendations and anomaly diagnosis": "Rekomendasi eksekutif strategis dan diagnosis anomali",
                "Reports": "Laporan Bisnis",
                "Export daily, weekly, and enterprise audit reports": "Ekspor laporan harian, mingguan, dan audit enterprise",
                "About": "Data Driven",
                "Data Driven": "Data Driven",
                "Why CALF ONE": "Data Driven",
                "KPI & Standardization": "KPI & Standarisasi",
                "Data HUB / KPI & Standardization": "Data HUB / KPI & Standarisasi",
                "Enterprise Operational Metrics & Supporting Standardization Engine": "Metrik Operasional Enterprise & Mesin Standarisasi Pendukung"
              };
              const dispTitle = lang === 'id' && title ? (headerMap[title] || title) : title;
              const dispSub = lang === 'id' && subtitle ? (headerMap[subtitle] || subtitle) : subtitle;
              return dispTitle ? (
                <div style={{ marginLeft: 16 }}>
                  <Text strong style={{ fontSize: 18, display: 'block', lineHeight: 1.2 }}>{dispTitle}</Text>
                  {dispSub && <Text type="secondary" style={{ fontSize: 13, display: 'block', lineHeight: 1.2 }}>{dispSub}</Text>}
                </div>
              ) : null;
            })()}
          </Space>

          <Space size={isMobile ? "small" : "middle"} align="center">
            {!isMobile && (
              <>
                <Input 
                  placeholder={t("Search insights, outlets, reports...", "Cari wawasan, cabang, laporan...")} 
                  prefix={<Search size={16} style={{ color: '#94a3b8' }} />}
                  style={{ borderRadius: 24, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', width: 260, padding: '6px 16px' }}
                />
              </>
            )}

            {/* SWISS MONOCHROME LANGUAGE SWITCHER */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '6px', padding: '2px', border: '1px solid #CBD5E1' }}>
              <Button 
                size="small" 
                type="text"
                onClick={() => setLang('en')}
                style={{ background: lang === 'en' ? '#0F172A' : 'transparent', color: lang === 'en' ? '#FFFFFF' : '#64748B', fontWeight: 700, fontSize: '11px', borderRadius: '4px', height: '26px', padding: '0 10px', transition: 'all 0.15s ease' }}
              >
                🇬🇧 EN
              </Button>
              <Button 
                size="small" 
                type="text"
                onClick={() => setLang('id')}
                style={{ background: lang === 'id' ? '#0F172A' : 'transparent', color: lang === 'id' ? '#FFFFFF' : '#64748B', fontWeight: 700, fontSize: '11px', borderRadius: '4px', height: '26px', padding: '0 10px', transition: 'all 0.15s ease' }}
              >
                🇮🇩 ID
              </Button>
            </div>
            
            <Tooltip title="System Alerts & Notifications">
              <Popover 
                placement="bottomRight" 
                title={<div style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Text strong>Notifications</Text><Button type="link" size="small" style={{ fontSize: 12 }}>Mark all as read</Button></div>}
                content={
                  <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <AlertTriangle size={14} color="#ef4444" />
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.2, marginBottom: 4 }}>1 New Risk Alert detected</Text>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', lineHeight: 1.4 }}>Drive Thru wait time at Kelapa Gading area exceeded limit.</Text>
                        <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 4, color: '#94a3b8' }}>5 minutes ago</Text>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileText size={14} color="#3b82f6" />
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.2, marginBottom: 4 }}>Daily Report Ready for Download</Text>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', lineHeight: 1.4 }}>Executive summary of revenue and operations for June 23, 2026 has been generated.</Text>
                        <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 4, color: '#94a3b8' }}>1 hour ago</Text>
                      </div>
                    </div>
                    <Button type="dashed" block style={{ marginTop: 8 }}>View All Notifications</Button>
                  </div>
                } 
                trigger="click"
              >
                <Badge dot color="#ef4444" offset={[-4, 4]}>
                  <Button type="text" shape="circle" icon={<Bell size={18} style={{ color: '#475569' }} />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                </Badge>
              </Popover>
            </Tooltip>
            
            <Dropdown 
              menu={{ 
                items: [
                  { key: 'profile', label: 'Account Settings', icon: <User size={14} /> }, 
                  { key: 'logout', label: 'Log Out', icon: <LogOut size={14} />, danger: true }
                ],
                onClick: (e) => {
                  if (e.key === 'logout') {
                    handleLogout();
                  }
                }
              }} 
              trigger={['click']}
            >
              <Avatar size={36} style={{ backgroundColor: '#1F5EFF', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>F</Avatar>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: isMobile ? '16px' : '24px', overflow: 'initial', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 1440 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export function MainLayout(props: MainLayoutProps) {
  return <MainLayoutInner {...props} />;
}
