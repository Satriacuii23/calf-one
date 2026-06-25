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
} from 'lucide-react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const navGroups = [
  {
    group: "Executive Board",
    items: [
      { name: "Overview", href: "/", icon: LayoutDashboard },
      { name: "Why CALF ONE", href: "/why-calf-one", icon: BarChart3 },
      { name: "Data Relation", href: "/data-relation", icon: Database },
      { 
        name: "Data HUB", 
        href: "/data-hub", 
        icon: HardDrive,
        subItems: [
          { name: "Insert", href: "/data-hub/insert" },
          { name: "View", href: "/data-hub/view" },
        ]
      },
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
      { name: "Expansions", href: "/expansion", icon: Zap },
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
  const router = useRouter();
  const supabase = createClient();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

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
                <div style={{ fontSize: 32, fontWeight: 400, color: '#134cd8', fontFamily: 'Pacifico, cursive', lineHeight: 1, marginTop: -4 }}>Calf</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                  <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                </div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2.5, color: '#134cd8', marginTop: 4 }}>COFFEE & MILKBAR</div>
            </div>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={['Data HUB']}
          items={menuItems}
          style={{ borderRight: 0, padding: '12px 0' }}
        />

        {!collapsed && (
          <div style={{ padding: '20px 16px', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
            <Tooltip title="Overall Calf Coffee business health indicator" placement="right">
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

      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 260), transition: 'all 0.2s', minHeight: '100vh' }}>
        <Header style={{ padding: isMobile ? '0 16px' : '0 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 50 }}>
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

          <Space size={isMobile ? "small" : "large"} align="center">
            {!isMobile && (
              <>
                <Input 
                  placeholder="Search insights, outlets, reports..." 
                  prefix={<Search size={16} style={{ color: '#94a3b8' }} />}
                  style={{ borderRadius: 24, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', width: 280, padding: '6px 16px' }}
                />
                <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>June 24, 2026</Text>
              </>
            )}
            
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
