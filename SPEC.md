ROLE

You are a Senior Product Designer, Principal Product Manager, Chief Data Officer, and Staff Frontend Engineer.

Your task is to design and generate a production-grade web application prototype called:

CALF ONE
Executive Command Center

for Kopi Calf.

The objective is to create a modern executive intelligence platform that allows Founder, Co-Founder, Directors, and Area Managers to understand the entire business in less than 60 seconds.

This is NOT a POS.
This is NOT a CRM.
This is NOT an ERP.

This is an Executive Decision Platform.

The design must feel like:
- Tesla Fleet Dashboard
- Stripe Analytics
- Linear
- Vercel Dashboard
- Palantir Foundry
- Datadog Executive Dashboard

Modern.
Minimal.
Premium.
Enterprise-grade.
Dark mode by default.

COMPANY PROFILE

Kopi Calf is a rapidly growing coffee chain in Indonesia.

Current scale:
- 115+ outlets
- 105+ operational vehicles
- Thousands of daily transactions
- Existing POS system: ESB POS
- Large customer database
- Multi-city operations

PRIMARY USERS

1. Founder
2. Co-Founder
3. CEO
4. COO
5. Finance Director
6. Area Manager

TECH STACK

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Lucide Icons
- Framer Motion

MAIN PAGE

Create a full executive dashboard.

The first screen should immediately answer:

1. How much money did we make today?
2. Is the company healthy?
3. Which outlet is performing best?
4. Which outlet needs attention?
5. Are customers growing?
6. Are there operational issues?
7. Are there risks?

SECTIONS

1. Executive Overview
2. Company Health Score
3. Revenue Intelligence
4. Outlet Intelligence
5. Customer Intelligence
6. Product Intelligence
7. Risk Center
8. Expansion Intelligence
9. Customer Experience
10. Executive Command Map
11. AI Insight Center

KPI

Revenue Today
Revenue MTD
Revenue YTD
Transactions Today
Active Customers
Company Health Score

RISK CENTER

Examples:
- Revenue dropped 18% at Outlet Bandung 2
- Stock milk critical at 7 outlets
- Complaint spike detected
- Transaction anomaly detected
- Vehicle downtime detected

AI INSIGHTS

Example:
Increase staffing at Bandung Dago outlet during 17:00-20:00.
Expected revenue increase +8.2%.

Launch win-back campaign to 14,821 churn-risk customers.
Potential recovery Rp 482,000,000.

SIDEBAR

Dashboard
Revenue Intelligence
Outlet Intelligence
Customer Intelligence
Product Intelligence
Risk Center
Expansion Intelligence
AI Insights
Settings

SPECIAL PAGE

Why CALF ONE?

Current State:
- Data scattered
- Slow decision making
- No single source of truth

Future State:
- One Data
- One Dashboard
- One Customer
- One Ecosystem

Business Impact:
- Faster Decisions
- Better Visibility
- Higher Revenue
- Better Retention
- AI Readiness

FINAL REQUIREMENTS

Generate realistic dummy data.
Responsive layout.
Dark mode.
Smooth animations.
Enterprise-grade design.
Boardroom-ready presentation quality.



# CALF ONE - Executive Command Center

## Concept & Vision

CALF ONE adalah **Executive Decision Platform** untuk Kopi Calf - bukan sekadar dashboard, tapi pusat komando untuk pengambilan keputusan strategis. Desainnya terinspirasi dari Tesla Fleet Dashboard, Stripe Analytics, dan Linear - memberikan kesan premium, modern, dan enterprise-grade. Setiap elemen dirancang untuk menjawab pertanyaan kritis executive dalam hitungan detik, bukan menit.

**Tagline**: "Every Decision. One Dashboard. Zero Guesswork."

---

## Design Language

### Aesthetic Direction
**Dark Executive Premium** - Deep space blacks dengan aksen cyan/teal yang sophisticated. Mengambil referensi dari Palantir Foundry dan Datadog Executive Dashboard - profesional, data-driven, dengan sentuhan futuristik yang tidak berlebihan.

### Color Palette
```css
--background: #0a0a0f          /* Deep space black */
--background-elevated: #12121a  /* Card backgrounds */
--background-hover: #1a1a24     /* Hover states */
--border: #1e1e2e               /* Subtle borders */
--border-active: #2d2d3d        /* Active borders */

--text-primary: #f4f4f5         /* Primary text */
--text-secondary: #a1a1aa       /* Secondary text */
--text-muted: #71717a           /* Muted text */

--accent-primary: #06b6d4       /* Cyan - primary accent */
--accent-secondary: #0891b2      /* Darker cyan */
--accent-glow: rgba(6, 182, 212, 0.15)  /* Glow effect */

--success: #22c55e              /* Green - positive */
--success-bg: rgba(34, 197, 94, 0.1)
--warning: #f59e0b              /* Amber - attention */
--warning-bg: rgba(245, 158, 11, 0.1)
--danger: #ef4444               /* Red - critical */
--danger-bg: rgba(239, 68, 68, 0.1)
--info: #3b82f6                 /* Blue - informational */
--info-bg: rgba(59, 130, 246, 0.1)
```

### Typography
- **Headings**: Inter (700, 600) - Clean, professional, excellent readability
- **Body**: Inter (400, 500) - Consistent with headings
- **Data/Numbers**: JetBrains Mono (500) - Monospace for financial data
- **Fallback**: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Card padding: 24px
- Section gaps: 32px
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)
- Max content width: 1440px

### Motion Philosophy
- **Entrance**: Fade up dengan stagger 50ms, duration 400ms, ease-out
- **Hover**: Scale 1.02, shadow lift, 200ms ease
- **Data updates**: Number counting animation, 600ms
- **Charts**: Draw animation dari kiri ke kanan, 800ms
- **Page transitions**: Crossfade 300ms

### Visual Assets
- **Icons**: Lucide React - consistent 24px, stroke 1.5
- **Charts**: Recharts dengan custom theming
- **Decorative**: Subtle gradient overlays, glow effects pada key metrics
- **Empty states**: Custom SVG illustrations

---

## Layout & Structure

### Overall Architecture
```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main Content Area              │
│  ─────────────────────── │  ─────────────────────────────── │
│  Logo + Brand           │  Header (Breadcrumb + Actions)  │
│  Navigation Items       │  ─────────────────────────────── │
│  ─────────────────────  │  Content Sections               │
│  Quick Stats            │  (Scrollable)                   │
│  ─────────────────────  │                                 │
│  User Profile           │                                 │
└─────────────────────────────────────────────────────────────┘
```

### Page Structure

#### 1. Dashboard (Main Page)
- **Hero Section**: Large KPI cards - Revenue Today, Health Score, Active Customers
- **Quick Insights**: 3-4 AI-generated insight cards
- **Revenue Trend**: Area chart showing today vs yesterday vs last week
- **Outlet Performance**: Top 5 / Bottom 5 outlets
- **Risk Center Preview**: Latest 3-5 alerts
- **Customer Growth**: Line chart with trend

#### 2. Revenue Intelligence
- Revenue overview cards (Today, MTD, YTD, Growth %)
- Revenue by outlet (table + chart)
- Revenue by time period (hourly, daily, weekly, monthly)
- Revenue by payment method
- Growth trend analysis

#### 3. Outlet Intelligence
- All outlets grid with status indicators
- Performance ranking
- Individual outlet detail modal
- Location map (placeholder for future integration)
- Operational metrics per outlet

#### 4. Customer Intelligence
- Customer segments pie chart
- New vs returning customers
- Customer lifetime value distribution
- Churn risk indicators
- Top customers

#### 5. Product Intelligence
- Top selling products
- Category breakdown
- Price point analysis
- Product performance trends

#### 6. Risk Center
- Risk cards with severity indicators
- Risk categories: Revenue, Operations, Inventory, Customer
- Action buttons for each risk
- Historical risk log

#### 7. Expansion Intelligence
- Current vs target outlets
- City expansion map (Indonesia)
- Revenue potential by location
- Investment metrics

#### 8. AI Insights
- Insight cards with confidence scores
- Action recommendations
- Expected impact quantification
- Historical insights

#### 9. Why CALF ONE?
- Current vs Future state comparison
- Business impact metrics
- Feature showcase
- Implementation roadmap

---

## Features & Interactions

### KPI Cards
- **Click**: Navigate to detailed view
- **Hover**: Subtle glow effect, show trend indicator
- **Data**: Animate numbers on load (count up effect)
- **Status**: Color-coded based on performance vs target

### Charts
- **Hover**: Tooltip with exact values
- **Click on data point**: Show detailed breakdown
- **Legend**: Clickable to toggle series visibility
- **Responsive**: Resize gracefully on smaller screens

### Risk Cards
- **Severity levels**: Critical (red), Warning (amber), Info (blue)
- **Hover**: Elevate card, show "View Details" button
- **Click**: Expand to show full details and suggested actions
- **Dismiss**: Swipe or click X (with confirmation for critical risks)

### Navigation
- **Active state**: Background highlight, left border accent
- **Hover**: Subtle background change
- **Collapsed mode**: Icon-only sidebar for more content space
- **Mobile**: Bottom navigation bar

### Tables
- **Sortable columns**: Click header to sort
- **Row hover**: Background highlight
- **Row click**: Expand or navigate to detail
- **Pagination**: Infinite scroll or page numbers

### Empty States
- Custom illustrations
- Helpful message explaining why empty
- Call to action button if applicable

### Loading States
- Skeleton screens matching content shape
- Subtle pulse animation
- Progressive loading for charts

### Error States
- Clear error message
- Retry button
- Contact support option

---

## Component Inventory

### Navigation Components

#### Sidebar
- Logo area with "CALF ONE" branding
- Navigation items with icons
- Collapse/expand toggle
- Quick stats summary at bottom
- User profile section

#### Header
- Breadcrumb navigation
- Date/time display
- Search (global)
- Notifications bell
- Profile dropdown

### Data Display Components

#### KPI Card
- Icon with colored background
- Metric label
- Large number display (monospace)
- Trend indicator (up/down arrow + percentage)
- Sparkline mini chart (optional)
- States: default, loading, error

#### Risk Card
- Severity indicator (colored left border)
- Risk title
- Risk description
- Outlet/location tag
- Timestamp
- Action button
- States: default, expanded, dismissed

#### Chart Card
- Title
- Time range selector
- Chart area
- Legend
- States: loading, empty, error

#### Data Table
- Column headers (sortable)
- Row data
- Pagination
- Search/filter
- States: loading, empty, error

#### Insight Card
- AI icon badge
- Insight title
- Description
- Confidence score
- Expected impact
- Action button

### Layout Components

#### Card
- Elevated background
- Optional header
- Content area
- Optional footer
- States: default, hover, loading

#### Grid
- Responsive columns
- Gap management
- Breakpoint utilities

#### Section
- Title
- Optional subtitle
- Content container

### Feedback Components

#### Toast/Notification
- Icon + message
- Auto-dismiss (5s)
- Manual dismiss
- Types: success, error, warning, info

#### Modal
- Overlay with blur
- Header with close button
- Content area
- Footer with actions
- Escape to close

#### Badge
- Colored background
- Text label
- Optional icon
- Sizes: sm, md

### Form Components (for Settings)

#### Button
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md, lg
- States: default, hover, active, disabled, loading

#### Input
- Label
- Input field
- Helper text
- Error message
- States: default, focus, error, disabled

#### Select
- Dropdown with options
- Search capability (for long lists)
- Multi-select variant

---

## Technical Approach

### Framework & Build
- **Next.js 15** with App Router
- **React 19** with Server Components where applicable
- **TypeScript** strict mode
- **Tailwind CSS** for styling
- **shadcn/ui** as component foundation

### Key Libraries
```json
{
  "next": "15.x",
  "react": "19.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "@radix-ui/react-*": "latest",
  "recharts": "2.x",
  "lucide-react": "latest",
  "framer-motion": "11.x",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Dashboard (main)
│   ├── globals.css             # Global styles + CSS variables
│   ├── revenue/
│   │   └── page.tsx
│   ├── outlets/
│   │   └── page.tsx
│   ├── customers/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── risk/
│   │   └── page.tsx
│   ├── expansion/
│   │   └── page.tsx
│   ├── insights/
│   │   └── page.tsx
│   └── why-calf-one/
│       └── page.tsx
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── main-layout.tsx
│   ├── dashboard/
│   │   ├── kpi-card.tsx
│   │   ├── revenue-chart.tsx
│   │   ├── outlet-grid.tsx
│   │   ├── risk-alerts.tsx
│   │   └── ai-insights.tsx
│   └── charts/
│       ├── area-chart.tsx
│       ├── bar-chart.tsx
│       ├── pie-chart.tsx
│       └── line-chart.tsx
├── lib/
│   ├── utils.ts               # Utility functions
│   └── data.ts               # Mock data generators
├── types/
│   └── index.ts              # TypeScript interfaces
└── hooks/
    └── use-animation.ts      # Animation utilities
```

### Data Strategy
- All data is realistic mock data generated at build time
- Data structures match real API response shapes (for future integration)
- Types are comprehensive and typed

### Animation Strategy
- Framer Motion for complex animations
- CSS transitions for simple hover effects
- Recharts built-in animations for charts

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1440px
- Large: > 1440px

---

## Data Models

### KPIs
```typescript
interface KPIData {
  revenueToday: number;
  revenueMTD: number;
  revenueYTD: number;
  transactionsToday: number;
  activeCustomers: number;
  healthScore: number;
  revenueGrowth: number;
  customerGrowth: number;
}
```

### Outlet
```typescript
interface Outlet {
  id: string;
  name: string;
  city: string;
  status: 'excellent' | 'good' | 'needs-attention' | 'critical';
  revenueToday: number;
  revenueTarget: number;
  transactions: number;
  rating: number;
  lastUpdated: string;
}
```

### Risk
```typescript
interface Risk {
  id: string;
  type: 'revenue' | 'operations' | 'inventory' | 'customer' | 'vehicle';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  outlet?: string;
  timestamp: string;
  actionable: boolean;
}
```

### AI Insight
```typescript
interface AIInsight {
  id: string;
  category: string;
  title: string;
  description: string;
  confidence: number;
  expectedImpact: string;
  potentialRevenue?: number;
  actionItems: string[];
  timestamp: string;
}
```

### Customer
```typescript
interface Customer {
  id: string;
  name: string;
  totalTransactions: number;
  totalSpent: number;
  lastVisit: string;
  segment: 'vip' | 'regular' | 'churn-risk' | 'new';
  lifetimeValue: number;
}
```

---

## Quality Checklist

- [ ] All navigation links work
- [ ] All KPI cards display data
- [ ] Charts render with animations
- [ ] Risk cards have proper severity styling
- [ ] AI insights have confidence indicators
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Smooth animations (60fps)
- [ ] Dark mode throughout
- [ ] Realistic Indonesian data (Rupiah, city names)
