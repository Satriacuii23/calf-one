import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainLayout } from '@/components/layout/main-layout';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const theme = createTheme({
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  primaryColor: 'blue',
  colors: {
    brand: [
      '#e6f0ff',
      '#cce0ff',
      '#99c2ff',
      '#66a3ff',
      '#3385ff',
      '#1F5EFF',
      '#0F2D6B',
      '#0a2459',
      '#071c47',
      '#041336',
    ],
  },
  defaultRadius: 'md',
  components: {
    Card: {
      defaultProps: {
        shadow: 'sm',
        padding: 'lg',
        withBorder: true,
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

export const metadata: Metadata = {
  title: "CALF ONE | Executive Command Center",
  description: "Executive & Operations Command Center for Kopi Calf Coffee & Milkbar Indonesia",
  icons: {
    icon: "/images/logo.jpeg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
