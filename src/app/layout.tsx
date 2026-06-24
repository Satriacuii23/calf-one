import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CALF ONE | Executive Command Center",
  description: "Executive & Operations Command Center for Kopi Calf Coffee & Milkbar Indonesia",
  icons: {
    icon: "/images/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jakarta.className} style={{ margin: 0, padding: 0, backgroundColor: '#f0f2f5' }}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                colorPrimary: '#1F5EFF',
                borderRadius: 8,
                colorBgContainer: '#ffffff',
              },
              components: {
                Layout: {
                  bodyBg: '#f0f2f5',
                  headerBg: '#ffffff',
                },
                Menu: {
                  itemBg: 'transparent',
                  itemSelectedBg: '#eff6ff',
                  itemSelectedColor: '#1F5EFF',
                }
              }
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
