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
  Button,
} from '@mantine/core';
import {
  Brain,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Sparkles,
  Zap,
  Target,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { aiRecommendations, socialMentions } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function InsightsPage() {
  return (
    <MainLayout title="AI Insights" subtitle="Intelligent recommendations powered by machine learning">
      {/* AI Header */}
      <Card shadow="xs" padding="lg" radius="md" withBorder mb="xl" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
        <Group gap="sm">
          <ThemeIcon size={56} radius="md" style={{ backgroundColor: '#0F2D6B' }}>
            <Brain size={28} color="white" />
          </ThemeIcon>
          <Box>
            <Text fw={700} size="xl">CALF AI Insights</Text>
            <Text size="sm" c="dimmed">Powered by advanced machine learning algorithms analyzing your business data</Text>
          </Box>
          <Badge color="teal" variant="light" size="lg" ml="auto" leftSection={
            <Box w={8} h={8} bg="teal" style={{ borderRadius: '50%' }} />
          }>
            Live Analysis
          </Badge>
        </Group>
      </Card>

      {/* AI Recommendations */}
      <Grid gutter="md" mb="xl">
        {aiRecommendations.map((rec) => (
          <Grid.Col key={rec.id} span={{ base: 12, md: 4 }}>
            <Card shadow="xs" padding="lg" radius="md" withBorder h="100%">
              <Group justify="space-between" mb="md">
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <Sparkles size={20} />
                </ThemeIcon>
                <Badge color="teal" variant="light" leftSection={<TrendingUp size={12} />}>
                  {rec.impact}
                </Badge>
              </Group>
              <Text fw={600} size="lg" mb="xs">{rec.title}</Text>
              <Text size="sm" c="dimmed" mb="lg">{rec.description}</Text>
              <Group justify="space-between">
                <Group gap="xs">
                  <Target size={14} className="text-slate-400" />
                  <Text size="xs" c="dimmed">Confidence: {rec.confidence}%</Text>
                </Group>
                <Button variant="outline" size="xs">Apply</Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Social Intelligence & Predictions */}
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Box>
                <Text fw={600} size="lg">Social Intelligence</Text>
                <Text size="xs" c="dimmed">Latest social media mentions</Text>
              </Box>
              <Badge color="teal" variant="light" leftSection={<ThumbsUp size={12} />}>
                78% Positive
              </Badge>
            </Group>
            <Stack gap="md">
              {socialMentions.map((mention, index) => (
                <Paper key={index} p="md" radius="md" withBorder>
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap">
                      <ThemeIcon
                        size={32}
                        radius="md"
                        variant="light"
                        color={mention.sentiment === 'positive' ? 'teal' : mention.sentiment === 'negative' ? 'red' : 'gray'}
                      >
                        {mention.sentiment === 'positive' ? <ThumbsUp size={16} /> :
                         mention.sentiment === 'negative' ? <ThumbsDown size={16} /> :
                         <Minus size={16} />}
                      </ThemeIcon>
                      <Box>
                        <Group gap="xs" mb={4}>
                          <Badge variant="outline" size="xs" tt="capitalize">{mention.platform}</Badge>
                          <Text size="xs" c="dimmed">{mention.date}</Text>
                        </Group>
                        <Text size="sm" lineClamp={2}>{mention.content}</Text>
                        <Text size="xs" c="dimmed" mt={4}>{mention.engagement.toLocaleString()} engagements</Text>
                      </Box>
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <Box mb="lg">
              <Text fw={600} size="lg">Predictive Analytics</Text>
              <Text size="xs" c="dimmed">AI-powered forecasts</Text>
            </Box>
            <Stack gap="md">
              {[
                { title: 'Revenue Forecast', desc: 'Expected growth next month', value: '+12%', confidence: 89, color: 'teal' },
                { title: 'Customer Churn Risk', desc: 'At-risk customers identified', value: '14,821', confidence: 92, color: 'yellow' },
                { title: 'Peak Hours', desc: 'Optimal staffing times', value: '17:00-20:00', confidence: 95, color: 'blue' },
                { title: 'Top Product', desc: 'Predicted bestseller', value: 'Matcha Latte', confidence: 87, color: 'violet' },
              ].map((item) => (
                <Paper key={item.title} p="md" radius="md" style={{ backgroundColor: '#f8fafc' }}>
                  <Group justify="space-between">
                    <Box>
                      <Text size="sm" fw={500}>{item.title}</Text>
                      <Text size="xs" c="dimmed">{item.desc}</Text>
                    </Box>
                    <Box ta="right">
                      <Text fw={700} size="lg" c={item.color}>{item.value}</Text>
                      <Text size="xs" c="dimmed">{item.confidence}% confidence</Text>
                    </Box>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Recommended Actions */}
      <Card shadow="xs" padding="lg" radius="md" withBorder>
        <Box mb="lg">
          <Text fw={600} size="lg">Recommended Actions</Text>
          <Text size="xs" c="dimmed">AI-suggested next steps</Text>
        </Box>
        <Grid gutter="md">
          {[
            { icon: Users, title: 'Send retention offers', desc: '14,821 at-risk customers', time: 'Today', urgent: true },
            { icon: Zap, title: 'Increase staffing', desc: 'Dago outlet 17:00-20:00', time: 'Tomorrow', urgent: false },
            { icon: MessageCircle, title: 'Launch weekend promo', desc: 'Asia Afrika outlet', time: 'This week', urgent: false },
          ].map((action, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Paper p="md" radius="md" withBorder style={{ borderColor: '#e2e8f0' }}>
                <Group gap="md">
                  <ThemeIcon
                    size={40}
                    radius="md"
                    variant="light"
                    color={action.urgent ? 'yellow' : 'blue'}
                  >
                    <action.icon size={20} />
                  </ThemeIcon>
                  <Box style={{ flex: 1 }}>
                    <Group gap="xs" mb={4}>
                      <Text size="sm" fw={500}>{action.title}</Text>
                      {action.urgent && <Badge color="yellow" variant="light" size="xs">Urgent</Badge>}
                    </Group>
                    <Text size="xs" c="dimmed">{action.desc}</Text>
                    <Group gap="xs" mt="xs">
                      <Clock size={12} className="text-slate-400" />
                      <Text size="xs" c="dimmed">{action.time}</Text>
                    </Group>
                  </Box>
                  <Button variant="subtle" size="xs" color="teal">
                    <CheckCircle size={16} />
                  </Button>
                </Group>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </MainLayout>
  );
}
