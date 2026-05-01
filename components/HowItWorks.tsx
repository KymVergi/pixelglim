'use client';

import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <div className="container">
      <h2 className="text-center text-glow mb-4">How It Works</h2>
      
      <div className={styles.steps}>
        <div className={`pixel-panel ${styles.step}`}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepIcon}>🦄</div>
          <h3>Buy PixelGlim Tokens</h3>
          <p>Purchase PixelGlim tokens on Uniswap V4. Simple swap: ETH → APEG.</p>
        </div>

        <div className={`pixel-panel ${styles.step}`}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepIcon}>🧌</div>
          <h3>Get APE NFTs</h3>
          <p>Automatically receive pixel art APE NFTs. 1+ tokens = 1+ Apes!</p>
        </div>

        <div className={`pixel-panel ${styles.step}`}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepIcon}>💎</div>
          <h3>Trade or Hold</h3>
          <p>Sell tokens = Apes burn. Buy more = get more Apes. Dynamic NFTs!</p>
        </div>
      </div>
    </div>
  );
}
