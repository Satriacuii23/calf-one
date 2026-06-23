'use client';

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
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const currentState = [
  { icon: Database, title: 'Data Scattered', description: 'Data spread across multiple systems' },
  { icon: Clock, title: 'Slow Decisions', description: 'Manual compilation takes hours' },
  { icon: Eye, title: 'No Single Source', description: 'Different teams have different numbers' },
  { icon: Target, title: 'Reactive Management', description: 'Finding problems too late' },
];

const futureState = [
  { icon: Brain, title: 'One Intelligence', description: 'AI-powered unified insights' },
  { icon: TrendingUp, title: 'Faster Decisions', description: 'Real-time dashboards' },
  { icon: Eye, title: 'One Source', description: 'Everyone sees same data' },
  { icon: Zap, title: 'Proactive Management', description: 'AI predicts issues early' },
];

const businessImpact = [
  { metric: 'Decision Speed', current: '4 hours', target: '15 min', improvement: '93% faster' },
  { metric: 'Revenue Visibility', current: '24 hours', target: 'Real-time', improvement: '100%' },
  { metric: 'Cost Savings', current: '-', target: 'Rp 500M/year', improvement: 'AI opt' },
  { metric: 'Customer Retention', current: '78%', target: '92%', improvement: '+14%' },
];

const features = [
  { icon: TrendingUp, title: 'Revenue Intelligence', description: 'Real-time tracking with AI forecasts' },
  { icon: Eye, title: 'Outlet Command Center', description: 'Monitor all outlets in real-time' },
  { icon: Users, title: 'Customer Intelligence', description: 'Deep analytics with churn prediction' },
  { icon: Brain, title: 'AI Insights', description: 'Automated recommendations' },
  { icon: Target, title: 'Risk Center', description: 'Proactive risk monitoring' },
  { icon: Database, title: 'Expansion Planning', description: 'Data-driven location analysis' },
];

export default function WhyCalfOnePage() {
  return (
    <MainLayout title="Why CALF ONE?" subtitle="Executive Decision Platform for Kopi Calf">
      <div className="space-y-12">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30">
            <Coffee className="h-3 w-3 mr-1" />
            Executive Decision Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Every Decision.{' '}
            <span className="text-blue-600 dark:text-blue-400">One Dashboard.</span>{' '}
            Zero Guesswork.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            CALF ONE transforms how Kopi Calf leadership makes decisions.
            From scattered data to unified intelligence.
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
        </section>

        {/* Current vs Future */}
        <section className="grid gap-8 lg:grid-cols-2">
          <Card className="border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5">
            <div className="p-4 lg:p-6">
              <Badge variant="outline" className="mb-4 border-amber-300 text-amber-700 dark:border-amber-500/30 dark:text-amber-400">
                Current State
              </Badge>
              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <div className="space-y-4">
                {currentState.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-white dark:bg-card">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5">
            <div className="p-4 lg:p-6">
              <Badge variant="outline" className="mb-4 border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400">
                Future State
              </Badge>
              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <div className="space-y-4">
                {futureState.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-white dark:bg-card">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Business Impact */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Business Impact</h2>
            <p className="text-muted-foreground">Expected improvements</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {businessImpact.map((impact, index) => (
              <Card key={index}>
                <div className="p-4 lg:p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">{impact.metric}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground line-through">{impact.current}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{impact.target}</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30">
                    {impact.improvement}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Platform Capabilities</h2>
            <p className="text-muted-foreground">Six pillars of executive intelligence</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="p-4 lg:p-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Connected Ecosystem */}
        <Card className="bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/30">
          <div className="p-4 lg:p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Connected Ecosystem</h3>
                <p className="text-muted-foreground mb-6">
                  CALF ONE integrates with your existing systems. No more manual data entry.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['ESB POS Integration', 'Financial Systems', 'Customer Database', 'Supply Chain', 'Delivery Fleet', 'HR Systems'].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-500/20" />
                  <div className="absolute inset-8 rounded-full border-2 border-blue-300 dark:border-blue-500/30" />
                  <div className="absolute inset-16 rounded-full border-2 border-blue-400 dark:border-blue-500/40" />
                  <div className="absolute inset-24 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                    <Coffee className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card className="bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join Kopi Calf leadership in making faster, smarter decisions.
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
              Tracking: <span className="font-semibold text-blue-600 dark:text-blue-400">115 outlets</span>,{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">48,521 customers</span>,{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">105 vehicles</span>
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
