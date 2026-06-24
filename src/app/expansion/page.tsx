"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Progress , Input } from 'antd';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MapPin, TrendingUp, DollarSign, CalendarClock, Target, Compass, Building, Sparkles , Search } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useExpansionData } from '@/hooks/useDashboardModules';
import { useState, useMemo } from "react";

const { Title, Text } = Typography;

const STATUS_COLORS: Record<string, string> = {
  'approved': '#10b981',
  'negotiation': '#f59e0b',
  'survey': '#3b82f6',
  'rejected': '#ef4444'
};

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function ExpansionPage() {
  const { proposals, isLoading } = useExpansionData();

  const [searchText, setSearchText] = useState("");
  const filteredProposals = useMemo(() => proposals.filter((p: any) => (p.location_name || "").toLowerCase().includes(searchText.toLowerCase()) || (p.city || "").toLowerCase().includes(searchText.toLowerCase())), [proposals, searchText]);


  const expansionStats = useMemo(() => {
    if (!proposals.length) return { total: 0, totalInvestment: 0, avgROI: 0, topCity: '-', statusData: [], investmentData: [] };
    
    const total = proposals.length;
    let totalInvestment = 0;
    let totalROI = 0;
    
    const cityCount: Record<string, number> = {};
    const statusCount: Record<string, number> = {};

    const investmentData: any[] = [];

    proposals.forEach((p: any) => {
      const cost = Number(p.estimated_cost || 0);
      const roi = Number(p.projected_roi || 0);
      const city = p.city || 'Unknown';
      const status = p.status || 'survey';

      totalInvestment += cost;
      totalROI += roi;

      cityCount[city] = (cityCount[city] || 0) + 1;
      statusCount[status] = (statusCount[status] || 0) + 1;

      investmentData.push({
        name: p.location_name?.substring(0, 12) || 'Location',
        fullName: p.location_name,
        cost: cost,
        roi: roi
      });
    });

    const avgROI = total > 0 ? totalROI / total : 0;
    
    const topCity = Object.entries(cityCount).sort((a,b) => b[1] - a[1])[0]?.[0] || '-';

    const statusData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
      color: STATUS_COLORS[name.toLowerCase()] || '#94a3b8'
    })).sort((a, b) => b.value - a.value);

    // Sort investment data by cost
    investmentData.sort((a,b) => b.cost - a.cost);

    return { total, totalInvestment, avgROI, topCity, statusData, investmentData: investmentData.slice(0, 10) };
  }, [proposals]);

  const summaryInsight = useMemo(() => {
    if (!proposals.length) return "Gathering data to build expansion summary...";
    
    const totalM = (expansionStats.totalInvestment / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const approvedCount = expansionStats.statusData.find(s => s.name.toLowerCase() === 'approved')?.value || 0;
    
    return `The expansion plan includes a total investment of Rp ${totalM} Million for ${expansionStats.total} projected locations. The average projected ROI for all branch candidates is ${expansionStats.avgROI.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%. Currently, ${approvedCount} locations have entered the 'Approved' stage and the city of ${expansionStats.topCity} is the primary target area for Calf's expansion. Recommendation: Immediately execute the ${approvedCount} 'Approved' projects in ${expansionStats.topCity} and review locations with projected ROI below average.`;
  }, [proposals, expansionStats]);

  const kpiCards = [
    { label: 'Total Investment Pipeline', tooltip: 'Estimated total cost for all new branch proposals.', value: `Rp ${(expansionStats.totalInvestment / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`, icon: DollarSign, color: '#1F5EFF', bg: '#eff6ff', trend: '+2 Locations' },
    { label: 'Avg Projected ROI', tooltip: 'Average projected Return on Investment for all proposals.', value: `${expansionStats.avgROI.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`, icon: TrendingUp, color: '#10b981', bg: '#ecfdf5', trend: 'Highly Viable' },
    { label: 'Expansion Proposals', tooltip: 'Total number of locations currently on the radar.', value: expansionStats.total.toString(), icon: MapPin, color: '#f59e0b', bg: '#fffbeb', trend: 'Active' },
    { label: 'Primary Target City', tooltip: 'City with the highest number of expansion proposals.', value: expansionStats.topCity, icon: Compass, color: '#8b5cf6', bg: '#f5f3ff', trend: 'Strategic' },
  ];

  const columns = [
    { 
      title: 'Location Details', 
      dataIndex: 'location_name', 
      key: 'name', 
      render: (text: string, record: any, idx: number) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
            <Building size={14} color="#475569" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ color: '#0f172a' }}>{text}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.city || '-'}</Text>
          </div>
        </Space>
      ) 
    },
    { 
      title: 'Current Status', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => {
        const statusName = status || 'Survey';
        const tColor = STATUS_COLORS[statusName.toLowerCase()] || '#64748b';
        return (
          <div style={{ background: `${tColor}15`, color: tColor, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${tColor}30` }}>
            {statusName.toUpperCase()}
          </div>
        );
      }
    },
    { 
      title: 'Estimated Cost', 
      dataIndex: 'estimated_cost', 
      key: 'cost', 
      align: 'right' as const,
      render: (val: number) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 14, color: '#1F5EFF' }}>Rp {val?.toLocaleString('en-US') || 0}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>CAPEX</Text>
        </div>
      )
    },
    { 
      title: 'Projected ROI', 
      dataIndex: 'projected_roi', 
      key: 'roi', 
      align: 'right' as const, 
      render: (val: number) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 14, color: '#10b981' }}>{val?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) || 0}%</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Annual Return</Text>
        </div>
      ) 
    },
    { 
      title: 'Target Open Date', 
      dataIndex: 'target_open_date', 
      key: 'date', 
      align: 'right' as const, 
      render: (date: string) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 14, color: '#334155' }}>
            {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '-'}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>Timeline</Text>
        </div>
      ) 
    },
  ];

  return (
    <MainLayout title="Expansion Intelligence" subtitle="Tracking of new branch opening plans, investment projections, and location viability">
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
                      <span style={{ color: '#10b981', fontSize: 12, fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>indicator</Text>
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
            <Col xs={24} lg={16}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrendingUp size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Investment Cost vs Projected ROI</Title>
                    <Tooltip title="Comparison between estimated cost (CAPEX) and projected ROI percentage per location.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {expansionStats.investmentData.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={expansionStats.investmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" tickFormatter={(val) => `${val/1000000}M`} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => `${val}%`} stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          formatter={(val: any, name: any) => [name === 'cost' ? `Rp ${val.toLocaleString('en-US')}` : `${val}%`, name === 'cost' ? 'Est. Cost' : 'ROI']}
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                        <Bar yAxisId="left" dataKey="cost" fill="#1F5EFF" radius={[4, 4, 0, 0]} barSize={32} />
                        <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
            <Col xs={24} lg={8}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Target size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Pipeline Status</Title>
                    <Tooltip title="Proportion of status stages for all branch location candidates.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {expansionStats.statusData.length > 0 ? (
                  <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={expansionStats.statusData} 
                          innerRadius={70} 
                          outerRadius={100} 
                          paddingAngle={5} 
                          dataKey="value" 
                          stroke="none"
                        >
                          {expansionStats.statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val} Proposals`, 'Count']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                      {expansionStats.statusData.map(s => (
                        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.color }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>{s.name.charAt(0).toUpperCase() + s.name.slice(1)} ({s.value})</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Expansion Pipeline Directory</Title>
                <Tooltip title="Complete table of all branch expansion plans along with cost details and viability.">
                  <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                </Tooltip>
              </Space>
              <Input 
                placeholder="Search location or city..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#475569" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredProposals} 
              pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (t) => `Total ${t} locations` }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}
