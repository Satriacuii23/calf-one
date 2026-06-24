"use client"

import { useState, useRef } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Typography, Button, Space, DatePicker, Select, Row, Col, Table, Spin, Tag } from 'antd';
import { Printer, Download, TrendingUp, AlertTriangle, CheckCircle2, Sparkles, Building2, PackageSearch, Users } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useOperationsData, useSocialData, useRiskAndInsightsData } from '@/hooks/useDashboardModules';
import { useIntelligenceData } from '@/hooks/useIntelligenceData';
import { topOutlets } from "@/lib/data"; 

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function ReportsPage() {
  const [reportType, setReportType] = useState('executive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReportReady, setIsReportReady] = useState(false);
  
  const dashboardData = useDashboardData();
  const operationsData = useOperationsData();
  const socialData = useSocialData();
  const riskData = useRiskAndInsightsData();
  const intelData = useIntelligenceData();
  
  const handlePrint = () => window.print();

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsReportReady(true);
    }, 2500);
  };

  const revenueM = (dashboardData.totalRevenue / 1000000).toFixed(1);
  const healthScore = 89;

  const topOutletColumns = [
    { title: 'Outlet', dataIndex: 'name', key: 'name' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (val: number) => `Rp ${(val/1000000).toFixed(1)}M` },
    { title: 'Growth', dataIndex: 'growth', key: 'growth', render: (val: number) => <Text type={val > 0 ? 'success' : 'danger'}>{val > 0 ? '+' : ''}{val}%</Text> },
  ];

  const tableStyles = { style: { breakInside: 'avoid' as any, marginBottom: '24px' } };
  const emptyLocale = { emptyText: <Text type="secondary" italic>Data not available for this period</Text> };

  return (
    <MainLayout title="Report Builder" subtitle="Auto-generate comprehensive operational reports">
      
      {/* Control Panel (No Print) */}
      <div className="no-print" style={{ marginBottom: 24, padding: 24, background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Space size="large" wrap>
          <div>
            <Text type="secondary" style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Report Type</Text>
            <Select value={reportType} onChange={setReportType} style={{ width: 220 }} options={[{ value: 'executive', label: 'Executive Summary (Complete)' }, { value: 'audit', label: 'Financial Audit' }]} />
          </div>
          <div>
            <Text type="secondary" style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Report Period</Text>
            <RangePicker style={{ width: 280 }} />
          </div>
        </Space>
        <Space>
          {isReportReady && <Button icon={<Download size={16} />} size="large">Export CSV</Button>}
          {isReportReady && <Button icon={<Printer size={16} />} size="large" onClick={handlePrint}>Print PDF</Button>}
          <Button 
            type="primary" 
            icon={<Sparkles size={16} />} 
            size="large" 
            onClick={handleGenerate} 
            loading={isGenerating}
            style={{ backgroundColor: '#1F5EFF' }}
          >
            {isGenerating ? 'Compiling Report...' : 'Auto Generate Report'}
          </Button>
        </Space>
      </div>

      {isGenerating && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
          <Title level={4} style={{ marginTop: 24 }}>Calculating Data & Writing Conclusions...</Title>
          <Text type="secondary">Connecting to 6 Supabase database modules</Text>
        </div>
      )}

      {!isGenerating && !isReportReady && (
        <div style={{ textAlign: 'center', padding: '80px 0', background: '#f8fafc', borderRadius: 12, border: '1px dashed #cbd5e1' }}>
          <Sparkles size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <Title level={4} style={{ color: '#475569' }}>Report Not Generated</Title>
          <Text type="secondary">Select a time range and click "Auto Generate Report" to start automatic data compilation.</Text>
        </div>
      )}

      {/* A4 Report Canvas */}
      {!isGenerating && isReportReady && (
        <div className="report-canvas" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', background: '#ffffff', padding: '20mm', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '8px', position: 'relative' }}>
          
          {/* Document Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30, borderBottom: '2px solid #0f172a', paddingBottom: 20 }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px', padding: '0 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 12 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                    <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 400, color: '#134cd8', fontFamily: 'Pacifico, cursive', lineHeight: 1, marginTop: -4 }}>Calf</div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                    <div style={{ width: '100%', height: 4, backgroundColor: '#FF0000' }}></div>
                  </div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2.5, color: '#134cd8', marginTop: 4 }}>COFFEE & MILKBAR</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Title level={3} style={{ margin: 0, color: '#0f172a', textTransform: 'uppercase' }}>Comprehensive Report</Title>
              <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>Period: 1 Jun 2026 - 24 Jun 2026</Text>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 2 }}>Auto-Generated System Report</Text>
            </div>
          </div>

          {/* 1. Global Overview Section */}
          <div style={{ marginBottom: 24, breakInside: 'avoid' }}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>1. Executive Overview</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}><div style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 8 }}><Space align="center" style={{ marginBottom: 4 }}><TrendingUp size={16} color="#475569" /><Text type="secondary" strong>Total Revenue</Text></Space><Title level={4} style={{ margin: 0 }}>Rp {revenueM}M</Title></div></Col>
              <Col span={8}><div style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 8 }}><Space align="center" style={{ marginBottom: 4 }}><CheckCircle2 size={16} color="#475569" /><Text type="secondary" strong>Health Score</Text></Space><Title level={4} style={{ margin: 0 }}>{healthScore} / 100</Title></div></Col>
              <Col span={8}><div style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 8 }}><Space align="center" style={{ marginBottom: 4 }}><AlertTriangle size={16} color="#ef4444" /><Text type="secondary" strong>Active Alerts</Text></Space><Title level={4} style={{ margin: 0 }}>{riskData.alerts?.length || 0}</Title></div></Col>
            </Row>
          </div>

          {/* 2. AI Insights & Analysis */}
          <div style={{ marginBottom: 24, breakInside: 'avoid' }}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>2. AI Summary, Analysis & Recommendations</Title>
            {dashboardData.aiInsights && dashboardData.aiInsights.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {dashboardData.aiInsights.map((insight: any) => (
                  <div key={insight.id} style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', borderLeft: '4px solid #8b5cf6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <Text strong style={{ fontSize: 14, color: '#0f172a' }}>{insight.title}</Text>
                      <Tag color="purple" style={{ margin: 0 }}>Impact: {insight.expected_impact || 'High'}</Tag>
                    </div>
                    <Text type="secondary" style={{ display: 'block', lineHeight: 1.5, fontSize: 13 }}>{insight.description}</Text>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: 16, background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 8, textAlign: 'center' }}>
                <Text type="secondary" italic>No AI summary or recommendations available for this period.</Text>
              </div>
            )}
          </div>

          {/* 3. Financial & Sales Intelligence */}
          <div {...tableStyles}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>3. Financial & Sales Intelligence</Title>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Top Performing Outlets</Text>
                <Table columns={topOutletColumns} dataSource={topOutlets.slice(0, 5)} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale} />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Top Selling Menu Items</Text>
                <Table 
                  columns={[
                    { title: 'Item Name', dataIndex: 'menu_name', key: 'name' },
                    { title: 'Price', dataIndex: 'menu_price', key: 'price', render: (val) => `Rp ${(val/1000).toFixed(0)}k` },
                    { title: 'Qty Sold', dataIndex: 'menu_qty', key: 'qty' },
                  ]} 
                  dataSource={
                    (intelData.orderItems || []).reduce((acc: any[], curr: any) => {
                      const existing = acc.find(i => i.menu_name === curr.menu_name);
                      if (existing) {
                        existing.menu_qty += curr.menu_qty;
                      } else {
                        acc.push({ ...curr });
                      }
                      return acc;
                    }, []).sort((a: any, b: any) => b.menu_qty - a.menu_qty).slice(0, 5)
                  } 
                  pagination={false} size="small" rowKey="menu_name" bordered locale={emptyLocale}
                />
              </div>
            </div>
          </div>

          {/* 4. Customer Intelligence */}
          <div {...tableStyles}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>4. Customer Intelligence</Title>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>High-Value Members</Text>
                <Table 
                  columns={[
                    { title: 'Name', dataIndex: 'member_name', key: 'name' },
                    { title: 'Tier', dataIndex: 'member_tier', key: 'tier', render: (val) => <Text strong type={val === 'Gold' ? 'warning' : 'secondary'}>{val}</Text> },
                    { title: 'Total Spent', dataIndex: 'total_spent', key: 'spent', render: (val) => `Rp ${(val/1000).toFixed(0)}k` },
                  ]} 
                  dataSource={intelData.members?.slice(0, 5) || []} pagination={false} size="small" rowKey="member_code" bordered locale={emptyLocale}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Recent Brand Sentiments</Text>
                <Table 
                  columns={[
                    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
                    { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (val) => `${val}/5` },
                    { title: 'Sentiment', dataIndex: 'sentiment', key: 'sentiment' },
                  ]} 
                  dataSource={socialData.sentiments?.slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
            </div>
          </div>

          {/* 5. Inventory & Supply Chain */}
          <div {...tableStyles}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>5. Inventory & Supply Chain</Title>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Critical Stock Alerts</Text>
                <Table 
                  columns={[
                    { title: 'Item Name', dataIndex: 'item_name', key: 'item' },
                    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch' },
                    { title: 'Stock', dataIndex: 'current_stock', key: 'stock', render: (val, record: any) => <Text type="danger">{val} {record.unit}</Text> },
                  ]} 
                  dataSource={operationsData.inventories?.filter((i:any) => i.current_stock < 20).slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Recent Purchase Orders</Text>
                <Table 
                  columns={[
                    { title: 'PO Number', dataIndex: 'po_number', key: 'po' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                    { title: 'Amount', dataIndex: 'total_amount', key: 'amt', render: (val) => `Rp ${(val/1000).toFixed(0)}k` },
                  ]} 
                  dataSource={operationsData.purchaseOrders?.slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
            </div>
          </div>

          {/* 6. HR & Workforce */}
          <div {...tableStyles}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>6. HR & Workforce</Title>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Recent Attendances</Text>
                <Table 
                  columns={[
                    { title: 'Employee ID', dataIndex: 'employee_id', key: 'emp' },
                    { title: 'Status', dataIndex: 'status', key: 'status', render: (val) => <Text type={val === 'Present' ? 'success' : 'danger'}>{val}</Text> },
                  ]} 
                  dataSource={operationsData.attendances?.slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Active Shifts</Text>
                <Table 
                  columns={[
                    { title: 'Shift Type', dataIndex: 'shift_type', key: 'type' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                  ]} 
                  dataSource={operationsData.shifts?.slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
            </div>
          </div>

          {/* 7. Operations & Risk */}
          <div {...tableStyles}>
            <Title level={4} style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: 8, marginBottom: 16 }}>7. Operations & Risk</Title>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Infrastructure Health</Text>
                <Table 
                  columns={[
                    { title: 'Branch', dataIndex: ['branches', 'branch_name'], key: 'branch' },
                    { title: 'CCTV', dataIndex: 'cctv_status', key: 'cctv', render: (val) => val === 'online' ? <Text type="success">Online</Text> : <Text type="danger">Offline</Text> },
                    { title: 'POS Devices', dataIndex: 'pos_devices_online', key: 'pos', render: (val) => <Text>{val} Active</Text> },
                  ]} 
                  dataSource={operationsData.infrastructures?.slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Critical Risk Alerts</Text>
                <Table 
                  columns={[
                    { title: 'Alert Message', dataIndex: 'message', key: 'msg' },
                    { title: 'Severity', dataIndex: 'severity_level', key: 'sev', render: (val) => <Text type={val === 'High' ? 'danger' : 'warning'}>{val}</Text> },
                  ]} 
                  dataSource={riskData.alerts?.slice(0, 5) || []} pagination={false} size="small" rowKey="id" bordered locale={emptyLocale}
                />
              </div>
            </div>
          </div>

          {/* Footer (Pushed to bottom using normal flow or space) */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12, display: 'flex', justifyContent: 'space-between', marginTop: 40, breakInside: 'avoid' }}>
            <Text type="secondary" style={{ fontSize: 10 }}>Strictly Confidential. Generated automatically by Calf Command Center Data Engine.</Text>
            <Text type="secondary" style={{ fontSize: 10 }}>Report EOF</Text>
          </div>

        </div>
      )}

    </MainLayout>
  );
}
