"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Empty } from 'antd';

const { Text } = Typography;

export default function ReportsPage() {
  return (
    <MainLayout title="Reports" subtitle="Generate dan unduh laporan analitik">
      <Card style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description={
          <Text type="secondary">Modul Report Builder sedang dalam pengembangan.</Text>
        } />
      </Card>
    </MainLayout>
  );
}
