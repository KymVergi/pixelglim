import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para la base de datos
export interface ApegNFT {
  id: number;
  token_id: number;
  owner_address: string;
  seed: string;
  traits: {
    skin: string;
    eyes: string;
    headwear: string;
    mouth: string;
    background: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ApegStats {
  id: number;
  total_supply: number;
  holders_count: number;
  apes_minted: number;
  floor_price: number;
  volume_24h: number;
  market_cap: number;
  last_updated: string;
}

export interface ApegTransaction {
  id: number;
  tx_hash: string;
  from_address: string;
  to_address: string;
  amount: string;
  type: 'buy' | 'sell' | 'transfer';
  timestamp: string;
  block_number: number;
}

// Funciones helper
export async function getApegStats(): Promise<ApegStats | null> {
  try {
    const { data, error } = await supabase
      .from('apeg_stats')
      .select('*')
      .order('last_updated', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

export async function getRecentApegs(limit: number = 12): Promise<ApegNFT[]> {
  try {
    const { data, error } = await supabase
      .from('apeg_nfts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recent apegs:', error);
    return [];
  }
}

export async function getUserApegs(address: string): Promise<ApegNFT[]> {
  try {
    const { data, error } = await supabase
      .from('apeg_nfts')
      .select('*')
      .eq('owner_address', address.toLowerCase())
      .order('token_id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user apegs:', error);
    return [];
  }
}

export async function getRecentTransactions(limit: number = 10): Promise<ApegTransaction[]> {
  try {
    const { data, error } = await supabase
      .from('apeg_transactions')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

// Track page view (analytics)
export async function trackPageView(page: string) {
  try {
    await supabase.from('page_views').insert({
      page,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}
