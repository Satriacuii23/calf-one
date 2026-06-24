"use client"

import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Badge, Input, Space, Button, Dropdown, Progress, ConfigProvider, Tooltip } from 'antd';
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
  FileText,
  Bell,
  Search,
  LogOut,
  User,
  ActivitySquare,
  MessageSquare,
  HeadphonesIcon,
} from 'lucide-react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const navGroups = [
  {
    group: "Executive Board",
    items: [
      { name: "Overview", href: "/", icon: LayoutDashboard },
      { name: "Why CALF ONE", href: "/why-calf-one", icon: BarChart3 },
      { name: "Expansions", href: "/expansion", icon: Zap },
    ]
  },
  {
    group: "Business Intelligence",
    items: [
      { name: "Revenue Intelligence", href: "/revenue", icon: TrendingUp },
      { name: "Product Intelligence", href: "/products", icon: Package },
      { name: "Customer Intelligence", href: "/customers", icon: Users },
    ]
  },
  {
    group: "Operations & Risk",
    items: [
      { name: "Operations Center", href: "/operations", icon: ActivitySquare },
      { name: "Outlet Intelligence", href: "/outlets", icon: Building2 },
      { name: "Risk Center", href: "/risk", icon: AlertTriangle },
    ]
  },
  {
    group: "Brand & Engagement",
    items: [
      { name: "Social Intelligence", href: "/social", icon: MessageSquare },
      { name: "Customer Care", href: "/care", icon: HeadphonesIcon },
    ]
  },
  {
    group: "System & Administration",
    items: [
      { name: "AI Insights", href: "/insights", icon: Brain },
      { name: "Reports", href: "/reports", icon: FileText },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

const healthScore = 89;

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = navGroups.map((group, index) => ({
    key: `group-${index}`,
    type: 'group' as const,
    label: <Text type="secondary" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{group.group.toUpperCase()}</Text>,
    children: group.items.map(item => ({
      key: item.href,
      icon: <item.icon size={16} />,
      label: <Link href={item.href}>{item.name}</Link>,
    })),
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={260} 
        theme="light" 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, borderRight: '1px solid #f0f0f0', zIndex: 100 }}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: collapsed ? 0 : 12 }}>
            <Text strong style={{ color: 'white', fontSize: 14 }}>C1</Text>
          </div>
          {!collapsed && (
            <div>
              <Text strong style={{ fontSize: 16, display: 'block', lineHeight: 1.2 }}>CALF ONE</Text>
              <Text type="secondary" style={{ fontSize: 11, display: 'block', lineHeight: 1.2 }}>Command Center</Text>
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
            <Tooltip title="Indikator kesehatan bisnis Kopi Calf secara menyeluruh" placement="right">
              <div style={{ padding: 16, backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', marginBottom: 16, cursor: 'pointer' }}>
                <Text type="secondary" strong style={{ fontSize: 11, display: 'block', marginBottom: 12, letterSpacing: 0.5 }}>CALF HEALTH SCORE</Text>
                <Space align="center" size="middle">
                  <Progress type="circle" percent={healthScore} size={48} strokeColor="#10b981" format={(percent) => <Text strong style={{ fontSize: 13, color: '#047857' }}>{percent}</Text>} />
                  <div>
                    <Text strong style={{ fontSize: 20, display: 'block', lineHeight: 1, marginBottom: 4 }}>{healthScore}<span style={{fontSize: 12, color: '#94a3b8'}}>/100</span></Text>
                    <Badge color="#10b981" text={<span style={{ color: '#10b981', fontWeight: 600, fontSize: 11 }}>Excellent</span>} />
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

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'all 0.2s', minHeight: '100vh' }}>
        <Header style={{ padding: '0 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 50 }}>
          <Space align="center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 32, height: 32 }}
            />
            {title && (
              <div style={{ marginLeft: 16 }}>
                <Text strong style={{ fontSize: 18, display: 'block', lineHeight: 1.2 }}>{title}</Text>
                {subtitle && <Text type="secondary" style={{ fontSize: 13, display: 'block', lineHeight: 1.2 }}>{subtitle}</Text>}
              </div>
            )}
          </Space>

          <Space size="large" align="center">
            <Input 
              placeholder="Cari insight, outlet, laporan..." 
              prefix={<Search size={16} style={{ color: '#94a3b8' }} />}
              style={{ borderRadius: 24, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', width: 280, padding: '6px 16px' }}
            />
            <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>24 Juni 2026</Text>
            
            <Tooltip title="Peringatan & Notifikasi Sistem">
              <Dropdown menu={{ items: [{ key: '1', label: 'Laporan harian siap diunduh' }, { key: '2', label: '1 Alert Risiko baru terdeteksi' }] }} trigger={['click']}>
                <Badge dot color="#ef4444" offset={[-4, 4]}>
                  <Button type="text" shape="circle" icon={<Bell size={18} style={{ color: '#475569' }} />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                </Badge>
              </Dropdown>
            </Tooltip>
            
            <Dropdown menu={{ items: [{ key: 'profile', label: 'Pengaturan Akun', icon: <User size={14} /> }, { key: 'logout', label: 'Keluar', icon: <LogOut size={14} />, danger: true }] }} trigger={['click']}>
              <Avatar size={36} style={{ backgroundColor: '#1F5EFF', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>F</Avatar>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px', overflow: 'initial' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
