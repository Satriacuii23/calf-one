'use client';

import { useState, createContext, useContext } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <div
            className={cn(
              'transition-all duration-300',
              sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
            )}
          >
            <Header
              title={title}
              subtitle={subtitle}
              sidebarCollapsed={sidebarCollapsed}
            />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </TooltipProvider>
    </LayoutContext.Provider>
  );
}
