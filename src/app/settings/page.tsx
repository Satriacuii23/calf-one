"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Empty } from 'antd';

const { Text } = Typography;

export default function SettingsPage() {
  return (
    <MainLayout title="Settings" subtitle="System configuration and user preferences">
      <Card style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description={
          <Text type="secondary">Global Configuration Module is currently under development.</Text>
        } />
      </Card>
    </MainLayout>
  );
}
