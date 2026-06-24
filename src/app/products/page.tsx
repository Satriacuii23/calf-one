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
  ThemeIcon,
  Box,
  Button,
} from '@mantine/core';
import { BarChart as MantineBarChart } from '@mantine/charts';
import {
  Package,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
} from 'lucide-react';
import { productsData } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function ProductsPage() {
  const totalProducts = productsData.length;
  const totalRevenue = productsData.reduce((acc, p) => acc + p.revenue, 0);
  const totalUnits = productsData.reduce((acc, p) => acc + p.units, 0);
  const avgGrowth = productsData.reduce((acc, p) => acc + p.growth, 0) / productsData.length;

  const topProduct = productsData.reduce((prev, curr) => prev.revenue > curr.revenue ? prev : curr);
  const bestGrowth = productsData.reduce((prev, curr) => prev.growth > curr.growth ? prev : curr);

  const chartData = productsData.map((item) => ({
    name: item.name,
    revenue: item.revenue / 1000000,
    units: item.units / 1000,
  }));

  return (
    <MainLayout title="Product Intelligence" subtitle="Product performance and analytics">
      {/* KPI Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Total Products</Text>
                <Text fw={700} size="lg">{totalProducts}</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">menu items</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <Package size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Total Revenue</Text>
                <Text fw={700} size="lg">Rp {(totalRevenue / 1000000000).toFixed(1)}B</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+12.5%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="teal">
                <DollarSign size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Units Sold</Text>
                <Text fw={700} size="lg">{formatNumber(totalUnits)}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+8.3%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="violet">
                <ShoppingCart size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Avg Growth</Text>
                <Text fw={700} size="lg">{avgGrowth >= 0 ? '+' : ''}{avgGrowth.toFixed(1)}%</Text>
                <Group gap={4} mt="xs">
                  <Badge color={avgGrowth >= 0 ? 'teal' : 'red'} variant="light" size="xs">
                    {avgGrowth >= 0 ? 'Growing' : 'Declining'}
                  </Badge>
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
                <Text size="xs" c="dimmed" fw={500} mb={4}>Top Revenue</Text>
                <Text fw={700} size="lg">{topProduct.name}</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">Rp {(topProduct.revenue / 1000000000).toFixed(1)}B</Text>
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
                <Text size="xs" c="dimmed" fw={500} mb={4}>Best Growth</Text>
                <Text fw={700} size="lg">{bestGrowth.name}</Text>
                <Group gap={4} mt="xs">
                  <Badge color="teal" variant="light" size="xs">+{bestGrowth.growth}%</Badge>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="green">
                <TrendingUp size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Text fw={600} size="lg" mb="lg">Product Revenue Comparison</Text>
            <MantineBarChart
              h={300}
              data={chartData}
              dataKey="name"
              series={[{ name: 'revenue', color: 'blue.6' }]}
              orientation="vertical"
              valueFormatter={(value) => `Rp ${value.toFixed(0)}M`}
            />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder h="100%">
            <Text fw={600} size="lg" mb="lg">Category Distribution</Text>
            <Stack gap="md">
              {['Coffee', 'Non-Coffee', 'Food'].map((cat) => {
                const catData = productsData.filter((p) => p.category === cat);
                const catRevenue = catData.reduce((acc, p) => acc + p.revenue, 0);
                const percentage = Math.round((catRevenue / totalRevenue) * 100);
                return (
                  <Box key={cat}>
                    <Group justify="space-between" mb={4}>
                      <Text size="sm" fw={500}>{cat}</Text>
                      <Text size="sm" fw={600}>{percentage}%</Text>
                    </Group>
                    <Progress value={percentage} size="lg" color="blue" radius="xl" />
                    <Text size="xs" c="dimmed" mt={4}>Rp {(catRevenue / 1000000000).toFixed(1)}B</Text>
                  </Box>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Products Table */}
      <Card shadow="xs" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="lg">
          <Box>
            <Text fw={600} size="lg">All Products</Text>
            <Text size="xs" c="dimmed">Performance metrics for all menu items</Text>
          </Box>
          <Group gap="sm">
            <Button variant="outline" size="xs" leftSection={<Filter size={12} />}>Filter</Button>
            <Button variant="outline" size="xs" leftSection={<Download size={12} />}>Export</Button>
          </Group>
        </Group>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Revenue</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Units Sold</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Avg. Price</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Growth</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {productsData.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td fw={500}>{product.name}</Table.Td>
                <Table.Td>
                  <Badge
                    color={product.category === 'Coffee' ? 'blue' : product.category === 'Non-Coffee' ? 'teal' : 'gray'}
                    variant="light"
                    size="sm"
                  >
                    {product.category}
                  </Badge>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm" fw={600}>Rp {(product.revenue / 1000000).toFixed(0)}M</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm">{formatNumber(product.units)}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm">Rp {formatNumber(product.revenue / product.units)}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Group gap={4} justify="flex-end">
                    {product.growth >= 0 ? (
                      <ArrowUpRight size={14} className="text-teal-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" />
                    )}
                    <Text size="sm" fw={500} c={product.growth >= 0 ? 'teal' : 'red'}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
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
