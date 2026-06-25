import '@mantine/core/styles.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ConfigProvider } from 'antd';
import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Calf Command Center",
  description: "Executive Dashboard for Calf Coffee & Milkbar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f0f2f5' }}>
        <MantineProvider>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                  colorPrimary: '#1F5EFF',
                  borderRadius: 10,
                  colorBgContainer: '#ffffff',
                  colorBgLayout: '#f8fafc',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  boxShadowSecondary: '0 2px 8px rgba(0,0,0,0.04)',
                  colorBorderSecondary: '#f1f5f9',
                  controlHeight: 36,
                },
                components: {
                  Layout: {
                    bodyBg: '#f8fafc',
                    headerBg: '#ffffff',
                  },
                  Menu: {
                    itemBg: 'transparent',
                    itemSelectedBg: '#eff6ff',
                    itemSelectedColor: '#1F5EFF',
                    itemBorderRadius: 8,
                  },
                  Card: {
                    colorBorderSecondary: '#e2e8f0',
                    boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
                  },
                  Table: {
                    headerBg: '#f8fafc',
                    headerColor: '#64748b',
                    rowHoverBg: '#f1f5f9',
                    cellPaddingBlock: 12,
                  }
                }
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </MantineProvider>
      </body>
    </html>
  );
}
