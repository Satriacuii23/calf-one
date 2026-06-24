"use client"

import { AppShell, Burger, Group, NavLink, Text, Avatar, Menu, ActionIcon, Badge, TextInput, ScrollArea, Divider, Box, UnstyledButton, Badge as MantineBadge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Revenue", href: "/revenue", icon: TrendingUp },
  { name: "Outlets", href: "/outlets", icon: Building2 },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Risk Center", href: "/risk", icon: AlertTriangle },
  { name: "AI Insights", href: "/insights", icon: Brain },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

const secondaryNav = [
  { name: "Expansions", href: "/expansion", icon: Zap },
  { name: "Why CALF ONE", href: "/why-calf-one", icon: BarChart3 },
]

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [...navigation, ...secondaryNav].map((item) => ({
    ...item,
    active: pathname === item.href,
  }));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: collapsed ? 70 : 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: false },
      }}
      padding="md"
      styles={(theme) => ({
        main: {
          backgroundColor: '#f8fafc',
        },
      })}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <Avatar color="blue" radius="md" size={36}>
                C1
              </Avatar>
              <div>
                <Text fw={700} size="lg" c="dark">CALF ONE</Text>
                <Text size="xs" c="dimmed">Command Center</Text>
              </div>
            </Group>
          </Group>

          <Group gap="md">
            <TextInput
              placeholder="Search..."
              leftSection={<Search size={16} />}
              radius="md"
              styles={{
                input: {
                  width: 240,
                }
              }}
              visibleFrom="sm"
            />

            <Menu shadow="md" width={320} position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle" size="lg" radius="md" pos="relative">
                  <Bell size={20} />
                  <Badge size="xs" color="red" variant="filled" circle pos="absolute" top={0} right={0}>
                    3
                  </Badge>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Notifications</Menu.Label>
                <Menu.Item>
                  <Text size="sm" fw={500}>Outlet Cirebon offline</Text>
                  <Text size="xs" c="dimmed">5 min ago</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text size="sm" fw={500}>17 CCTV cameras offline</Text>
                  <Text size="xs" c="dimmed">12 min ago</Text>
                </Menu.Item>
                <Menu.Item>
                  <Text size="sm" fw={500}>Internet unstable at 3 outlets</Text>
                  <Text size="xs" c="dimmed">18 min ago</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="xs">
                    <Avatar color="blue" radius="md" size="sm">SA</Avatar>
                    <Box visibleFrom="sm">
                      <Text size="sm" fw={500}>Admin</Text>
                      <Text size="xs" c="dimmed">Manager</Text>
                    </Box>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<User size={14} />}>Profile</Menu.Item>
                <Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<LogOut size={14} />}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ backgroundColor: '#0F2D6B' }}>
        <AppShell.Section grow component={ScrollArea}>
          <Box>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                component={Link}
                href={item.href}
                onClick={close}
                label={!collapsed && item.name}
                leftSection={<item.icon size={20} />}
                rightSection={!collapsed && <ChevronRight size={14} />}
                active={item.active}
                variant="filled"
                styles={{
                  root: {
                    color: item.active ? 'white' : 'rgba(255,255,255,0.7)',
                    backgroundColor: item.active ? 'rgba(255,255,255,0.15)' : 'transparent',
                    borderRadius: 8,
                    marginBottom: 4,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                  label: {
                    color: item.active ? 'white' : 'rgba(255,255,255,0.7)',
                  },
                }}
              />
            ))}
          </Box>
        </AppShell.Section>

        <AppShell.Section>
          <Divider color="rgba(255,255,255,0.1)" my="sm" />
          <UnstyledButton
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: 12,
              color: 'rgba(255,255,255,0.6)',
              transition: 'all 0.2s',
            }}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <Text size="sm">Collapse</Text>}
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box py="md">
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
