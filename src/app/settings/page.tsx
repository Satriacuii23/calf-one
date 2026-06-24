"use client"

import { MainLayout } from "@/components/layout/main-layout";
import { Card, Typography, Empty } from 'antd';

const { Text } = Typography;

export default function SettingsPage() {
  return (
    <MainLayout title="Settings" subtitle="Konfigurasi sistem dan preferensi pengguna">
      <Card style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description={
          <Text type="secondary">Modul Konfigurasi Global sedang dalam pengembangan.</Text>
        } />
      </Card>
    </MainLayout>
  );
}
