'use client';

import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className="text-glow">PixelGlim</span>
            </div>
            <p className={styles.tagline}>Pixel Goblim NFTs on Ethereum</p>
            <p className={styles.description}>
              100% on-chain pixel art. Buy tokens, get Goblims. Simple.
            </p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h4>Community</h4>
              <a href="https://twitter.com/pixelglimxt" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://discord.gg/pixelglimxt" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href="https://t.me/pixelglimxt" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </div>

            <div className={styles.linkColumn}>
              <h4>Trade</h4>
              <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer">
                Uniswap
              </a>
              <a href="https://opensea.io" target="_blank" rel="noopener noreferrer">
                OpenSea
              </a>
              <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer">
                DexScreener
              </a>
            </div>

            <div className={styles.linkColumn}>
              <h4>Explore</h4>
              <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer">
                Etherscan
              </a>
              <a href="https://docs.apeg.io" target="_blank" rel="noopener noreferrer">
                Docs
              </a>
              <a href="https://github.com/apeg" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© {currentYear} PixelGlim. All rights reserved.</p>
          <p className={styles.love}>Made with 🦍 and ❤️</p>
        </div>
      </div>
    </footer>
  );
}
