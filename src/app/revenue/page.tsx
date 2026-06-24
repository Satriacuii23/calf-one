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
  SimpleGrid,
  Avatar,
  RingProgress,
  ThemeIcon,
  Box,
  Title,
  SegmentedControl,
} from '@mantine/core';
import { AreaChart, DonutChart, BarChart as MantineBarChart } from '@mantine/charts';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Receipt,
  Percent,
  ShoppingBag,
  BarChart3,
} from 'lucide-react';
import {
  revenueTrendData,
  areaRevenueData,
  productsData,
} from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function RevenuePage() {
  const areaChartData = areaRevenueData.map((item) => ({
    name: item.area,
    revenue: item.revenue / 1000000,
    outlets: item.outlets,
    growth: item.growth,
  }));

  const productChartData = productsData.map((item) => ({
    name: item.name,
    revenue: item.revenue / 1000000,
    units: item.units / 1000,
  }));

  return (
    <MainLayout title="Revenue Analytics" subtitle="Comprehensive revenue analysis and trends">
      {/* KPI Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Revenue MTD</Text>
                <Text fw={700} size="lg">Rp 14.8B</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+8.3%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <DollarSign size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Target MTD</Text>
                <Text fw={700} size="lg">Rp 15.0B</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">98.7% achieved</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="teal">
                <TrendingUp size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Avg Transaction</Text>
                <Text fw={700} size="lg">Rp 28.5K</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+2.1%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="violet">
                <Receipt size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Transactions</Text>
                <Text fw={700} size="lg">{formatNumber(18642)}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+15.2%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="orange">
                <ShoppingBag size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Growth Rate</Text>
                <Text fw={700} size="lg">+12.5%</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">vs last month</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="green">
                <Percent size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Projection</Text>
                <Text fw={700} size="lg">Rp 18.2B</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">end of month</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <BarChart3 size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">Revenue Trend</Text>
              <SegmentedControl
                size="xs"
                data={[
                  { label: '7D', value: '7d' },
                  { label: '30D', value: '30d' },
                  { label: '90D', value: '90d' },
                ]}
                defaultValue="30d"
              />
            </Group>
            <AreaChart
              h={300}
              data={revenueTrendData}
              dataKey="date"
              series={[{ name: 'revenue', color: 'blue.6' }]}
              curveType="natural"
              withDots={false}
              gridAxis="xy"
              valueFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}M`}
            />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder h="100%">
            <Text fw={600} size="lg" mb="lg">Revenue by Area</Text>
            <DonutChart
              data={areaRevenueData.map((item) => ({
                name: item.area,
                value: item.revenue / 1000000,
              }))}
              h={200}
              thickness={30}
              chartLabel="Rp 14.8B"
              valueFormatter={(value) => `Rp ${value.toFixed(0)}M`}
            />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Area Performance */}
      <Card shadow="xs" padding="lg" radius="md" withBorder mb="xl">
        <Text fw={600} size="lg" mb="lg">Area Performance</Text>
        <MantineBarChart
          h={300}
          data={areaChartData}
          dataKey="name"
          series={[
            { name: 'revenue', color: 'blue.6' },
          ]}
          tickLine="y"
          valueFormatter={(value) => `Rp ${value.toFixed(0)}M`}
        />
        <Table mt="lg" striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Area</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Revenue</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Outlets</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Growth</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {areaRevenueData.map((item) => (
              <Table.Tr key={item.area}>
                <Table.Td fw={500}>{item.area}</Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>Rp {(item.revenue / 1000000000).toFixed(1)}B</Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>{item.outlets}</Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Group gap={4} justify="flex-end">
                    {item.growth >= 0 ? (
                      <ArrowUpRight size={14} className="text-teal-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" />
                    )}
                    <Text size="sm" fw={500} c={item.growth >= 0 ? 'teal' : 'red'}>
                      {item.growth >= 0 ? '+' : ''}{item.growth}%
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Product Revenue */}
      <Card shadow="xs" padding="lg" radius="md" withBorder>
        <Text fw={600} size="lg" mb="lg">Product Revenue</Text>
        <MantineBarChart
          h={250}
          data={productChartData}
          dataKey="name"
          series={[{ name: 'revenue', color: 'teal.6' }]}
          orientation="vertical"
          valueFormatter={(value) => `Rp ${value.toFixed(0)}M`}
        />
        <Table mt="lg" striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Revenue</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Units</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Growth</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {productsData.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td fw={500}>{item.name}</Table.Td>
                <Table.Td><Badge variant="light" size="sm">{item.category}</Badge></Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>Rp {(item.revenue / 1000000).toFixed(0)}M</Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>{formatNumber(item.units)}</Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Group gap={4} justify="flex-end">
                    {item.growth >= 0 ? (
                      <ArrowUpRight size={14} className="text-teal-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" />
                    )}
                    <Text size="sm" fw={500} c={item.growth >= 0 ? 'teal' : 'red'}>
                      {item.growth >= 0 ? '+' : ''}{item.growth}%
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </MainLayout>
  );
}
