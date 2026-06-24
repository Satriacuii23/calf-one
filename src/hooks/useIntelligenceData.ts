import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface IntelligenceData {
  orders: any[];
  orderItems: any[];
  members: any[];
  payments: any[];
  voids: any[];
  recipes: any[];
  points: any[];
  vouchers: any[];
  kitchenTickets: any[];
  deliveryTracking: any[];
  campaigns: any[];
  referrals: any[];
  taxes: any[];
  isLoading: boolean;
  error: string | null;
}

export function useIntelligenceData() {
  const [data, setData] = useState<IntelligenceData>({
    orders: [],
    orderItems: [],
    members: [],
    payments: [],
    voids: [],
    recipes: [],
    points: [],
    vouchers: [],
    kitchenTickets: [],
    deliveryTracking: [],
    campaigns: [],
    referrals: [],
    taxes: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          { data: ordersData, error: ordersError },
          { data: itemsData, error: itemsError },
          { data: membersData, error: membersError },
          { data: paymentsData },
          { data: voidsData },
          { data: recipesData },
          { data: pointsData },
          { data: vouchersData },
          { data: kitchenData },
          { data: deliveryData },
          { data: campaignsData },
          { data: referralsData },
          { data: taxesData }
        ] = await Promise.all([
          supabase.from('orders').select('id, order_id, order_type_name, subtotal, total_discount, total_payment, payment_method, payment_status, status, transaction_date').order('transaction_date', { ascending: false }).limit(500),
          supabase.from('order_items').select('menu_name, menu_price, menu_qty, menu_subtotal').limit(1000),
          supabase.from('members').select('member_code, member_name, member_tier, member_points, total_spent, total_transactions, registered_date, last_visit_date').order('total_spent', { ascending: false }).limit(500),
          supabase.from('esb_payments_ledger').select('*, orders(order_id)').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_voids_refunds').select('*, orders(order_id)').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_recipes').select('*, inventories(item_name)').limit(500),
          supabase.from('esb_point_transactions').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_vouchers').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_kitchen_tickets').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_delivery_tracking').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_campaigns').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_referrals').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('esb_taxes_and_service').select('*').order('created_at', { ascending: false }).limit(500)
        ]);

        if (ordersError) console.error("Orders Fetch Error:", ordersError);
        if (itemsError) console.error("Order Items Fetch Error:", itemsError);
        if (membersError) console.error("Members Fetch Error:", membersError);

        setData({
          orders: ordersData || [],
          orderItems: itemsData || [],
          members: membersData || [],
          payments: paymentsData || [],
          voids: voidsData || [],
          recipes: recipesData || [],
          points: pointsData || [],
          vouchers: vouchersData || [],
          kitchenTickets: kitchenData || [],
          deliveryTracking: deliveryData || [],
          campaigns: campaignsData || [],
          referrals: referralsData || [],
          taxes: taxesData || [],
          isLoading: false,
          error: ordersError?.message || null,
        });
      } catch (err: any) {
        console.error('Error fetching intelligence data:', err);
        setData(prev => ({ ...prev, isLoading: false, error: err.message }));
      }
    }

    fetchData();
  }, []);

  return data;
}
