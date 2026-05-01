'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecentTransactions } from '@/lib/supabase';
import styles from './LiveActivity.module.css';

export default function LiveActivity() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: () => getRecentTransactions(10),
    refetchInterval: 15000,
  });

  if (isLoading) {
    return (
      <div className="container">
        <div className={styles.loading}>
          <div className="pixel-loader"></div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <h2 className="text-center text-glow mb-4">Live Activity</h2>
      
      <div className={`pixel-panel ${styles.activityPanel}`}>
        <div className={styles.activityList}>
          {transactions.map((tx: any, index: number) => (
            <div key={tx.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {tx.type === 'buy' ? '🟢' : tx.type === 'sell' ? '🔴' : '🔄'}
              </div>
              <div className={styles.activityInfo}>
                <div className={styles.activityType}>
                  {tx.type === 'buy' ? 'Bought' : tx.type === 'sell' ? 'Sold' : 'Transferred'}
                </div>
                <div className={styles.activityAddress}>
                  {tx.from_address?.slice(0, 6)}...{tx.from_address?.slice(-4)}
                </div>
              </div>
              <div className={styles.activityAmount}>
                {tx.amount} APEG
              </div>
              <div className={styles.activityTime}>
                {new Date(tx.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
