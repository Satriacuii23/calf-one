"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Input } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Search, Sparkles, AlertOctagon, ShieldAlert, CheckCircle, BellRing, Flag } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useRiskAndInsightsData } from '@/hooks/useDashboardModules';
import { useState, useMemo } from "react";

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function RiskPage() {
  const { alerts, insights, isLoading } = useRiskAndInsightsData();

  const [searchText, setSearchText] = useState("");

  const filteredAlerts = useMemo(() => alerts.filter((a: any) => {
    return (a.title || '').toLowerCase().includes(searchText.toLowerCase()) || 
           (a.branches?.branch_name || '').toLowerCase().includes(searchText.toLowerCase());
  }), [alerts, searchText]);

  const riskStats = useMemo(() => {
    const total = alerts.length || 0;
    const active = alerts.filter((a: any) => !a.is_dismissed).length;
    const dismissed = total - active;
    const highSeverity = alerts.filter((a: any) => a.severity === 'high' && !a.is_dismissed).length;

    const severityCount: Record<string, number> = {};
    const typeCount: Record<string, number> = {};

    alerts.filter((a: any) => !a.is_dismissed).forEach((a: any) => {
      const sev = a.severity || 'low';
      const type = a.risk_type || 'General';
      severityCount[sev] = (severityCount[sev] || 0) + 1;
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    const severityData = Object.entries(severityCount).map(([name, value]) => ({
      name: name.toUpperCase(),
      value,
      color: name === 'high' ? '#ef4444' : name === 'medium' ? '#f59e0b' : '#3b82f6'
    }));

    const typeData = Object.entries(typeCount).map(([name, value]) => ({
      name, value
    })).sort((a,b) => b.value - a.value).slice(0, 5);

    return { total, active, dismissed, highSeverity, severityData, typeData };
  }, [alerts]);

  const summaryInsight = useMemo(() => {
    if (!alerts.length) return "Memuat analisis risiko...";
    const activeAlerts = alerts.filter((a: any) => !a.is_dismissed);
    const highRisk = activeAlerts.filter((a: any) => a.severity === 'high').length;
    
    if (highRisk > 0) {
      return `⚠️ Perhatian: Terdapat ${highRisk} insiden berisiko TINGGI yang membutuhkan tindakan segera. Rekomendasi: Tinjau dan delegasikan tim investigasi ke cabang terkait hari ini.`;
    } else if (activeAlerts.length > 0) {
      return `✅ Situasi terkendali. Terdapat ${activeAlerts.length} peringatan aktif dengan tingkat risiko rendah/menengah. Rekomendasi: Lakukan pemantauan berkala sesuai SOP standar.`;
    }
    return `✅ Tidak ada peringatan aktif saat ini. Operasional berjalan sangat aman. Rekomendasi: Lanjutkan strategi maintenance preventif Anda.`;
  }, [alerts]);

  const kpiCards = [
    { label: 'Active Alerts', tooltip: 'Jumlah ancaman atau anomali operasional yang belum diselesaikan.', value: riskStats.active, icon: BellRing, trend: 'Needs Review' },
    { label: 'High Severity', tooltip: 'Peringatan tingkat tinggi yang butuh tindakan instan.', value: riskStats.highSeverity, icon: ShieldAlert, trend: 'Critical' },
    { label: 'Dismissed', tooltip: 'Jumlah peringatan yang telah diselesaikan atau diabaikan.', value: riskStats.dismissed, icon: CheckCircle, trend: 'Resolved' },
    { label: 'Total Incidents', tooltip: 'Rekam jejak seluruh peringatan historis.', value: riskStats.total, icon: AlertOctagon, trend: 'Log' },
  ];

  const columns = [
    { 
      title: 'Timestamp', 
      dataIndex: 'created_at', 
      key: 'date',
      render: (val: string) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text strong style={{ fontSize: 13, color: '#334155' }}>{val ? new Date(val).toLocaleDateString('id-ID') : '-'}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{val ? new Date(val).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}</Text>
        </div>
      )
    },
    { 
      title: 'Location', 
      dataIndex: ['branches', 'branch_name'], 
      key: 'branch', 
      render: (t: string) => <Text strong style={{ color: '#0f172a' }}>{t || 'Headquarters'}</Text> 
    },
    { 
      title: 'Severity', 
      dataIndex: 'severity', 
      key: 'severity', 
      render: (s: string) => {
        const color = s === 'high' ? '#ef4444' : s === 'medium' ? '#f59e0b' : '#3b82f6';
        return (
          <div style={{ background: `${color}15`, color: color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${color}30` }}>
            {s ? s.toUpperCase() : 'UNKNOWN'}
          </div>
        );
      }
    },
    { 
      title: 'Risk Type', 
      dataIndex: 'risk_type', 
      key: 'type', 
      render: (t: string) => (
        <div style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: 6, display: 'inline-block', fontSize: 12, border: '1px solid #e2e8f0' }}>
          {t}
        </div>
      ) 
    },
    { 
      title: 'Alert Description', 
      dataIndex: 'title', 
      key: 'title', 
      render: (t: string) => <Text style={{ color: '#334155' }}>{t}</Text> 
    },
    { 
      title: 'Status', 
      key: 'status', 
      align: 'right' as const,
      render: (_: any, r: any) => {
        const color = r.is_dismissed ? '#94a3b8' : '#ef4444';
        return (
          <div style={{ background: `${color}15`, color: color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${color}30` }}>
            {r.is_dismissed ? 'DISMISSED' : 'ACTIVE'}
          </div>
        );
      }
    }
  ];

  const insightColumns = [
    { title: 'Category', dataIndex: 'insight_category', key: 'cat', render: (t: string) => <Text strong style={{ textTransform: 'capitalize' }}>{t?.replace('_', ' ')}</Text> },
    { title: 'Title', dataIndex: 'title', key: 'title', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Description & Recommendation', dataIndex: 'description', key: 'desc', render: (t: string) => <Text type="secondary">{t}</Text> },
    { title: 'Impact', dataIndex: 'expected_impact', key: 'impact', render: (t: string) => <Text style={{ color: t === 'High' ? '#ef4444' : t === 'Medium' ? '#f59e0b' : '#10b981' }}>{t}</Text> },
    { title: 'Date', dataIndex: 'created_at', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('id-ID') }
  ];

  return (
    <MainLayout title="Risk Center" subtitle="Pusat peringatan dini dan manajemen risiko operasional Calf">
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
                    <Title level={2} style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(kpi.value)}>{kpi.value}</Title>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: ['Critical', 'Needs Review'].includes(kpi.trend) ? '#ef4444' : '#10b981', fontSize: 12, fontWeight: 700, background: ['Critical', 'Needs Review'].includes(kpi.trend) ? '#fef2f2' : '#ecfdf5', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>indicator</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, color: '#0f172a', marginBottom: 4 }}>Calf Intelligence Summary</Title>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                {summaryInsight}
              </Text>
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={10}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldAlert size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Active Threat Levels</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {riskStats.severityData.length > 0 ? (
                  <div style={{ height: 260, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={riskStats.severityData} 
                          innerRadius={60} 
                          outerRadius={90} 
                          paddingAngle={5} 
                          dataKey="value" 
                          stroke="none"
                        >
                          {riskStats.severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val} Alerts`, 'Count']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                      {riskStats.severityData.map(s => (
                        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.color }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>{s.name} ({s.value})</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <Empty description="No active threats" />}
              </SectionContainer>
            </Col>
            <Col xs={24} lg={14}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Flag size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>Risk Type Distribution</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {riskStats.typeData.length > 0 ? (
                  <div style={{ height: 280, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riskStats.typeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <RechartsTooltip 
                          formatter={(val: any) => [val, 'Incidents']}
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                          cursor={{ fill: '#f8fafc' }}
                        />
                        <Bar dataKey="value" fill="#475569" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : <Empty description="No risk data" />}
              </SectionContainer>
            </Col>
          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertOctagon size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Incident Log Directory</Title>
                    <Tooltip title="Klik ikon menu untuk informasi lebih detail tentang metrik ini.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
              </Space>
              <Input 
                placeholder="Search alerts or branch..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#475569" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredAlerts} 
              pagination={{ pageSize: 5, showSizeChanger: true }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
              <Title level={4} style={{ margin: 0 }}>AI Automated Insights & Recommendations</Title>
            </div>
            <Table columns={insightColumns} dataSource={insights} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 600 }} style={{ padding: '0 24px 24px 24px' }} />
          </SectionContainer>
        </>
      )}
    </MainLayout>
  );
}
