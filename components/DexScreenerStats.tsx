'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTokenMetrics, formatNumber, formatPrice, formatPercentage } from '@/lib/dexscreener';
import styles from './DexScreenerStats.module.css';

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_GLIM_CONTRACT_ADDRESS || '';

export default function DexScreenerStats() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['tokenMetrics', TOKEN_ADDRESS],
    queryFn: () => getTokenMetrics(TOKEN_ADDRESS),
    refetchInterval: 30000, // 30 seconds
    enabled: !!TOKEN_ADDRESS,
  });

  if (isLoading || !metrics) {
    return (
      <div className="container">
        <div className={styles.loading}>
          <div className="pixel-loader"></div>
          <p className="mt-2">Loading DexScreener data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center text-glow mb-4">Live Stats</h2>
      
      <div className={styles.statsGrid}>
        <div className="pixel-panel">
          <div className={styles.statCard}>
            <div className={styles.icon}>💰</div>
            <div>
              <div className={styles.label}>Price</div>
              <div className={styles.value}>{formatPrice(metrics.price)}</div>
              <div className={`${styles.change} ${metrics.priceChange24h >= 0 ? styles.positive : styles.negative}`}>
                {formatPercentage(metrics.priceChange24h)}
              </div>
            </div>
          </div>
        </div>

        <div className="pixel-panel">
          <div className={styles.statCard}>
            <div className={styles.icon}>📊</div>
            <div>
              <div className={styles.label}>24h Volume</div>
              <div className={styles.value}>${formatNumber(metrics.volume24h)}</div>
            </div>
          </div>
        </div>

        <div className="pixel-panel">
          <div className={styles.statCard}>
            <div className={styles.icon}>💎</div>
            <div>
              <div className={styles.label}>Market Cap</div>
              <div className={styles.value}>${formatNumber(metrics.marketCap)}</div>
            </div>
          </div>
        </div>

        <div className="pixel-panel">
          <div className={styles.statCard}>
            <div className={styles.icon}>💧</div>
            <div>
              <div className={styles.label}>Liquidity</div>
              <div className={styles.value}>${formatNumber(metrics.liquidity)}</div>
            </div>
          </div>
        </div>

        <div className="pixel-panel">
          <div className={styles.statCard}>
            <div className={styles.icon}>📈</div>
            <div>
              <div className={styles.label}>24h Txns</div>
              <div className={styles.value}>{metrics.txns24h}</div>
              <div className={styles.detail}>
                {metrics.buys24h}🟢 / {metrics.sells24h}🔴
              </div>
            </div>
          </div>
        </div>

        <div className="pixel-panel">
          <div className={styles.statCard}>
            <div className={styles.icon}>🔥</div>
            <div>
              <div className={styles.label}>FDV</div>
              <div className={styles.value}>${formatNumber(metrics.fdv)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <iframe
          src={`https://dexscreener.com/ethereum/${TOKEN_ADDRESS}?embed=1&theme=dark&trades=0&info=0`}
          className={styles.chartFrame}
          title="DexScreener Chart"
        />
      </div>

      <div className={styles.liveIndicator}>
        <div className={styles.pulse} />
        <span>Live Data from DexScreener</span>
      </div>
    </div>
  );
}
