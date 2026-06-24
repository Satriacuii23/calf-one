"use client"

import { MainLayout } from "@/components/layout/main-layout";
import {
  Grid,
  Card,
  Text,
  Group,
  Stack,
  Badge,
  Progress,
  Table,
  Paper,
  Avatar,
  RingProgress,
  ThemeIcon,
  Box,
  Button,
} from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import {
  Users,
  UserPlus,
  Repeat,
  Award,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  Brain,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  customerStats,
  customerFunnel,
  customerSegments,
  churnRiskData,
  topCustomers,
} from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function CustomersPage() {
  const funnelData = customerFunnel.map((item) => ({
    name: item.stage,
    value: item.percentage,
  }));

  return (
    <MainLayout title="Customer Intelligence" subtitle="Customer 360 insight and analytics">
      {/* KPI Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Total Customers</Text>
                <Text fw={700} size="lg">{formatNumber(customerStats.total)}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+12.5%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <Users size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>New Customers</Text>
                <Text fw={700} size="lg">{formatNumber(customerStats.new)}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+8.3%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="teal">
                <UserPlus size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Repeat Customers</Text>
                <Text fw={700} size="lg">{formatNumber(customerStats.repeat)}</Text>
                <Group gap={4} mt="xs">
                  <Badge color="teal" variant="light" size="xs">{customerStats.retention}% retention</Badge>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="violet">
                <Repeat size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Active Members</Text>
                <Text fw={700} size="lg">{formatNumber(customerStats.active)}</Text>
                <Group gap={4} mt="xs">
                  <Badge color="blue" variant="light" size="xs">18.1% of total</Badge>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <Award size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Retention Rate</Text>
                <Text fw={700} size="lg">{customerStats.retention}%</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+2.3%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="green">
                <TrendingUp size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Avg. Spend</Text>
                <Text fw={700} size="lg">Rp {formatNumber(customerStats.avgSpend)}</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">per visit</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="orange">
                <CreditCard size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Text fw={600} size="lg" mb="lg">Customer Funnel</Text>
            <DonutChart
              data={funnelData}
              h={220}
              thickness={30}
              chartLabel="250K"
              valueFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <Stack gap="xs" mt="md">
              {customerFunnel.map((item) => (
                <Group key={item.stage} justify="space-between">
                  <Text size="sm">{item.stage}</Text>
                  <Group gap="xs">
                    <Text size="sm" fw={500}>{formatNumber(item.count)}</Text>
                    <Text size="xs" c="dimmed">({item.percentage}%)</Text>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Text fw={600} size="lg" mb="lg">Customer Segments</Text>
            <Stack gap="md">
              {customerSegments.map((segment) => (
                <Box key={segment.name}>
                  <Group justify="space-between" mb={4}>
                    <Group gap="xs">
                      <Box w={10} h={10} style={{ borderRadius: '50%', backgroundColor: segment.color }} />
                      <Text size="sm" fw={500}>{segment.name}</Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={600}>{formatNumber(segment.count)}</Text>
                      <Badge variant="outline" size="xs">{segment.percentage}%</Badge>
                    </Group>
                  </Group>
                  <Progress value={segment.percentage} size="sm" color={segment.color} radius="xl" />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Top Customers */}
      <Card shadow="xs" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="lg">
          <Text fw={600} size="lg">Top Customers</Text>
          <Button variant="outline" size="xs" rightSection={<ArrowUpRight size={12} />}>
            View All
          </Button>
        </Group>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Segment</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Total Spent</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Visits</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Last Visit</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {topCustomers.map((customer) => (
              <Table.Tr key={customer.id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar color="blue" radius="md" size="sm">
                      {customer.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Text size="sm" fw={500}>{customer.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={customer.segment === 'VIP' ? 'blue' : customer.segment === 'Loyal' ? 'teal' : 'gray'}
                    variant="light"
                    size="sm"
                  >
                    {customer.segment}
                  </Badge>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm" fw={600}>Rp {(customer.totalSpent / 1000000).toFixed(0)}M</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm">{customer.visitCount}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm" c="dimmed">{customer.lastVisit}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Churn Risk & AI Insights */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">Churn Risk Distribution</Text>
              <Badge color="red" variant="light">{churnRiskData.high} At Risk</Badge>
            </Group>
            <Stack gap="md">
              <Group justify="space-between" p="md" style={{ backgroundColor: '#f0fdf4', borderRadius: 8 }}>
                <Group gap="xs">
                  <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <Text size="sm">Low Risk</Text>
                </Group>
                <Text size="sm" fw={600}>{formatNumber(churnRiskData.low)}</Text>
              </Group>
              <Group justify="space-between" p="md" style={{ backgroundColor: '#fefce8', borderRadius: 8 }}>
                <Group gap="xs">
                  <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: '#eab308' }} />
                  <Text size="sm">Medium Risk</Text>
                </Group>
                <Text size="sm" fw={600}>{formatNumber(churnRiskData.medium)}</Text>
              </Group>
              <Group justify="space-between" p="md" style={{ backgroundColor: '#fef2f2', borderRadius: 8 }}>
                <Group gap="xs">
                  <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <Text size="sm">High Risk</Text>
                </Group>
                <Text size="sm" fw={600} c="red">{formatNumber(churnRiskData.high)}</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
            <Group gap="sm" mb="lg">
              <ThemeIcon size={40} radius="md" style={{ backgroundColor: '#0F2D6B' }}>
                <Brain size={20} color="white" />
              </ThemeIcon>
              <Box>
                <Text fw={600}>AI Customer Insight</Text>
                <Text size="xs" c="dimmed">Powered by CALF AI</Text>
              </Box>
            </Group>
            <Stack gap="md">
              <Paper p="md" radius="md" withBorder>
                <Group justify="space-between">
                  <Box>
                    <Text size="sm" fw={500}>Churn Prediction</Text>
                    <Text size="xs" c="dimmed">{formatNumber(churnRiskData.high)} customers likely to churn in 30 days</Text>
                  </Box>
                  <Button size="xs" leftSection={<Heart size={12} />} color="teal">
                    Send Retention Offer
                  </Button>
                </Group>
              </Paper>
              <Text size="xs" c="dimmed">Expected impact: +5.3% retention</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
}
