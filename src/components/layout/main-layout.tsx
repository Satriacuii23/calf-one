"use client"

import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Badge, Input, Space, Button, Dropdown, Progress, ConfigProvider } from 'antd';
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
        style={{ borderRight: '1px solid #f0f0f0' }}
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
          <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ padding: 12, backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: 16 }}>
              <Text type="secondary" strong style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>CALF Health Score</Text>
              <Space align="center" size="middle">
                <Progress type="circle" percent={healthScore} size={48} strokeColor="#22c55e" format={(percent) => <Text strong style={{ fontSize: 12 }}>{percent}</Text>} />
                <div>
                  <Text strong style={{ fontSize: 18, display: 'block', lineHeight: 1 }}>{healthScore}/100</Text>
                  <Badge color="green" text="Healthy" style={{ marginTop: 4, fontSize: 12 }} />
                </div>
              </Space>
            </div>
            
            <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <Avatar style={{ backgroundColor: '#eff6ff', color: '#1F5EFF' }}>F</Avatar>
                <div>
                  <Text strong style={{ display: 'block', fontSize: 14, lineHeight: 1.2 }}>Founder</Text>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12, lineHeight: 1.2 }}>Administrator</Text>
                </div>
              </Space>
            </Space>
          </div>
        )}
      </Sider>

      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
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

          <Space size="large">
            <Input 
              placeholder="Search outlets, reports..." 
              prefix={<Search size={14} style={{ color: '#bfbfbf' }} />}
              style={{ borderRadius: 20, backgroundColor: '#f1f5f9', border: 'none', width: 240 }}
            />
            <Text type="secondary" style={{ fontSize: 14 }}>24 Juni 2026</Text>
            
            <Dropdown menu={{ items: [{ key: '1', label: 'Notifikasi 1' }] }} trigger={['click']}>
              <Badge dot color="red">
                <Button type="text" shape="circle" icon={<Bell size={18} />} />
              </Badge>
            </Dropdown>
            
            <Dropdown menu={{ items: [{ key: 'profile', label: 'Profil Saya', icon: <User size={14} /> }, { key: 'logout', label: 'Keluar', icon: <LogOut size={14} />, danger: true }] }} trigger={['click']}>
              <Avatar style={{ backgroundColor: '#eff6ff', color: '#1F5EFF', cursor: 'pointer' }}>F</Avatar>
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
