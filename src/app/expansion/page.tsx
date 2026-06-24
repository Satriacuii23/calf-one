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
  Paper,
  ThemeIcon,
  Box,
} from '@mantine/core';
import {
  Zap,
  MapPin,
  Building2,
  TrendingUp,
  Calendar,
  Target,
  CheckCircle,
  Clock,
} from 'lucide-react';

const expansionPlans = [
  { region: "Bandung", current: 35, target: 50, color: '#1F5EFF', growth: "+15 outlets planned" },
  { region: "Jakarta", current: 28, target: 45, color: '#0F2D6B', growth: "+17 outlets planned" },
  { region: "Bekasi", current: 18, target: 30, color: '#3B82F6', growth: "+12 outlets planned" },
  { region: "Tasikmalaya", current: 15, target: 25, color: '#60A5FA', growth: "+10 outlets planned" },
  { region: "Karawang", current: 12, target: 20, color: '#93C5FD', growth: "+8 outlets planned" },
  { region: "Cirebon", current: 7, target: 15, color: '#BFDBFE', growth: "+8 outlets planned" },
];

const upcomingOutlets = [
  { name: "Calf Trans Studio", area: "Bandung", status: "Planning", date: "Q3 2026" },
  { name: "Calf Bandung Timur", area: "Bandung", status: "Construction", date: "Q3 2026" },
  { name: "Calf Kelapa Gading", area: "Jakarta", status: "Planning", date: "Q4 2026" },
  { name: "Calf Pantai Indah", area: "Jakarta", status: "Site Survey", date: "Q4 2026" },
  { name: "Calf Jababeka", area: "Bekasi", status: "Planning", date: "Q4 2026" },
];

export default function ExpansionPage() {
  const totalCurrent = expansionPlans.reduce((acc, p) => acc + p.current, 0);
  const totalTarget = expansionPlans.reduce((acc, p) => acc + p.target, 0);
  const expansionRate = Math.round(((totalTarget - totalCurrent) / totalCurrent) * 100);

  return (
    <MainLayout title="Expansion Plans" subtitle="Strategic outlet growth roadmap">
      {/* Stats */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
            <Group gap="md">
              <ThemeIcon size={48} radius="md" variant="light" color="blue">
                <Building2 size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="xl">{totalCurrent}</Text>
                <Text size="xs" c="dimmed">Current Outlets</Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 3 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <Group gap="md">
              <ThemeIcon size={48} radius="md" variant="light" color="teal">
                <Target size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="xl">{totalTarget}</Text>
                <Text size="xs" c="dimmed">Target Outlets</Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 3 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group gap="md">
              <ThemeIcon size={48} radius="md" variant="light" color="violet">
                <Zap size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="xl" c="violet">+{totalTarget - totalCurrent}</Text>
                <Text size="xs" c="dimmed">New Outlets</Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 6, sm: 3 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group gap="md">
              <ThemeIcon size={48} radius="md" variant="light" color="yellow">
                <TrendingUp size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="xl" c="yellow">+{expansionRate}%</Text>
                <Text size="xs" c="dimmed">Growth Rate</Text>
              </Box>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid gutter="xl">
        {/* Regional Expansion */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Box mb="lg">
              <Text fw={600} size="lg">Regional Expansion Plan</Text>
              <Text size="xs" c="dimmed">Outlet targets by region</Text>
            </Box>
            <Stack gap="lg">
              {expansionPlans.map((plan) => (
                <Box key={plan.region}>
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <MapPin size={14} className="text-slate-400" />
                      <Text size="sm" fw={500}>{plan.region}</Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>{plan.current}</Text>
                      <Text size="sm" c="dimmed">→</Text>
                      <Text size="sm" fw={700} style={{ color: plan.color }}>{plan.target}</Text>
                    </Group>
                  </Group>
                  <Progress
                    value={(plan.current / plan.target) * 100}
                    color={plan.color}
                    size="sm"
                    radius="xl"
                  />
                  <Text size="xs" c="dimmed" mt="xs">{plan.growth}</Text>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Upcoming Outlets */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Box>
                <Text fw={600} size="lg">Upcoming Outlets</Text>
                <Text size="xs" c="dimmed">Outlets in pipeline</Text>
              </Box>
              <Badge color="teal" variant="light" leftSection={<Clock size={12} />}>
                {upcomingOutlets.length} Planned
              </Badge>
            </Group>
            <Stack gap="md">
              {upcomingOutlets.map((outlet) => (
                <Paper key={outlet.name} p="md" radius="md" withBorder>
                  <Group justify="space-between">
                    <Group gap="md">
                      <ThemeIcon size={48} radius="md" variant="light" color="blue">
                        <Building2 size={24} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500}>{outlet.name}</Text>
                        <Text size="xs" c="dimmed">{outlet.area}</Text>
                      </Box>
                    </Group>
                    <Box ta="right">
                      <Badge
                        color={outlet.status === "Construction" ? "yellow" : outlet.status === "Site Survey" ? "blue" : "gray"}
                        variant="light"
                        size="sm"
                        mb="xs"
                      >
                        {outlet.status}
                      </Badge>
                      <Group gap={4} justify="flex-end">
                        <Calendar size={10} className="text-slate-400" />
                        <Text size="xs" c="dimmed">{outlet.date}</Text>
                      </Group>
                    </Box>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Timeline */}
      <Card shadow="xs" padding="lg" radius="md" withBorder mt="xl">
        <Box mb="lg">
          <Text fw={600} size="lg">Expansion Timeline 2026-2029</Text>
        </Box>
        <Stack gap="lg">
          {[
            { year: "2026", quarter: "Q1-Q2", title: "Phase 1: Foundation", desc: "Data Hub & Executive Command Center", progress: 75 },
            { year: "2026", quarter: "Q3-Q4", title: "Phase 2: Scale Up", desc: "Operations Center & 10 new outlets", progress: 25 },
            { year: "2027", quarter: "Q1-Q2", title: "Phase 3: Customer Focus", desc: "CRM System & Loyalty Program", progress: 0 },
            { year: "2027", quarter: "Q3-Q4", title: "Phase 4: Expansion", desc: "25 new outlets across West Java", progress: 0 },
            { year: "2028", quarter: "Q1-Q2", title: "Phase 5: Digital", desc: "Customer Care & Mobile Apps", progress: 0 },
            { year: "2028", quarter: "Q3-Q4", title: "Phase 6: AI Integration", desc: "AI Layer & Predictive Analytics", progress: 0 },
            { year: "2029", quarter: "All Year", title: "Phase 7: Market Leader", desc: "200+ outlets, Full ecosystem", progress: 0 },
          ].map((phase, index) => (
            <Paper key={phase.year} p="md" radius="md" withBorder>
              <Group justify="space-between">
                <Group gap="md">
                  <Box
                    w={32}
                    h={32}
                    style={{
                      borderRadius: '50%',
                      backgroundColor: phase.progress > 0 && phase.progress < 100 ? '#eab308' : phase.progress === 100 ? '#22c55e' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {phase.progress === 100 ? (
                      <CheckCircle size={16} color="white" />
                    ) : (
                      <Box w={12} h={12} style={{ borderRadius: '50%', backgroundColor: 'white' }} />
                    )}
                  </Box>
                  <Box>
                    <Group gap="xs" mb={4}>
                      <Badge variant="outline" size="xs">{phase.year} {phase.quarter}</Badge>
                      {phase.progress > 0 && phase.progress < 100 && (
                        <Badge color="yellow" variant="light" size="xs">{phase.progress}%</Badge>
                      )}
                    </Group>
                    <Text size="sm" fw={600}>{phase.title}</Text>
                    <Text size="xs" c="dimmed">{phase.desc}</Text>
                  </Box>
                </Group>
                {phase.progress > 0 && phase.progress < 100 && (
                  <Progress value={phase.progress} w={100} color="yellow" size="sm" radius="xl" />
                )}
              </Group>
            </Paper>
          ))}
        </Stack>
      </Card>
    </MainLayout>
  );
}
