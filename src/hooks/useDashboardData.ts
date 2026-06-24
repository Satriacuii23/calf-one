import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface DashboardData {
  totalRevenue: number;
  totalTransactions: number;
  totalCustomers: number;
  totalOutlets: number;
  riskAlerts: any[];
  aiInsights: any[];
  isLoading: boolean;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    totalTransactions: 0,
    totalCustomers: 0,
    totalOutlets: 0,
    riskAlerts: [],
    aiInsights: [],
    isLoading: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          { data: ordersData },
          { count: membersCount },
          { count: outletsCount },
          { data: alertsData },
          { data: insightsData }
        ] = await Promise.all([
          supabase.from('orders').select('total_payment'),
          supabase.from('members').select('*', { count: 'exact', head: true }),
          supabase.from('branches').select('*', { count: 'exact', head: true }),
          supabase.from('risk_alerts').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('ai_insights').select('*').order('created_at', { ascending: false }).limit(3)
        ]);

        const totalRevenue = ordersData?.reduce((acc, order) => acc + Number(order.total_payment || 0), 0) || 0;
        const totalTransactions = ordersData?.length || 0;

        setData({
          totalRevenue,
          totalTransactions,
          totalCustomers: membersCount || 0,
          totalOutlets: outletsCount || 0,
          riskAlerts: alertsData || [],
          aiInsights: insightsData || [],
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setData(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchData();
  }, []);

  return data;
}
