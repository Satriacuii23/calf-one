'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Eye,
  TrendingUp,
  Users,
  Brain,
  Database,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  Coffee,
} from 'lucide-react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const currentState = [
  { icon: Database, title: 'Data Scattered', description: 'Data is spread across multiple systems, spreadsheets, and reports' },
  { icon: Clock, title: 'Slow Decisions', description: 'Manual data compilation takes hours, missing critical windows' },
  { icon: Eye, title: 'No Single Source', description: 'Different teams have different numbers, causing confusion' },
  { icon: Target, title: 'Reactive Management', description: 'Only finding problems after they become critical' },
];

const futureState = [
  { icon: Brain, title: 'One Intelligence', description: 'All data unified in one platform with AI-powered insights' },
  { icon: TrendingUp, title: 'Faster Decisions', description: 'Real-time dashboards enable instant decision-making' },
  { icon: Eye, title: 'One Source of Truth', description: 'Everyone sees the same data, aligned goals across teams' },
  { icon: Zap, title: 'Proactive Management', description: 'AI predicts issues before they become problems' },
];

const businessImpact = [
  { metric: 'Decision Speed', current: '4 hours', target: '15 minutes', improvement: '93% faster' },
  { metric: 'Revenue Visibility', current: '24 hours', target: 'Real-time', improvement: '100% real-time' },
  { metric: 'Cost Savings', current: '-', target: 'Rp 500M/year', improvement: 'AI optimization' },
  { metric: 'Customer Retention', current: '78%', target: '92%', improvement: '+14%' },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Revenue Intelligence',
    description: 'Real-time revenue tracking with AI-powered forecasts and anomaly detection',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Eye,
    title: 'Outlet Command Center',
    description: 'Monitor all 115+ outlets in real-time with performance rankings',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Users,
    title: 'Customer Intelligence',
    description: 'Deep customer analytics with churn prediction and LTV analysis',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Brain,
    title: 'AI Insights',
    description: 'Automated recommendations that surface opportunities and risks',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Target,
    title: 'Risk Center',
    description: 'Proactive risk monitoring with intelligent alerts and actions',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Database,
    title: 'Expansion Planning',
    description: 'Data-driven location analysis and expansion roadmap',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
];

export default function WhyCalfOnePage() {
  return (
    <MainLayout
      title="Why CALF ONE?"
      subtitle="The Executive Decision Platform for Kopi Calf"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >
        {/* Hero Section */}
        <motion.section variants={item} className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
            <Coffee className="h-3 w-3 mr-1" />
            Executive Decision Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Every Decision.{' '}
            <span className="gradient-text">One Dashboard.</span>{' '}
            Zero Guesswork.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            CALF ONE transforms how Kopi Calf leadership makes decisions.
            From scattered data to unified intelligence, from reactive to proactive management.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
              <Button size="lg">
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Request Demo
            </Button>
          </div>
        </motion.section>

        {/* Current vs Future State */}
        <motion.section variants={item}>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Current State */}
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 border-amber-500/30 text-amber-400">
                  Current State
                </Badge>
                <CardTitle className="text-2xl">The Challenge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentState.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-card">
                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Future State */}
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 border-emerald-500/30 text-emerald-400">
                  Future State
                </Badge>
                <CardTitle className="text-2xl">The Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {futureState.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-card">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Business Impact */}
        <motion.section variants={item}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Business Impact</h2>
            <p className="text-muted-foreground">
              Expected improvements from implementing CALF ONE
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {businessImpact.map((impact, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">{impact.metric}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground line-through">
                      {impact.current}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg font-bold text-primary">
                      {impact.target}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {impact.improvement}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section variants={item}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Platform Capabilities</h2>
            <p className="text-muted-foreground">
              Six pillars of executive intelligence
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="pt-6">
                  <div className={`h-12 w-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Data Integration */}
        <motion.section variants={item}>
          <Card className="bg-gradient-to-br from-primary/10 via-card to-purple-500/10">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Connected Ecosystem</h3>
                  <p className="text-muted-foreground mb-6">
                    CALF ONE integrates with your existing systems to create a unified
                    command center. No more manual data entry or siloed information.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm">ESB POS Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm">Financial Systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm">Customer Database</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm">Supply Chain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm">Delivery Fleet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm">HR Systems</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                    <div className="absolute inset-8 rounded-full border-2 border-primary/30" />
                    <div className="absolute inset-16 rounded-full border-2 border-primary/40" />
                    <div className="absolute inset-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <Coffee className="h-12 w-12 text-primary" />
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-card border border-border text-xs font-medium">
                      CALF ONE
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA */}
        <motion.section variants={item} className="text-center">
          <Card className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 border-primary/30">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join Kopi Calf leadership in making faster, smarter decisions with
                real-time intelligence at your fingertips.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="gap-2">
                    Start Using CALF ONE
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Currently tracking: <span className="font-semibold text-primary">115 outlets</span>,{' '}
                <span className="font-semibold text-primary">48,521 customers</span>,{' '}
                <span className="font-semibold text-primary">105 vehicles</span>
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </MainLayout>
  );
}
