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
} from '@mantine/core';
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  CheckCircle,
  Eye,
} from 'lucide-react';

const reportTypes = [
  { icon: DollarSign, title: 'Revenue Report', desc: 'Daily, weekly, monthly revenue breakdown', freq: 'Daily' },
  { icon: Users, title: 'Customer Report', desc: 'Customer acquisition and retention metrics', freq: 'Weekly' },
  { icon: Building2, title: 'Outlet Report', desc: 'Individual outlet performance analysis', freq: 'Weekly' },
  { icon: BarChart3, title: 'Product Report', desc: 'Product sales and inventory analysis', freq: 'Weekly' },
  { icon: TrendingUp, title: 'Growth Report', desc: 'Year-over-year growth analytics', freq: 'Monthly' },
  { icon: Building2, title: 'Operations Report', desc: 'Infrastructure and operational metrics', freq: 'Daily' },
];

const recentReports = [
  { name: 'Revenue Report - June 2026', date: '2026-06-24', type: 'Revenue', size: '2.4 MB', status: 'ready' },
  { name: 'Customer Analytics - Week 25', date: '2026-06-23', type: 'Customer', size: '1.8 MB', status: 'ready' },
  { name: 'Outlet Performance - Week 25', date: '2026-06-23', type: 'Outlet', size: '3.2 MB', status: 'ready' },
  { name: 'Product Sales - June Week 4', date: '2026-06-22', type: 'Product', size: '1.5 MB', status: 'ready' },
];

export default function ReportsPage() {
  return (
    <MainLayout title="Reports" subtitle="Generate and download business reports">
      {/* Quick Actions */}
      <Group gap="md" mb="xl">
        <Button leftSection={<FileText size={16} />}>Generate New Report</Button>
        <Button variant="outline" leftSection={<Calendar size={16} />}>Schedule Report</Button>
      </Group>

      {/* Report Types */}
      <Grid gutter="md" mb="xl">
        {reportTypes.map((report) => (
          <Grid.Col key={report.title} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card shadow="xs" padding="lg" radius="md" withBorder h="100%">
              <Group justify="space-between" mb="md">
                <ThemeIcon size={48} radius="md" variant="light" color="blue">
                  <report.icon size={24} />
                </ThemeIcon>
                <Badge variant="outline" size="sm">{report.freq}</Badge>
              </Group>
              <Text fw={600} size="lg" mb="xs">{report.title}</Text>
              <Text size="sm" c="dimmed" mb="lg">{report.desc}</Text>
              <Button variant="outline" size="sm" fullWidth leftSection={<Download size={14} />}>
                Generate
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Recent Reports */}
      <Card shadow="xs" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="lg">
          <Box>
            <Text fw={600} size="lg">Recent Reports</Text>
            <Text size="xs" c="dimmed">Download previously generated reports</Text>
          </Box>
          <Button variant="outline" size="xs">View All</Button>
        </Group>
        <Stack gap="md">
          {recentReports.map((report) => (
            <Paper key={report.name} p="md" radius="md" withBorder>
              <Group justify="space-between">
                <Group gap="md">
                  <ThemeIcon size={40} radius="md" variant="light" color="blue">
                    <FileText size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text size="sm" fw={500}>{report.name}</Text>
                    <Group gap="md" mt={4}>
                      <Group gap={4}>
                        <Calendar size={12} className="text-slate-400" />
                        <Text size="xs" c="dimmed">{report.date}</Text>
                      </Group>
                      <Badge variant="outline" size="xs">{report.type}</Badge>
                      <Text size="xs" c="dimmed">{report.size}</Text>
                    </Group>
                  </Box>
                </Group>
                <Group gap="sm">
                  <Badge color="teal" variant="light" leftSection={<CheckCircle size={12} />}>
                    Ready
                  </Badge>
                  <Button variant="subtle" size="xs" color="blue">
                    <Download size={16} />
                  </Button>
                  <Button variant="subtle" size="xs" color="gray">
                    <Eye size={16} />
                  </Button>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Card>
    </MainLayout>
  );
}
