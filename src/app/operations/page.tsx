"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Row, Col, Typography, Table, Space, Spin, Empty, Tooltip, Progress, Input, Button } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ActivitySquare, Video, Wifi, PackageMinus, Info, Search, Sparkles, Building2, Server, ServerCrash, AlertTriangle } from 'lucide-react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useOperationsData } from '@/hooks/useDashboardModules';
import { useState, useMemo } from "react";
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const { Title, Text } = Typography;

const SectionContainer = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, ...style }}>
    {children}
  </div>
);

export default function OperationsPage() {
  const { infrastructures, branches, shifts, attendances, isLoading } = useOperationsData();

  const [searchText, setSearchText] = useState("");
  const [cctvStreams, setCctvStreams] = useState<any[]>([
    { title: "HQ Sudirman - Area Depan", videoId: "1EiC9bvVGnk" },
    { title: "Senopati - Main Entrance", videoId: "1EiC9bvVGnk" },
    { title: "Kelapa Gading - Drive Thru", videoId: "1EiC9bvVGnk" },
    { title: "Menteng - Outdoor Seating", videoId: "1EiC9bvVGnk" },
    { title: "Kuningan - Parking Area", videoId: "1EiC9bvVGnk" }
  ]);
  const [activeBranchIndex, setActiveBranchIndex] = useState<number>(0);

  // We use static continuous live streams (YouTube Live 24/7 Cams) to prevent looping
  // and provide a true real-time surveillance feel.

  const filteredInfra = useMemo(() => infrastructures.filter((i: any) => {
    const branchName = i.branches?.branch_name || '';
    return branchName.toLowerCase().includes(searchText.toLowerCase());
  }), [infrastructures, searchText]);

  const opsStats = useMemo(() => {
    const totalBranches = branches.length || 0;
    const cctvOnline = infrastructures.filter((i: any) => i.cctv_status === 'online').length;
    const internetOnline = infrastructures.filter((i: any) => i.internet_status === 'online').length;
    
    // Status distribution
    const cctvDist = [
      { name: 'Online', value: cctvOnline, color: '#10b981' },
      { name: 'Offline/Warning', value: infrastructures.length - cctvOnline, color: '#ef4444' }
    ];

    return { totalBranches, cctvOnline, internetOnline, cctvDist };
  }, [infrastructures, branches]);

  const summaryInsight = useMemo(() => {
    if (!infrastructures.length) return "Gathering operational data...";
    const infraHealth = infrastructures.length > 0 ? ((opsStats.cctvOnline / infrastructures.length) * 100).toLocaleString('en-US', { maximumFractionDigits: 0 }) : 0;
    return `The system is monitoring operations across ${opsStats.totalBranches} active branches. Currently, infrastructure health (CCTV) is at ${infraHealth}%. Recommendation: Dispatch maintenance technicians to branches with infrastructure issues and ensure cashier attendance is monitored.`;
  }, [infrastructures, opsStats]);

  const kpiCards = [
    { label: 'Active Branches', tooltip: 'Total number of branches currently active and operating.', value: opsStats.totalBranches, icon: ActivitySquare, trend: 'Stable' },
    { label: 'CCTV Online', tooltip: 'Ratio of connected and active surveillance cameras.', value: `${opsStats.cctvOnline} / ${infrastructures.length}`, icon: Video, trend: 'Monitor' },
    { label: 'Internet Online', tooltip: 'Ratio of stable internet connections in each branch.', value: `${opsStats.internetOnline} / ${infrastructures.length}`, icon: Wifi, trend: 'Monitor' }
  ];

  const columns = [
    { 
      title: 'Branch Details', 
      dataIndex: ['branches', 'branch_name'], 
      key: 'branch',
      render: (text: string) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
            <Building2 size={14} color="#64748b" />
          </div>
          <Text strong style={{ color: '#0f172a' }}>{text || 'Unknown'}</Text>
        </Space>
      )
    },
    { 
      title: 'CCTV Status', 
      dataIndex: 'cctv_status', 
      key: 'cctv', 
      render: (status: string) => {
        const isOnline = status === 'online';
        const color = isOnline ? '#10b981' : '#ef4444';
        return (
          <div style={{ background: `${color}15`, color: color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${color}30` }}>
            {status ? status.toUpperCase() : 'UNKNOWN'}
          </div>
        );
      }
    },
    { 
      title: 'Internet Status', 
      dataIndex: 'internet_status', 
      key: 'internet', 
      render: (status: string) => {
        const isOnline = status === 'online';
        const color = isOnline ? '#10b981' : '#ef4444';
        return (
          <div style={{ background: `${color}15`, color: color, padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontWeight: 600, fontSize: 12, border: `1px solid ${color}30` }}>
            {status ? status.toUpperCase() : 'UNKNOWN'}
          </div>
        );
      }
    },
    { 
      title: 'Last Checked', 
      dataIndex: 'last_checked', 
      key: 'checked', 
      align: 'right' as const,
      render: (val: string) => (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <Text strong style={{ fontSize: 13, color: '#334155' }}>{val ? new Date(val).toLocaleDateString('en-US') : '-'}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{val ? new Date(val).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-'}</Text>
        </div>
      )
    }
  ];

  const shiftColumns = [
    { title: 'Cashier Name', dataIndex: 'cashier_name', key: 'cashier', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Start Time', dataIndex: 'shift_start', key: 'start', render: (d: string) => new Date(d).toLocaleString('en-US') },
    { title: 'Expected Cash', dataIndex: 'expected_cash', key: 'expected', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('en-US')}` },
    { title: 'Actual Cash', dataIndex: 'actual_cash', key: 'actual', align: 'right' as const, render: (v: number) => `Rp ${v?.toLocaleString('en-US')}` },
    { title: 'Variance', dataIndex: 'cash_variance', key: 'var', align: 'right' as const, render: (v: number) => <Text type={v < 0 ? 'danger' : 'success'}>{v === 0 ? '-' : `Rp ${v?.toLocaleString('en-US')}`}</Text> }
  ];

  const attendanceColumns = [
    { title: 'Employee', dataIndex: 'employee_name', key: 'emp', render: (t: string) => <Text strong>{t}</Text> },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Clock In', dataIndex: 'clock_in', key: 'in', render: (d: string) => new Date(d).toLocaleString('en-US') },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (t: string) => <div style={{ background: t === 'present' ? '#ecfdf5' : '#fef2f2', color: t === 'present' ? '#10b981' : '#ef4444', padding: '4px 12px', borderRadius: 20, display: 'inline-block', fontSize: 12, fontWeight: 600 }}>{t.toUpperCase()}</div> }
  ];

  return (
    <MainLayout title="Operations Center" subtitle="Infrastructure health and branch logistics monitoring">
      {isLoading ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 32, padding: '8px 0 24px 0', borderBottom: '1px solid #f1f5f9' }}>
            <Row gutter={[24, 24]}>
              {kpiCards.map((kpi) => (
                <Col xs={24} sm={12} lg={8} key={kpi.label}>
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
                      <span style={{ color: kpi.trend === 'Action Required' ? '#ef4444' : '#10b981', fontSize: 12, fontWeight: 700, background: kpi.trend === 'Action Required' ? '#fef2f2' : '#ecfdf5', padding: '2px 8px', borderRadius: 6 }}>{kpi.trend}</span>
                      <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>status</Text>
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
            <Col xs={24} lg={24}>
              <SectionContainer style={{ height: '100%' }}>
                <div style={{ marginBottom: 20 }}>
                  <Space align="center">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Server size={18} color="#475569" />
                    </div>
                    <Title level={4} style={{ margin: 0 }}>CCTV Health Status</Title>
                    <Tooltip title="Click the menu icon for more detailed information about this metric.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
                  </Space>
                </div>
                {opsStats.cctvDist.length > 0 ? (
                  <div style={{ height: 260, width: '100%', marginTop: 24 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={opsStats.cctvDist} 
                          innerRadius={60} 
                          outerRadius={90} 
                          paddingAngle={5} 
                          dataKey="value" 
                          stroke="none"
                        >
                          {opsStats.cctvDist.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(val: any) => [`${val} Units`, 'Count']} 
                          contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                      {opsStats.cctvDist.map(s => (
                        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.color }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>{s.name} ({s.value})</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : <Empty />}
              </SectionContainer>
            </Col>

          </Row>

          <SectionContainer style={{ marginBottom: 24, padding: 40, border: 'none', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2} style={{ margin: 0, color: '#1e293b', fontWeight: 700 }}>Calf One CCTV Streaming</Title>
                <Text style={{ color: '#64748b', fontSize: 16 }}>Monitor real-time traffic conditions and operational facilities of branches.</Text>
              </div>

              {cctvStreams.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                  {cctvStreams.map((stream, index) => (
                    <Button 
                      key={index} 
                      type={activeBranchIndex === index ? "primary" : "default"}
                      onClick={() => setActiveBranchIndex(index)}
                      style={{ borderRadius: 20, padding: '0 20px', background: activeBranchIndex === index ? '#1e293b' : undefined, borderColor: activeBranchIndex === index ? '#1e293b' : undefined }}
                    >
                      {stream.title.split(' - ')[0]}
                    </Button>
                  ))}
                </div>
              )}

              <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: 24, background: '#000', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} className="animate-pulse" />
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>LIVE</Text>
                </div>
                
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  {cctvStreams.length > 0 ? (
                    cctvStreams.map((stream, idx) => (
                      <div 
                        key={stream.title}
                        style={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          pointerEvents: 'none',
                          opacity: activeBranchIndex === idx ? 1 : 0,
                          visibility: activeBranchIndex === idx ? 'visible' : 'hidden',
                          zIndex: activeBranchIndex === idx ? 1 : 0
                        }}
                      >
                        <ReactPlayer 
                          src={`https://www.youtube.com/watch?v=${stream.videoId}`}
                          playing={activeBranchIndex === idx}
                          muted={true}
                          width="100%"
                          height="100%"
                          controls={false}
                          onError={(e) => console.warn(`Player Error for branch ${stream.title}:`, e)}
                          config={{
                            youtube: {
                              playerVars: { showinfo: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, disablekb: 1 }
                            } as any
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Spin size="large" />
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={4} style={{ margin: 0, color: '#334155' }}>
                  {cctvStreams[activeBranchIndex]?.title || "Loading Location..."}
                </Title>
              </div>

              <Row gutter={[32, 32]}>
                <Col xs={24} md={16}>
                  <Title level={4} style={{ color: '#334155', marginBottom: 16 }}>Monitoring Information</Title>
                  <Text style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, display: 'block' }}>
                    This streaming CCTV service is provided openly by the Calf One Operations Department to facilitate leaders and area managers in directly monitoring the smooth operation and facility conditions of each branch.
                  </Text>
                  <Text style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, display: 'block', marginTop: 12 }}>
                    This website only displays aggregated CCTV streaming (Grid View) centrally through official broadcast channels. For full control of every camera in every corner of the branch, please use the Calf One Internal Operations Application.
                  </Text>
                </Col>
                <Col xs={24} md={8}>
                  <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <Title level={5} style={{ margin: '0 0 16px 0', color: '#334155' }}>Full Camera Access</Title>
                    <Text style={{ color: '#64748b', fontSize: 14, display: 'block', marginBottom: 20 }}>
                      Use the CalfGov / Internal Ops App to control each camera point separately without delay.
                    </Text>
                    <div style={{ background: '#3b82f6', color: '#fff', padding: '12px 24px', borderRadius: 8, textAlign: 'center', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'} onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}>
                      Visit Calf Ops App
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </SectionContainer>

          <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 0 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Space align="center">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ServerCrash size={18} color="#475569" />
                </div>
                <Title level={4} style={{ margin: 0 }}>Infrastructure Directory</Title>
                    <Tooltip title="Click the menu icon for more detailed information about this metric.">
                      <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', cursor: 'help' }} />
                    </Tooltip>
              </Space>
              <Input 
                placeholder="Search branch name..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} 
                prefix={<Search size={14} color="#475569" />} 
              />
            </div>
            <Table 
              columns={columns} 
              dataSource={filteredInfra} 
              pagination={{ pageSize: 5, showSizeChanger: true }}
              size="middle"
              rowKey="id"
              scroll={{ x: 800 }}
              style={{ padding: '0 24px 24px 24px' }}
            />
          </SectionContainer>


          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>HR: Staff Attendances</Title>
                </div>
                <Table columns={attendanceColumns} dataSource={attendances} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
            <Col xs={24} lg={12}>
              <SectionContainer style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 0 24px', marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0 }}>HR: Cashier Shifts & Variance</Title>
                </div>
                <Table columns={shiftColumns} dataSource={shifts} pagination={{ pageSize: 5 }} size="small" rowKey="id" scroll={{ x: 500 }} style={{ padding: '0 24px 24px 24px' }} />
              </SectionContainer>
            </Col>
          </Row>


        </>
      )}
    </MainLayout>
  );
}
