import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useOperationsData() {
  const [data, setData] = useState<any>({ infrastructures: [], inventories: [], branches: [], isLoading: true });
  useEffect(() => {
    async function fetch() {
      const [{ data: inf }, { data: inv }, { data: br }] = await Promise.all([
        supabase.from('branch_infrastructures').select('*, branches(branch_name)').limit(100),
        supabase.from('inventories').select('*, branches(branch_name)').limit(100),
        supabase.from('branches').select('*').limit(100)
      ]);
      setData({ infrastructures: inf || [], inventories: inv || [], branches: br || [], isLoading: false });
    }
    fetch();
  }, []);
  return data;
}

export function useSocialData() {
  const [data, setData] = useState<any>({ sentiments: [], isLoading: true });
  useEffect(() => {
    async function fetch() {
      const { data: sen } = await supabase.from('social_sentiments').select('*').order('post_date', { ascending: false }).limit(100);
      setData({ sentiments: sen || [], isLoading: false });
    }
    fetch();
  }, []);
  return data;
}

export function useCustomerCareData() {
  const [data, setData] = useState<any>({ complaints: [], isLoading: true });
  useEffect(() => {
    async function fetch() {
      const { data: comp } = await supabase.from('customer_complaints').select('*, branches(branch_name), members(member_name)').order('created_at', { ascending: false }).limit(100);
      setData({ complaints: comp || [], isLoading: false });
    }
    fetch();
  }, []);
  return data;
}

export function useRiskAndInsightsData() {
  const [data, setData] = useState<any>({ alerts: [], insights: [], isLoading: true });
  useEffect(() => {
    async function fetch() {
      const [{ data: al }, { data: ins }] = await Promise.all([
        supabase.from('risk_alerts').select('*, branches(branch_name)').order('created_at', { ascending: false }).limit(100),
        supabase.from('ai_insights').select('*').order('created_at', { ascending: false }).limit(100)
      ]);
      setData({ alerts: al || [], insights: ins || [], isLoading: false });
    }
    fetch();
  }, []);
  return data;
}

export function useExpansionData() {
  const [data, setData] = useState<any>({ proposals: [], isLoading: true });
  useEffect(() => {
    async function fetch() {
      const { data: prop } = await supabase.from('expansion_proposals').select('*').order('created_at', { ascending: false }).limit(100);
      setData({ proposals: prop || [], isLoading: false });
    }
    fetch();
  }, []);
  return data;
}
