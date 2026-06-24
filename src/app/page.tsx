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
  RingProgress,
  ThemeIcon,
  Box,
  SegmentedControl,
  Paper,
  SimpleGrid,
  Avatar,
  Title,
} from '@mantine/core';
import { AreaChart, DonutChart } from '@mantine/charts';
import {
  Wallet,
  TrendingUp,
  Receipt,
  Users,
  Building2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Video,
  Wifi,
  Truck,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  AlertTriangle,
  Brain,
  ChevronRight,
} from 'lucide-react';
import {
  topOutlets,
  alertFeed,
  infrastructureStatus,
  aiRecommendations,
  healthScoreData,
  areaRevenueData,
  customerStats,
} from "@/lib/data";
import { formatNumber } from "@/lib/utils";

// Chart Data
const revenueData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const baseRevenue = 450000000 + Math.random() * 150000000;
  const weekendBoost = [0, 6].includes(date.getDay()) ? 1.3 : 1;
  return {
    date: date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    revenue: Math.round(baseRevenue * weekendBoost),
  };
});

const areaData = areaRevenueData.map((item) => ({
  name: item.area,
  value: item.revenue / 1000000,
}));

export default function OverviewPage() {
  const totalScore = Math.round(
    healthScoreData.reduce((acc, item) => acc + item.score * (item.weight / 100), 0)
  );

  return (
    <MainLayout title="Executive Overview" subtitle="Real-time business intelligence">
      {/* KPI Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Revenue Today</Text>
                <Text fw={700} size="lg">Rp 512.000.000</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+12.5%</Text>
                  <Text size="xs" c="dimmed">vs yesterday</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <Wallet size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

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
                <Text size="xs" c="dimmed" fw={500} mb={4}>Transactions</Text>
                <Text fw={700} size="lg">{formatNumber(18642)}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+15.2%</Text>
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
                <Text size="xs" c="dimmed" fw={500} mb={4}>Active Customers</Text>
                <Text fw={700} size="lg">{formatNumber(customerStats.active)}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+5.8%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="teal">
                <Users size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Outlets Active</Text>
                <Text fw={700} size="lg">115 / 115</Text>
                <Badge color="teal" variant="light" size="xs" mt="xs">All Online</Badge>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="teal">
                <Building2 size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 2 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Health Score</Text>
                <Text fw={700} size="lg">89/100</Text>
                <Badge color="yellow" variant="light" size="xs" mt="xs">Healthy</Badge>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="yellow">
                <Activity size={20} />
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
              h={280}
              data={revenueData}
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
              data={areaData}
              h={180}
              thickness={25}
              chartLabel="Rp 14.8B"
              valueFormatter={(value) => `Rp ${value.toFixed(0)}M`}
            />
            <Stack gap="xs" mt="md">
              {areaData.slice(0, 4).map((item) => (
                <Group key={item.name} justify="space-between">
                  <Text size="sm">{item.name}</Text>
                  <Text size="sm" fw={500}>Rp {item.value.toFixed(0)}M</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Top Outlets */}
      <Card shadow="xs" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="lg">
          <Text fw={600} size="lg">Top Performing Outlets</Text>
          <Text size="sm" c="dimmed">Last 7 days</Text>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          {topOutlets.slice(0, 4).map((outlet, index) => {
            const statusColor = outlet.status === 'online' ? 'teal' : outlet.status === 'warning' ? 'yellow' : 'red';
            return (
              <Card key={outlet.id} shadow="xs" padding="md" radius="md" withBorder>
                <Group justify="space-between" mb="sm">
                  <Group gap="sm">
                    <Avatar size={36} radius="md" color="blue">{index + 1}</Avatar>
                    <Box>
                      <Text fw={600} size="sm">{outlet.name}</Text>
                      <Text size="xs" c="dimmed">{outlet.area}</Text>
                    </Box>
                  </Group>
                  <Badge color={statusColor} variant="light" size="sm">{outlet.status}</Badge>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Revenue</Text>
                    <Text size="xs" fw={600}>Rp {(outlet.revenue / 1000000).toFixed(0)}M</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Growth</Text>
                    <Group gap={4}>
                      {outlet.growth >= 0 ? <ArrowUpRight size={12} className="text-teal-500" /> : <ArrowDownRight size={12} className="text-red-500" />}
                      <Text size="xs" fw={500} c={outlet.growth >= 0 ? 'teal' : 'red'}>+{outlet.growth}%</Text>
                    </Group>
                  </Group>
                  <Box>
                    <Group justify="space-between" mb={4}>
                      <Text size="xs" c="dimmed">Health</Text>
                      <Text size="xs" fw={600}>{outlet.healthScore}</Text>
                    </Group>
                    <Progress value={outlet.healthScore} color={outlet.healthScore >= 80 ? 'teal' : outlet.healthScore >= 60 ? 'yellow' : 'red'} size="sm" radius="xl" />
                  </Box>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Card>

      {/* Bottom Section */}
      <Grid gutter="md">
        {/* Risk Alerts */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">Risk Alert Feed</Text>
              <Badge color="red" variant="light">{alertFeed.filter((a) => !a.isRead).length} New</Badge>
            </Group>
            <Stack gap="md">
              {alertFeed.slice(0, 4).map((alert) => {
                const isDanger = alert.type === 'danger';
                const isWarning = alert.type === 'warning';
                return (
                  <Paper
                    key={alert.id}
                    p="md"
                    radius="md"
                    withBorder
                    style={{
                      borderColor: isDanger ? '#fee2e2' : isWarning ? '#fef3c7' : '#dbeafe',
                      backgroundColor: isDanger ? '#fef2f2' : isWarning ? '#fffbeb' : '#eff6ff',
                    }}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Group gap="sm" wrap="nowrap">
                        {isDanger ? <AlertCircle size={18} className="text-red-500" /> : isWarning ? <AlertTriangle size={18} className="text-amber-500" /> : <AlertCircle size={18} className="text-blue-500" />}
                        <Box>
                          <Text size="sm" fw={500}>{alert.message}</Text>
                          <Group gap="xs">
                            {alert.outlet && <Text size="xs" c="dimmed">{alert.outlet}</Text>}
                            <Text size="xs" c="dimmed">{alert.timestamp}</Text>
                          </Group>
                        </Box>
                      </Group>
                      {!alert.isRead && <Badge size="xs" color="red">New</Badge>}
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Infrastructure */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">Infrastructure Status</Text>
              <Badge color="teal" variant="light" leftSection={<Box w={6} h={6} bg="teal" style={{ borderRadius: '50%' }} />}>Live</Badge>
            </Group>
            <Stack gap="md">
              <Group justify="space-between">
                <Group gap="sm">
                  <ThemeIcon size={36} radius="md" variant="light" color="blue"><Video size={18} /></ThemeIcon>
                  <Box>
                    <Text size="sm" fw={500}>CCTV Online</Text>
                    <Text size="xs" c="dimmed">{infrastructureStatus.cctv.online}/{infrastructureStatus.cctv.total}</Text>
                  </Box>
                </Group>
                <Progress value={(infrastructureStatus.cctv.online / infrastructureStatus.cctv.total) * 100} color="blue" size="sm" w={100} />
              </Group>
              <Group justify="space-between">
                <Group gap="sm">
                  <ThemeIcon size={36} radius="md" variant="light" color="teal"><Wifi size={18} /></ThemeIcon>
                  <Box>
                    <Text size="sm" fw={500}>Internet Online</Text>
                    <Text size="xs" c="dimmed">{infrastructureStatus.internet.online}/{infrastructureStatus.internet.total}</Text>
                  </Box>
                </Group>
                <Progress value={(infrastructureStatus.internet.online / infrastructureStatus.internet.total) * 100} color="teal" size="sm" w={100} />
              </Group>
              <Group justify="space-between">
                <Group gap="sm">
                  <ThemeIcon size={36} radius="md" variant="light" color="violet"><Truck size={18} /></ThemeIcon>
                  <Box>
                    <Text size="sm" fw={500}>Vehicle Online</Text>
                    <Text size="xs" c="dimmed">{infrastructureStatus.vehicle.online}/{infrastructureStatus.vehicle.total}</Text>
                  </Box>
                </Group>
                <Progress value={(infrastructureStatus.vehicle.online / infrastructureStatus.vehicle.total) * 100} color="violet" size="sm" w={100} />
              </Group>
              <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid #e2e8f0' }}>
                <Group gap="xs">
                  <MessageSquare size={16} className="text-amber-500" />
                  <Text size="sm">Open Complaints</Text>
                </Group>
                <Badge color="amber" variant="light">{infrastructureStatus.openComplaint}</Badge>
              </Group>
              <Group justify="space-between">
                <Group gap="xs">
                  <ThumbsUp size={16} className="text-teal-500" />
                  <Text size="sm">Social Sentiment</Text>
                </Group>
                <Badge color="teal" variant="light">{infrastructureStatus.socialSentiment}% Positive</Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Health Score */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">Company Health Score</Text>
              <Badge color={totalScore >= 80 ? 'teal' : totalScore >= 60 ? 'yellow' : 'red'} size="lg">{totalScore}/100</Badge>
            </Group>
            <Group justify="center" mb="xl">
              <RingProgress
                size={140}
                thickness={14}
                roundCaps
                sections={[{ value: totalScore, color: totalScore >= 80 ? 'teal' : totalScore >= 60 ? 'yellow' : 'red' }]}
                label={
                  <Text ta="center" fw={700} size="xl">{totalScore}</Text>
                }
              />
            </Group>
            <Stack gap="sm">
              {healthScoreData.map((item) => (
                <Group key={item.category} justify="space-between">
                  <Text size="sm" c="dimmed">{item.category} ({item.weight}%)</Text>
                  <Group gap="xs">
                    <Progress value={item.score} color={item.score >= 80 ? 'teal' : item.score >= 60 ? 'yellow' : 'red'} size="sm" w={80} />
                    <Text size="sm" fw={500} w={30}>{item.score}</Text>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* AI Insights */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group gap="sm" mb="lg">
              <ThemeIcon size={40} radius="md" style={{ backgroundColor: '#0F2D6B' }}><Brain size={20} color="white" /></ThemeIcon>
              <Box>
                <Text fw={600}>AI Insights</Text>
                <Text size="xs" c="dimmed">Powered by CALF AI</Text>
              </Box>
            </Group>
            <Stack gap="md">
              {aiRecommendations.map((rec) => (
                <Paper key={rec.id} p="md" radius="md" withBorder style={{ borderColor: '#e2e8f0' }}>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={500}>{rec.title}</Text>
                    <Badge color="teal" variant="light" size="sm">{rec.impact}</Badge>
                  </Group>
                  <Text size="xs" c="dimmed" mb="sm">{rec.description}</Text>
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Confidence: {rec.confidence}%</Text>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </MainLayout>
  )
}
