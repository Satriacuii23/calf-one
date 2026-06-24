"use client"

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
  Button,
} from '@mantine/core';
import {
  ArrowRight,
  Database,
  LayoutDashboard,
  Users,
  Settings,
  Brain,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Target,
  TrendingUp,
  Eye,
  Building2,
  Zap,
  BarChart3,
  MessageCircle,
  Heart,
  Globe,
  Layers,
  Shield,
} from 'lucide-react';

const currentStateItems = [
  { icon: Database, title: "Data Scattered", description: "ESB data underutilized across systems", color: 'red' },
  { icon: Users, title: "No CRM", description: "Customer data not centralized", color: 'red' },
  { icon: Heart, title: "No Loyalty", description: "Missing customer retention program", color: 'red' },
  { icon: MessageCircle, title: "No Customer Care", description: "No dedicated support channel", color: 'red' },
  { icon: Eye, title: "CCTV Not Centralized", description: "Fragmented monitoring systems", color: 'red' },
  { icon: AlertTriangle, title: "No Single Source of Truth", description: "Inconsistent reporting across departments", color: 'red' },
];

const futureStateItems = [
  { icon: Layers, title: "One Data", description: "Centralized data warehouse", color: 'teal' },
  { icon: LayoutDashboard, title: "One Dashboard", description: "Unified analytics platform", color: 'teal' },
  { icon: Users, title: "One Customer", description: "360-degree customer view", color: 'teal' },
  { icon: Settings, title: "One Operations Center", description: "Streamlined management", color: 'teal' },
  { icon: Globe, title: "One Ecosystem", description: "Integrated business suite", color: 'teal' },
];

const roadmapItems = [
  { year: "2026", quarter: "Q1-Q2", title: "Data Hub", description: "Centralize all data sources", status: "current" },
  { year: "2026", quarter: "Q3-Q4", title: "Executive Command Center", description: "CALF ONE Dashboard", status: "current" },
  { year: "2027", quarter: "Q1-Q2", title: "Operations Command Center", description: "Real-time outlet monitoring", status: "planned" },
  { year: "2027", quarter: "Q3-Q4", title: "CRM System", description: "Customer relationship management", status: "planned" },
  { year: "2028", quarter: "Q1-Q2", title: "Loyalty Program", description: "Customer retention engine", status: "planned" },
  { year: "2028", quarter: "Q3-Q4", title: "Customer Care", description: "Dedicated support platform", status: "planned" },
  { year: "2029", quarter: "Q1-Q2", title: "Mobile Apps", description: "iOS & Android applications", status: "planned" },
  { year: "2029", quarter: "Q3-Q4", title: "AI Layer", description: "Predictive analytics & automation", status: "planned" },
];

const businessImpacts = [
  { icon: TrendingUp, title: "Higher Revenue", description: "+15-25% through data-driven decisions", color: 'teal' },
  { icon: Eye, title: "Better Visibility", description: "Real-time insights across all outlets", color: 'blue' },
  { icon: Target, title: "Faster Decisions", description: "60-second company overview", color: 'violet' },
  { icon: Heart, title: "Better Retention", description: "+20% customer loyalty", color: 'pink' },
  { icon: Zap, title: "Digital Transformation", description: "Foundation for future growth", color: 'yellow' },
];

export default function WhyCalfOnePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        py={80}
        px="xl"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 800,
            background: 'radial-gradient(circle, rgba(31, 94, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <Box maw={1200} mx="auto" ta="center" style={{ position: 'relative' }}>
          <Badge color="blue" variant="light" size="lg" mb="xl">
            Kopi Calf Coffee & Milkbar Indonesia
          </Badge>
          <Text fw={800} size={48} mb="md" style={{ lineHeight: 1.2 }}>
            Why{" "}
            <Text component="span" fw={800} style={{ background: 'linear-gradient(135deg, #1F5EFF, #0F2D6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CALF ONE
            </Text>
            ?
          </Text>
          <Text size="xl" c="dimmed" maw={700} mx="auto" mb="xl">
            The Executive & Operations Command Center that transforms how management
            understands and runs the business. One platform. Complete visibility.
          </Text>
          <Group justify="center" gap="md">
            <Button size="lg" color="blue" rightSection={<ArrowRight size={16} />}>
              Request Demo
            </Button>
            <Button size="lg" variant="outline" color="blue" rightSection={<ChevronRight size={16} />}>
              View Features
            </Button>
          </Group>
        </Box>
      </Box>

      {/* Problem Statement */}
      <Box py={60} px="xl" bg="white">
        <Box maw={1200} mx="auto">
          <Box ta="center" mb={48}>
            <Badge color="yellow" variant="light" mb="md">Current State</Badge>
            <Text fw={700} size={32} mb="md">Challenges We Face</Text>
            <Text c="dimmed" maw={600} mx="auto">
              Without CALF ONE, critical business data is fragmented across multiple systems,
              making it difficult to make informed decisions quickly.
            </Text>
          </Box>
          <Grid gutter="lg">
            {currentStateItems.map((item) => (
              <Grid.Col key={item.title} span={{ base: 12, md: 6, lg: 4 }}>
                <Card shadow="xs" padding="lg" radius="md" withBorder h="100%" style={{ borderColor: '#fee2e2', backgroundColor: '#fef2f2' }}>
                  <Group gap="md" align="flex-start">
                    <ThemeIcon size={48} radius="md" variant="light" color="red">
                      <item.icon size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={600} mb="xs">{item.title}</Text>
                      <Text size="sm" c="dimmed">{item.description}</Text>
                    </Box>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Solution Preview */}
      <Box py={60} px="xl" style={{ backgroundColor: '#eff6ff' }}>
        <Box maw={1200} mx="auto">
          <Box ta="center" mb={48}>
            <Badge color="teal" variant="light" mb="md">Future State</Badge>
            <Text fw={700} size={32} mb="md">The CALF ONE Solution</Text>
            <Text c="dimmed" maw={600} mx="auto">
              One unified platform that brings together all aspects of your business
              into a single, powerful command center.
            </Text>
          </Box>
          <Grid gutter="lg">
            {futureStateItems.map((item) => (
              <Grid.Col key={item.title} span={{ base: 12, md: 6, lg: 4 }}>
                <Card shadow="xs" padding="lg" radius="md" withBorder h="100%" style={{ borderColor: '#bbf7d0', backgroundColor: '#f0fdf4' }}>
                  <Group gap="md" align="flex-start">
                    <ThemeIcon size={48} radius="md" variant="light" color="teal">
                      <item.icon size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={600} mb="xs">{item.title}</Text>
                      <Text size="sm" c="dimmed">{item.description}</Text>
                    </Box>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Roadmap */}
      <Box py={80} px="xl" bg="white">
        <Box maw={1200} mx="auto">
          <Box ta="center" mb={64}>
            <Badge color="blue" variant="light" mb="md">Implementation Roadmap</Badge>
            <Text fw={700} size={32} mb="md">Our Journey to Excellence</Text>
            <Text c="dimmed" maw={600} mx="auto">
              A phased approach to digital transformation, building a solid foundation
              before adding advanced capabilities.
            </Text>
          </Box>
          <Grid gutter="lg">
            {roadmapItems.map((item) => (
              <Grid.Col key={item.title} span={{ base: 12, md: 6 }}>
                <Card
                  shadow="xs"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ borderColor: item.status === 'current' ? '#1F5EFF' : '#e2e8f0' }}
                >
                  <Group gap="md" align="flex-start">
                    <Box
                      w={32}
                      h={32}
                      style={{
                        borderRadius: '50%',
                        backgroundColor: item.status === 'current' ? '#1F5EFF' : '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                    <Box>
                      <Group gap="xs" mb="xs">
                        <Badge variant="outline" size="xs">{item.year} {item.quarter}</Badge>
                        {item.status === 'current' && (
                          <Badge color="blue" variant="light" size="xs">In Progress</Badge>
                        )}
                      </Group>
                      <Text fw={600} mb="xs">{item.title}</Text>
                      <Text size="sm" c="dimmed">{item.description}</Text>
                    </Box>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Business Impact */}
      <Box py={80} px="xl" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0F2D6B 100%)' }}>
        <Box maw={1200} mx="auto">
          <Box ta="center" mb={64}>
            <Text fw={700} size={32} c="white" mb="md">Expected Business Impact</Text>
            <Text c="dimmed" maw={600} mx="auto">
              CALF ONE delivers measurable results across all areas of the business,
              from revenue growth to customer satisfaction.
            </Text>
          </Box>
          <Grid gutter="lg">
            {businessImpacts.map((impact) => (
              <Grid.Col key={impact.title} span={{ base: 6, md: 4, lg: 2 }}>
                <Card shadow="xs" padding="lg" radius="md" h="100%" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Box ta="center">
                    <ThemeIcon
                      size={56}
                      radius="xl"
                      mx="auto"
                      mb="md"
                      variant="light"
                      color={impact.color}
                    >
                      <impact.icon size={28} />
                    </ThemeIcon>
                    <Text fw={600} c="white" mb="xs">{impact.title}</Text>
                    <Text size="sm" c="dimmed">{impact.description}</Text>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Key Features */}
      <Box py={80} px="xl" bg="white">
        <Box maw={1200} mx="auto">
          <Box ta="center" mb={64}>
            <Badge color="blue" variant="light" mb="md">Core Features</Badge>
            <Text fw={700} size={32} mb="md">Everything You Need in One Place</Text>
          </Box>
          <Grid gutter="lg">
            {[
              { icon: BarChart3, title: "Business Performance", desc: "Revenue, transactions, growth metrics" },
              { icon: Building2, title: "Outlet Performance", desc: "Real-time status for all 115 outlets" },
              { icon: Users, title: "Customer Intelligence", desc: "360-degree customer view" },
              { icon: Eye, title: "CCTV Monitoring", desc: "Live feeds from 1,032 cameras" },
              { icon: AlertTriangle, title: "Risk Center", desc: "Proactive issue detection" },
              { icon: Settings, title: "Operations Center", desc: "Internet, power, vehicle tracking" },
              { icon: Brain, title: "AI Insights", desc: "Predictive recommendations" },
              { icon: Shield, title: "Company Health Score", desc: "89/100 overall health" },
            ].map((feature) => (
              <Grid.Col key={feature.title} span={{ base: 12, sm: 6, lg: 3 }}>
                <Card shadow="xs" padding="lg" radius="md" withBorder h="100%">
                  <Box ta="center">
                    <ThemeIcon size={48} radius="md" variant="light" color="blue" mx="auto" mb="md">
                      <feature.icon size={24} />
                    </ThemeIcon>
                    <Text fw={600} mb="xs">{feature.title}</Text>
                    <Text size="sm" c="dimmed">{feature.desc}</Text>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* CTA */}
      <Box py={80} px="xl" style={{ background: 'linear-gradient(135deg, #1F5EFF 0%, #0F2D6B 100%)' }}>
        <Box maw={800} mx="auto" ta="center">
          <Text fw={700} size={36} c="white" mb="md">
            Ready to Transform Your Business?
          </Text>
          <Text size="lg" mb="xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Join the digital transformation journey and give your management team
            the visibility they need to make better decisions, faster.
          </Text>
          <Group justify="center" gap="md">
            <Button size="lg" color="white" c="blue.8" rightSection={<ArrowRight size={16} />}>
              Schedule a Demo
            </Button>
            <Button size="lg" variant="white" style={{ color: 'white', borderColor: 'white' }} rightSection={<ChevronRight size={16} />}>
              Learn More
            </Button>
          </Group>
        </Box>
      </Box>

      {/* Footer */}
      <Box py={32} px="xl" style={{ backgroundColor: '#0f172a' }}>
        <Box maw={1200} mx="auto">
          <Group justify="space-between" align="center">
            <Group gap="md">
              <Box
                w={36}
                h={36}
                style={{
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #1F5EFF, #0F2D6B)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text fw={700} c="white">C1</Text>
              </Box>
              <Box>
                <Text size="sm" fw={600} c="white">CALF ONE</Text>
                <Text size="xs" c="dimmed">Executive Command Center</Text>
              </Box>
            </Group>
            <Text size="sm" c="dimmed">
              Kopi Calf Coffee & Milkbar Indonesia © 2026
            </Text>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}
