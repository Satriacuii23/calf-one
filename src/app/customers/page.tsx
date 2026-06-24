"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Progress, Input, Tabs } from 'antd';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Users, Award, Crown, CalendarCheck, Sparkles, Star, Search, MapPin, Bike, ShoppingBag } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { useCustomerCareData, useSocialData } from '@/hooks/useDashboardModules';
import { useState, useMemo } from "react";

const { Title, Text } = Typography;

const TIER_COLORS: Record<string, string> = {
  'Gold': '#f59e0b',
  'Silver': '#94a3b8',
  'Bronze': '#b45309',
  'Basic': '#1F5EFF'
};

// Custom Container Component
const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

// External Reviews Mock Data
const MOCK_GOOGLE_REVIEWS = [
  { id: 1, outlet: 'HQ Sudirman', name: 'Budi Santoso', rating: 5, comment: 'Tempatnya cozy banget buat WFC. Kopinya konsisten enak, barista ramah.', date: '2026-06-20' },
  { id: 2, outlet: 'Senopati', name: 'Andi Wijaya', rating: 4, comment: 'Kopinya mantap, tapi parkirannya agak susah kalau bawa mobil karena sempit.', date: '2026-06-21' },
  { id: 3, outlet: 'Kelapa Gading', name: 'Siti Aminah', rating: 5, comment: 'Pelayanan cepat, tempatnya bersih. Selalu pesan Aren Latte kalau kesini.', date: '2026-06-22' },
  { id: 4, outlet: 'Menteng', name: 'Reza Rahardian', rating: 3, comment: 'AC nya kurang dingin pas siang hari, mungkin bisa diperbaiki. Kopi oke.', date: '2026-06-19' },
  { id: 5, outlet: 'Kuningan', name: 'Dian Sastro', rating: 5, comment: 'Suka banget sama ambiance outdoor-nya pas sore. Pastry nya fresh.', date: '2026-06-23' },
  { id: 6, outlet: 'HQ Sudirman', name: 'Hendra', rating: 4, comment: 'Kopinya enak tapi antrian lumayan panjang kalau jam makan siang.', date: '2026-06-18' }
];

const MOCK_GOFOOD_REVIEWS = [
  { id: 1, outlet: 'Senopati', name: 'Kevin', rating: 5, comment: 'Pengiriman cepat, packaging super aman pakai double seal. Kopi gak tumpah.', date: '2026-06-24' },
  { id: 2, outlet: 'Kelapa Gading', name: 'Ayu', rating: 4, comment: 'Rasa kopi enak, cuma es batunya udah lumayan cair pas sampai.', date: '2026-06-23' },
  { id: 3, outlet: 'Kuningan', name: 'Riko', rating: 5, comment: 'Mantap ada promo diskon ongkir. Kualitas kopi Calf One selalu juara.', date: '2026-06-22' },
  { id: 4, outlet: 'HQ Sudirman', name: 'Nadia', rating: 2, comment: 'Pesanan agak lama disiapkan dari restonya, driver nunggu lama.', date: '2026-06-21' },
  { id: 5, outlet: 'Menteng', name: 'Fariz', rating: 5, comment: 'Sesuai pesanan (less sugar). Packaging rapi banget.', date: '2026-06-20' },
  { id: 6, outlet: 'Senopati', name: 'Tika', rating: 5, comment: 'Rasa kopinya pas banget buat naikin mood kerja pagi.', date: '2026-06-19' }
];

const MOCK_SHOPEE_REVIEWS = [
  { id: 1, outlet: 'HQ Sudirman', name: 'Cinta', rating: 5, comment: 'Dapat flash sale, harganya jadi murah banget! Kualitas tetap mantap.', date: '2026-06-24' },
  { id: 2, outlet: 'Menteng', name: 'Dimas', rating: 5, comment: 'Voucher shopeefood nya lumayan. Es Kopi Susu Arennya the best.', date: '2026-06-23' },
  { id: 3, outlet: 'Kuningan', name: 'Eka', rating: 3, comment: 'Pesan croffle tapi yang datang agak keras, mungkin kelamaan di jalan.', date: '2026-06-22' },
  { id: 4, outlet: 'Kelapa Gading', name: 'Fikri', rating: 5, comment: 'Barista notes nya dibaca dengan baik (extra shot espresso). Keren.', date: '2026-06-21' },
  { id: 5, outlet: 'Senopati', name: 'Gisel', rating: 4, comment: 'Rasa mantap, cuma tadi drivernya sempat kesasar cari lokasi titik map.', date: '2026-06-20' },
  { id: 6, outlet: 'HQ Sudirman', name: 'Bagas', rating: 5, comment: 'Super recommended, tiap hari selalu repeat order disini.', date: '2026-06-19' }
];

export default function CustomerIntelligencePage() {
  const { members, vouchers, points, campaigns, referrals, isLoading: isIntelLoading } = useIntelligenceData();
  const { complaints, isLoading: isCareLoading } = useCustomerCareData();
  const { sentiments, isLoading: isSocialLoading } = useSocialData();
  const isLoading = isIntelLoading || isCareLoading || isSocialLoading;

  const customerStats = useMemo(() => {
    if (!members.length) return { total: 0, active: 0, avgCLV: 0, avgPoints: 0, tierData: [], topTierPct: 0 };
    
    const total = members.length;
    const active = members.filter(m => Number(m.total_transactions) > 0).length;
    const totalSpentAll = members.reduce((sum, m) => sum + Number(m.total_spent || 0), 0);
    const totalPointsAll = members.reduce((sum, m) => sum + Number(m.member_points || 0), 0);
    
    const avgCLV = total > 0 ? totalSpentAll / total : 0;
    const avgPoints = total > 0 ? totalPointsAll / total : 0;

    const tiers: Record<string, number> = {};
    members.forEach(m => {
      const tier = m.member_tier || 'Basic';
      tiers[tier] = (tiers[tier] || 0) + 1;
    });

    const tierData = Object.entries(tiers).map(([name, value]) => ({
      name,
      value,
      color: TIER_COLORS[name] || '#1F5EFF'
    })).sort((a, b) => b.value - a.value);

    const topTierPct = total > 0 ? ((tiers['Gold'] || 0) / total) * 100 : 0;

    return { total, active, avgCLV, avgPoints, tierData, topTierPct };
  }, [members]);

  const [searchText, setSearchText] = useState("");
  const filteredMembers = useMemo(() => members.filter((m: any) => (m.member_name || "").toLowerCase().includes(searchText.toLowerCase()) || (m.member_code || "").toLowerCase().includes(searchText.toLowerCase())), [members, searchText]);

  const topSpenders = useMemo(() => {
    return [...members].sort((a,b) => Number(b.total_spent || 0) - Number(a.total_spent || 0)).slice(0, 5);
  }, [members]);

  // Dynamic Summary
  const summaryInsight = useMemo(() => {
    if (!members.length) return "Mengumpulkan data untuk membuat ringkasan...";
    
    const topSpenderName = topSpenders[0]?.member_name || '-';
    const topTierName = customerStats.tierData[0]?.name || 'Basic';
    
    return `Data menunjukkan terdapat ${customerStats.total.toLocaleString('id-ID')} anggota terdaftar, dengan tingkat aktivitas mencapai ${customerStats.active.toLocaleString('id-ID')} anggota bertransaksi. Distribusi pelanggan didominasi oleh kelas ${topTierName}, sementara pelanggan dengan nilai loyalitas (Lifetime Value) tertinggi dipegang oleh ${topSpenderName}. Rekomendasi: Berikan penawaran eksklusif kepada pelanggan kelas ${topTierName} dan manfaatkan loyalitas ${topSpenderName} sebagai duta promosi lokal (*brand ambassador*).`;
  }, [members, customerStats, topSpenders]);

  const kpiCards = [
    { label: 'Total Members', tooltip: 'Jumlah total pelanggan yang terdaftar sebagai member loyalti.', value: customerStats.total.toLocaleString('id-ID'), icon: Users, color: '#1F5EFF', bg: '#eff6ff', trend: '+12.5%' },
    { label: 'Avg Spend / Member', tooltip: 'Rata-rata nominal uang yang dihabiskan satu member.', value: `Rp ${Math.round(customerStats.avgCLV).toLocaleString('id-ID')}`, icon: Award, color: '#f59e0b', bg: '#fffbeb', trend: '+5.2%' },
    { label: 'Top Tier (Gold)', tooltip: 'Persentase member di tingkat Gold/Tertinggi.', value: `${customerStats.topTierPct.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`, icon: Crown, color: '#14b8a6', bg: '#f0fdfa', trend: '+2.1%' },
    { label: 'Active This Month', tooltip: 'Anggota yang melakukan transaksi dalam 30 hari terakhir.', value: customerStats.active.toLocaleString('id-ID'), icon: CalendarCheck, color: '#8b5cf6', bg: '#f5f3ff', trend: '+8.4%' },
  ];

  const columns = [
    { 
      title: 'Member Details', 
      dataIndex: 'member_name', 
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
            <Users size={14} color="#475569" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ color: '#0f172a' }}>{text || 'Unknown'}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.member_code}</Text>
          </div>
        </Space>
      )
    },
    { 
      title: 'Tier', 
      dataIndex: 'member_tier', 
      key: 'tier',
      render: (tier: string) => {
        const t = tier || 'Basic';
        return (
          <div style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: '1px solid #e2e8f0' }}>
            {t.toUpperCase()}
          </div>
        );
      }
    },
    { 
      title: 'Total Spent', 
      dataIndex: 'total_spent', 
      key: 'spent', 
      align: 'right' as const, 
      render: (val: number) => <Text strong style={{ color: '#0f172a' }}>Rp {Number(val || 0).toLocaleString('id-ID')}</Text> 
    },
    { 
      title: 'Transactions', 
      dataIndex: 'total_transactions', 
      key: 'trx', 
      align: 'right' as const,
      render: (val: number) => <Text>{val || 0}x</Text>
    },
    { 
      title: 'Points Balance', 
      dataIndex: 'member_points', 
      key: 'points', 
      align: 'right' as const,
      render: (val: number) => <Text strong style={{ color: '#8b5cf6' }}>{val?.toLocaleString('id-ID') || 0} pts</Text>
    }
  ];

  const voucherColumns = [
    { title: 'Voucher Code', dataIndex: 'voucher_code', key: 'code', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Member', dataIndex: ['members', 'member_name'], key: 'member' },
    { title: 'Value', dataIndex: 'discount_value', key: 'val', render: (v: number) => v > 100 ? `Rp ${v.toLocaleString('id-ID')}` : `${v}%` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => {
        const color = t === 'Active' ? '#10b981' : t === 'Used' ? '#64748b' : '#ef4444';
        const bg = t === 'Active' ? '#ecfdf5' : t === 'Used' ? '#f1f5f9' : '#fef2f2';
        return <div style={{ background: bg, color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t}</div>;
      }
    },
    { title: 'Expiry', dataIndex: 'expiry_date', key: 'exp', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  const pointColumns = [
    { title: 'Member', dataIndex: 'member_code', key: 'member', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Type', dataIndex: 'transaction_type', key: 'type', render: (t: string) => <Text strong style={{ color: t==='Earn'?'#10b981':'#f59e0b'}}>{t}</Text> },
    { title: 'Points', dataIndex: 'points', key: 'pts', align: 'right' as const, render: (v: number) => <Text strong style={{ color: '#8b5cf6' }}>{v > 0 ? `+${v}` : v}</Text> },
    { title: 'Date', dataIndex: 'created_at', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  const campaignColumns = [
    { title: 'Campaign Name', dataIndex: 'campaign_name', key: 'name', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Channel', dataIndex: 'channel', key: 'chan', render: (t: string) => <Text style={{ textTransform: 'capitalize' }}>{t?.replace('_', ' ')}</Text> },
    { title: 'Conversion', dataIndex: 'conversion_count', key: 'conv', align: 'right' as const },
    { title: 'Revenue', dataIndex: 'revenue_generated', key: 'rev', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => <div style={{ background: t === 'active' ? '#ecfdf5' : '#f1f5f9', color: t === 'active' ? '#10b981' : '#64748b', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t.toUpperCase()}</div> }
  ];

  const referralColumns = [
    { title: 'Referrer', dataIndex: 'referrer_member_code', key: 'ref' },
    { title: 'Referred', dataIndex: 'referred_member_code', key: 'new' },
    { title: 'Reward Value', dataIndex: 'reward_value', key: 'val', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('id-ID')}` },
    { title: 'Date', dataIndex: 'referral_date', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  const complaintColumns = [
    { title: 'Customer', dataIndex: ['members', 'member_name'], key: 'member', render: (t: string) => <Text strong>{t || 'Guest'}</Text> },
    { title: 'Category', dataIndex: 'issue_type', key: 'cat' },
    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => {
        const color = t?.toLowerCase() === 'resolved' ? '#10b981' : t?.toLowerCase() === 'in progress' ? '#f59e0b' : '#ef4444';
        const bg = t?.toLowerCase() === 'resolved' ? '#ecfdf5' : t?.toLowerCase() === 'in progress' ? '#fffbeb' : '#fef2f2';
        return <div style={{ background: bg, color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t?.toUpperCase()}</div>;
      }
    },
    { title: 'Date', dataIndex: 'created_at', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  const sentimentColumns = [
    { title: 'Platform', dataIndex: 'platform', key: 'plat', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Sentiment', dataIndex: 'sentiment', key: 'score', render: (v: string) => {
        const color = v === 'positive' ? '#10b981' : v === 'negative' ? '#ef4444' : '#f59e0b';
        const bg = v === 'positive' ? '#ecfdf5' : v === 'negative' ? '#fef2f2' : '#fffbeb';
        return <div style={{ background: bg, color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{v.charAt(0).toUpperCase() + v.slice(1)}</div>;
      }
    },
    { title: 'Content', dataIndex: 'comment', key: 'content', render: (t: string) => <Text type="secondary">{t?.substring(0, 60)}...</Text> },
    { title: 'Date', dataIndex: 'post_date', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  const externalReviewColumns = [
    { title: 'Outlet', dataIndex: 'outlet', key: 'outlet', render: (t: string) => <Text strong style={{ color: '#1F5EFF' }}>{t}</Text> },
    { title: 'Customer', dataIndex: 'name', key: 'name', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (v: number) => (
        <Space size={2}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < v ? "#475569" : "transparent"} color={i < v ? "#475569" : "#cbd5e1"} />
          ))}
        </Space>
      ) 
    },
    { title: 'Review', dataIndex: 'comment', key: 'comment', render: (t: string) => <Text style={{ fontStyle: 'italic', color: '#475569' }}>"{t}"</Text> },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }
  ];
  return (
    <MainLayout title="Customer Intelligence" subtitle="Analisis perilaku pelanggan, keanggotaan, dan retensi">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 32, padding: '8px 0 24px 0', borderBottom: '1px solid #f1f5f9' }}>
            <Row gutter={[24, 24]}>
              {kpiCards.map((kpi) => (
                <Col xs={24} sm={12} lg={6} key={kpi.label}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <kpi.icon size={16} color="#475569" />
                      </div>
                      <Text type="secondary" style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>{kpi.label}</Text>
                      <Tooltip title={kpi.tooltip}>
                        <InfoCircleOutlined style={{ fontSize: 13, color: '#cbd5e1', cursor: 'help' }} />
                      </Tooltip>
                    </div>
                    <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={kpi.value}>{kpi.value}</Title>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: kpi.trend.startsWith('+') ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 700, background: kpi.trend.startsWith('+') ? '#ecfdf5' : '#fef2f2', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>vs last month</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Smart Summary */}
          <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, color: '#0f172a', marginBottom: 4 }}>Calf Intelligence Summary</Title>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                {summaryInsight}
              </Text>
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Crown size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Membership Tier Distribution</Title>
                    <Tooltip title="Proporsi tingkat (Tier) yang dipegang oleh seluruh pelanggan.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {customerStats.tierData.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={customerStats.tierData} 
                          innerRadius={80} 
                          outerRadius={100} 
                          paddingAngle={2} 
                          dataKey="value" 
                          stroke="none"
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toLocaleString('id-ID', { maximumFractionDigits: 0 })}%`}
                          labelLine={false}
                        >
                          {customerStats.tierData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val.toLocaleString('id-ID')} Members`, 'Total']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Top 5 Members (by Spending)</Title>
                    <Tooltip title="Pelanggan teratas berdasarkan total pembelanjaan seumur hidup.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {topSpenders.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
                    {topSpenders.map((member, idx) => {
                      const maxVal = Number(topSpenders[0].total_spent || 1);
                      const val = Number(member.total_spent || 0);
                      const percent = (val / maxVal) * 100;
                      return (
                        <div key={member.member_code || idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text strong style={{ color: '#334155', fontSize: 13 }}>{idx + 1}. {member.member_name}</Text>
                            <Text strong style={{ color: '#0f172a', fontSize: 13 }}>Rp {val.toLocaleString('id-ID')}</Text>
                          </div>
                          <Progress percent={percent} showInfo={false} strokeColor="#8b5cf6" railColor="#f5f3ff" size="small" />
                        </div>
                      );
                    })}
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Customer Leaderboard</Title>
                <Tooltip title="Tabel lengkap profil pelanggan berserta tingkat loyalti mereka.">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Input 
                placeholder="Search customer name or ID..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#475569" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredMembers} 
              pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t) => `Total ${t} members` }}
              size="middle"
              rowKey="member_code"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>

          <Row gutter={[24, 24]} style={{ marginBottom: 24, marginTop: 24 }}>
            <Col xs={24} lg={12}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Voucher & Coupon Activity</Title>
                </div>
                <Table columns={voucherColumns} dataSource={vouchers} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Point Transactions Ledger</Title>
                </div>
                <Table columns={pointColumns} dataSource={points} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} />
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
              <Title level={4} style={{ margin: 0 }}>Customer Complaints & Feedback</Title>
            </div>
            <Table columns={complaintColumns} dataSource={complaints} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
          </SectionContainer>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
              <Title level={4} style={{ margin: 0 }}>Social Media Sentiments & Reviews</Title>
            </div>
            <Table columns={sentimentColumns} dataSource={sentiments} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
          </SectionContainer>

          <Row gutter={[24, 24]} style={{ marginBottom: 24, marginTop: 24 }}>
            <Col xs={24} lg={12}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Marketing Campaigns ROI</Title>
                </div>
                <Table columns={campaignColumns} dataSource={campaigns} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>Referral Conversions</Title>
                </div>
                <Table columns={referralColumns} dataSource={referrals} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} />
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Star size={24} color="#475569" />
              <Title level={4} style={{ margin: 0 }}>External Platform Reviews</Title>
            </div>
            <div style={{ padding: '0 24px 24px 24px' }}>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: '1',
                    label: <Space><MapPin size={16} /> Google Maps</Space>,
                    children: <Table columns={externalReviewColumns} dataSource={MOCK_GOOGLE_REVIEWS} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 800 }} />
                  },
                  {
                    key: '2',
                    label: <Space><Bike size={16} /> GoFood</Space>,
                    children: <Table columns={externalReviewColumns} dataSource={MOCK_GOFOOD_REVIEWS} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 800 }} />
                  },
                  {
                    key: '3',
                    label: <Space><ShoppingBag size={16} /> ShopeeFood</Space>,
                    children: <Table columns={externalReviewColumns} dataSource={MOCK_SHOPEE_REVIEWS} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 800 }} />
                  }
                ]}
              />
            </div>
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}
