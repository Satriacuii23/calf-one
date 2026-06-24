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
  TextInput,
  Select,
} from '@mantine/core';
import {
  Building2,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Video,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { allOutlets, cctvData, internetData } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function OutletsPage() {
  const onlineCount = allOutlets.filter((o) => o.status === 'online').length;
  const totalCCTVOnline = allOutlets.reduce((acc, o) => acc + o.cctvOnline, 0);
  const totalCCTVTotal = allOutlets.reduce((acc, o) => acc + o.cctvTotal, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'teal';
      case 'warning':
        return 'yellow';
      case 'offline':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <MainLayout title="Outlets Management" subtitle="Monitor and manage all outlet operations">
      {/* KPI Section */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 6, sm: 4, md: 3 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Total Outlets</Text>
                <Text fw={700} size="lg">{allOutlets.length}</Text>
                <Group gap={4} mt="xs">
                  <Badge color="teal" variant="light" size="xs">{onlineCount} Online</Badge>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <Building2 size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 3 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Avg Health Score</Text>
                <Text fw={700} size="lg">
                  {Math.round(allOutlets.reduce((acc, o) => acc + o.healthScore, 0) / allOutlets.length)}
                </Text>
                <Group gap={4} mt="xs">
                  <Badge color="teal" variant="light" size="xs">Healthy</Badge>
                </Group>
              </Box>
              <RingProgress
                size={50}
                thickness={5}
                sections={[{ value: 85, color: 'teal' }]}
              />
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 3 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>CCTV Online</Text>
                <Text fw={700} size="lg">{totalCCTVOnline} / {totalCCTVTotal}</Text>
                <Group gap={4} mt="xs">
                  <Text size="xs" c="dimmed">{Math.round((totalCCTVOnline / totalCCTVTotal) * 100)}% operational</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="violet">
                <Video size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 4, md: 3 }}>
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="dimmed" fw={500} mb={4}>Total Revenue</Text>
                <Text fw={700} size="lg">Rp {formatNumber(allOutlets.reduce((acc, o) => acc + o.revenue, 0))}</Text>
                <Group gap={4} mt="xs">
                  <ArrowUpRight size={14} className="text-teal-500" />
                  <Text size="xs" c="teal" fw={500}>+12.5%</Text>
                </Group>
              </Box>
              <ThemeIcon size={40} radius="md" variant="light" color="green">
                <TrendingUp size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Outlet Table */}
      <Card shadow="xs" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="lg">
          <Text fw={600} size="lg">All Outlets</Text>
          <Group gap="sm">
            <TextInput
              placeholder="Search outlets..."
              leftSection={<Search size={16} />}
              radius="md"
            />
            <Select
              placeholder="Filter by area"
              leftSection={<Filter size={16} />}
              data={['All Areas', 'Bandung', 'Jakarta', 'Bekasi', 'Tasikmalaya', 'Karawang', 'Cirebon']}
              defaultValue="All Areas"
              radius="md"
            />
          </Group>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Outlet</Table.Th>
              <Table.Th>Area</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Health</Table.Th>
              <Table.Th>CCTV</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Revenue</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Growth</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {allOutlets.map((outlet) => (
              <Table.Tr key={outlet.id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar color="blue" radius="md" size="sm">
                      {outlet.name.split(' ')[1]?.[0] || outlet.name[0]}
                    </Avatar>
                    <Text fw={500} size="sm">{outlet.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap={4}>
                    <MapPin size={14} className="text-slate-400" />
                    <Text size="sm" c="dimmed">{outlet.area}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(outlet.status)} variant="light" size="sm">
                    {outlet.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Progress
                      value={outlet.healthScore}
                      color={outlet.healthScore >= 80 ? 'teal' : outlet.healthScore >= 60 ? 'yellow' : 'red'}
                      size="sm"
                      w={60}
                      radius="xl"
                    />
                    <Text size="xs" fw={500}>{outlet.healthScore}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {outlet.cctvOnline === outlet.cctvTotal ? (
                      <CheckCircle size={16} className="text-teal-500" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-500" />
                    )}
                    <Text size="xs" c="dimmed">{outlet.cctvOnline}/{outlet.cctvTotal}</Text>
                  </Group>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Text size="sm" fw={500}>Rp {(outlet.revenue / 1000000).toFixed(0)}M</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Group gap={4} justify="flex-end">
                    {outlet.growth >= 0 ? (
                      <ArrowUpRight size={14} className="text-teal-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" />
                    )}
                    <Text size="sm" fw={500} c={outlet.growth >= 0 ? 'teal' : 'red'}>
                      {outlet.growth >= 0 ? '+' : ''}{outlet.growth}%
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Infrastructure Section */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">CCTV Status</Text>
              <Badge color="blue" variant="light">{cctvData.filter((c) => c.status === 'online').length}/{cctvData.length} Online</Badge>
            </Group>
            <Stack gap="md">
              {cctvData.map((camera) => (
                <Paper key={camera.id} p="md" radius="md" withBorder>
                  <Group justify="space-between">
                    <Box>
                      <Text size="sm" fw={500}>{camera.cameraName}</Text>
                      <Group gap="xs">
                        <MapPin size={12} className="text-slate-400" />
                        <Text size="xs" c="dimmed">{camera.outletName}</Text>
                      </Group>
                    </Box>
                    <Group gap="sm">
                      <Text size="xs" c="dimmed">{camera.lastUpdate}</Text>
                      {camera.status === 'online' ? (
                        <CheckCircle size={16} className="text-teal-500" />
                      ) : (
                        <XCircle size={16} className="text-red-500" />
                      )}
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Text fw={600} size="lg">Internet Status</Text>
              <Badge color="teal" variant="light">{internetData.filter((i) => i.status === 'stable').length}/{internetData.length} Stable</Badge>
            </Group>
            <Stack gap="md">
              {internetData.map((connection, index) => (
                <Paper key={index} p="md" radius="md" withBorder>
                  <Group justify="space-between">
                    <Box>
                      <Text size="sm" fw={500}>{connection.outlet}</Text>
                      <Group gap="xs">
                        <Wifi size={12} className="text-slate-400" />
                        <Text size="xs" c="dimmed">{connection.isp}</Text>
                      </Group>
                    </Box>
                    <Group gap="md">
                      <Box ta="center">
                        <Text size="xs" c="dimmed">Speed</Text>
                        <Text size="sm" fw={500}>{connection.speed} Mbps</Text>
                      </Box>
                      <Box ta="center">
                        <Text size="xs" c="dimmed">Latency</Text>
                        <Text size="sm" fw={500}>{connection.latency} ms</Text>
                      </Box>
                      <Badge
                        color={connection.status === 'stable' ? 'teal' : 'yellow'}
                        variant="light"
                      >
                        {connection.status}
                      </Badge>
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
}
