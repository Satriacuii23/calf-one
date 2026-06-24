"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Typography, Card, Empty } from 'antd';

const { Title, Text } = Typography;

export default function productsPage() {
  return (
    <MainLayout title="Products" subtitle="Migrating to Ant Design...">
      <Card style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description={
          <Text type="secondary">Halaman ini sedang dalam proses migrasi ke Ant Design.</Text>
        } />
      </Card>
    </MainLayout>
  );
}
