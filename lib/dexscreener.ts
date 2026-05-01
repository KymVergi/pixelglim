// DexScreener API integration
// Docs: https://docs.dexscreener.com/api/reference

const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex';

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

export interface TokenMetrics {
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  holders: number;
  txns24h: number;
  buys24h: number;
  sells24h: number;
}

// Fetch token data from DexScreener
export async function fetchDexScreenerData(
  tokenAddress: string
): Promise<DexScreenerPair | null> {
  try {
    const response = await fetch(
      `${DEXSCREENER_API}/tokens/${tokenAddress}`,
      {
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error('DexScreener API error');
    }

    const data = await response.json();
    
    // Return the first pair (usually the most liquid one)
    if (data.pairs && data.pairs.length > 0) {
      return data.pairs[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching DexScreener data:', error);
    return null;
  }
}

// Get simplified token metrics
export async function getTokenMetrics(
  tokenAddress: string
): Promise<TokenMetrics | null> {
  try {
    const pairData = await fetchDexScreenerData(tokenAddress);
    
    if (!pairData) {
      return null;
    }

    return {
      price: parseFloat(pairData.priceUsd || '0'),
      priceChange24h: pairData.priceChange.h24 || 0,
      volume24h: pairData.volume.h24 || 0,
      liquidity: pairData.liquidity.usd || 0,
      marketCap: pairData.marketCap || 0,
      fdv: pairData.fdv || 0,
      holders: 0, // DexScreener doesn't provide this directly
      txns24h: (pairData.txns.h24?.buys || 0) + (pairData.txns.h24?.sells || 0),
      buys24h: pairData.txns.h24?.buys || 0,
      sells24h: pairData.txns.h24?.sells || 0,
    };
  } catch (error) {
    console.error('Error getting token metrics:', error);
    return null;
  }
}

// Format number with K/M/B suffix
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

// Format price (show more decimals for small numbers)
export function formatPrice(price: number): string {
  if (price >= 1) {
    return '$' + price.toFixed(2);
  }
  if (price >= 0.01) {
    return '$' + price.toFixed(4);
  }
  if (price >= 0.0001) {
    return '$' + price.toFixed(6);
  }
  return '$' + price.toFixed(8);
}

// Format percentage
export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return sign + percentage.toFixed(2) + '%';
}

// Get DexScreener chart embed URL
export function getDexScreenerChartUrl(pairAddress: string): string {
  return `https://dexscreener.com/ethereum/${pairAddress}`;
}

// Get DexScreener embed widget URL
export function getDexScreenerEmbedUrl(pairAddress: string): string {
  return `https://dexscreener.com/ethereum/${pairAddress}?embed=1&theme=dark&trades=0&info=0`;
}
