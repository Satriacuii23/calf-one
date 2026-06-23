'use client';

import { useState, createContext, useContext } from 'react';
import { Sidebar, MobileSidebar } from './sidebar';
import { Header } from './header';

interface LayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export function useLayout() {
  return useContext(LayoutContext);
}

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const mainContentClass = sidebarCollapsed
    ? 'lg:ml-[72px]'
    : 'lg:ml-[260px]';

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <div className="min-h-screen bg-background">
        {/* Mobile Sidebar */}
        <MobileSidebar
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-0 top-0 z-40 h-screen">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className={`min-h-screen transition-all duration-300 ${mainContentClass}`}>
          <Header
            title={title}
            subtitle={subtitle}
            sidebarCollapsed={sidebarCollapsed}
            onMobileMenuToggle={() => setMobileSidebarOpen(true)}
          />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
