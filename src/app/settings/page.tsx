"use client"

import { MainLayout } from "@/components/layout/main-layout";
import {
  Grid,
  Card,
  Text,
  Group,
  Stack,
  Badge,
  Paper,
  ThemeIcon,
  Box,
  Button,
  Switch,
  Divider,
} from '@mantine/core';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Save,
  Building2,
  Mail,
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    alerts: true,
    reports: false,
  });

  return (
    <MainLayout title="Settings" subtitle="Manage your preferences and configuration">
      <Grid gutter="xl">
        {/* Settings Navigation */}
        <Grid.Col span={{ base: 12, lg: 3 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Stack gap="xs">
              {[
                { icon: User, label: 'Profile', active: true },
                { icon: Bell, label: 'Notifications', active: false },
                { icon: Shield, label: 'Security', active: false },
                { icon: Palette, label: 'Appearance', active: false },
                { icon: Globe, label: 'Language', active: false },
                { icon: Database, label: 'Data & Privacy', active: false },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? 'filled' : 'subtle'}
                  color={item.active ? 'blue' : 'gray'}
                  leftSection={<item.icon size={16} />}
                  justify="flex-start"
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Settings Content */}
        <Grid.Col span={{ base: 12, lg: 9 }}>
          <Stack gap="xl">
            {/* Profile Settings */}
            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Text fw={600} size="lg" mb="lg">Profile Settings</Text>
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12 }}>
                  <Group gap="xl" mb="lg">
                    <Box
                      w={80}
                      h={80}
                      style={{
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #1F5EFF, #0F2D6B)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text fw={700} size="xl" c="white">SA</Text>
                    </Box>
                    <Box>
                      <Button variant="outline" size="xs">Change Photo</Button>
                      <Text size="xs" c="dimmed" mt="xs">JPG, PNG or GIF. Max 2MB</Text>
                    </Box>
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Full Name</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">Satria Admin</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Username</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">satriacuii23</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Email</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">admin@kopicalf.co.id</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Role</Text>
                  <Box style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm" c="dimmed">Administrator</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                  <Group justify="flex-end">
                    <Button leftSection={<Save size={16} />}>Save Changes</Button>
                  </Group>
                </Grid.Col>
              </Grid>
            </Card>

            {/* Company Settings */}
            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Text fw={600} size="lg" mb="lg">Company Information</Text>
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Company Name</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">Kopi Calf Coffee & Milkbar</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Industry</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">Food & Beverage</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Contact Email</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">info@kopicalf.co.id</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text size="sm" fw={500} mb="xs">Phone</Text>
                  <Box style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                    <Text size="sm">+62 22 1234 5678</Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Card>

            {/* Notification Settings */}
            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Text fw={600} size="lg" mb="lg">Notification Preferences</Text>
              <Stack gap="md">
                <Group justify="space-between">
                  <Group gap="md">
                    <Mail size={20} className="text-slate-500" />
                    <Box>
                      <Text size="sm" fw={500}>Email Notifications</Text>
                      <Text size="xs" c="dimmed">Receive reports via email</Text>
                    </Box>
                  </Group>
                  <Switch checked={notifications.email} onChange={(e) => setNotifications({ ...notifications, email: e.currentTarget.checked })} />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Group gap="md">
                    <Bell size={20} className="text-slate-500" />
                    <Box>
                      <Text size="sm" fw={500}>Push Notifications</Text>
                      <Text size="xs" c="dimmed">Get real-time alerts</Text>
                    </Box>
                  </Group>
                  <Switch checked={notifications.push} onChange={(e) => setNotifications({ ...notifications, push: e.currentTarget.checked })} />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Group gap="md">
                    <Shield size={20} className="text-slate-500" />
                    <Box>
                      <Text size="sm" fw={500}>Risk Alerts</Text>
                      <Text size="xs" c="dimmed">Critical alerts for issues</Text>
                    </Box>
                  </Group>
                  <Switch checked={notifications.alerts} onChange={(e) => setNotifications({ ...notifications, alerts: e.currentTarget.checked })} />
                </Group>
              </Stack>
            </Card>

            {/* API & Integration */}
            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="lg">
                <Box>
                  <Text fw={600} size="lg">API & Integrations</Text>
                  <Text size="xs" c="dimmed">Connect with external services</Text>
                </Box>
                <Badge color="teal" variant="light">Connected</Badge>
              </Group>
              <Stack gap="md">
                <Paper p="md" radius="md" style={{ backgroundColor: '#f8fafc' }}>
                  <Group justify="space-between">
                    <Group gap="md">
                      <ThemeIcon size={40} radius="md" variant="light" color="violet">
                        <Database size={20} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500}>Supabase</Text>
                        <Text size="xs" c="dimmed">Database & Authentication</Text>
                      </Box>
                    </Group>
                    <Button variant="outline" size="xs">Configure</Button>
                  </Group>
                </Paper>
                <Paper p="md" radius="md" style={{ backgroundColor: '#f8fafc' }}>
                  <Group justify="space-between">
                    <Group gap="md">
                      <ThemeIcon size={40} radius="md" variant="light" color="dark">
                        <Globe size={20} color="white" />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500}>Vercel</Text>
                        <Text size="xs" c="dimmed">Deployment & Hosting</Text>
                      </Box>
                    </Group>
                    <Badge color="teal" variant="light">Connected</Badge>
                  </Group>
                </Paper>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
}
