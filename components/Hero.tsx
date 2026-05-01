'use client';

import styles from './Hero.module.css';

export default function Hero() {
  const handleBuyClick = () => {
    const contractAddress = process.env.NEXT_PUBLIC_PIXELGLIM_CONTRACT_ADDRESS;
    if (contractAddress) {
      window.open(`https://app.uniswap.org/#/swap?outputCurrency=${contractAddress}`, '_blank');
    } else {
      window.open('https://app.uniswap.org', '_blank');
    }
  };

  const handleDexScreenerClick = () => {
    const contractAddress = process.env.NEXT_PUBLIC_PIXELGLIM_CONTRACT_ADDRESS;
    if (contractAddress) {
      window.open(`https://dexscreener.com/ethereum/${contractAddress}`, '_blank');
    } else {
      window.open('https://dexscreener.com', '_blank');
    }
  };

  return (
    <div className={styles.hero}>
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Side - Text Content */}
          <div className={styles.content}>
            <div className={styles.badge}>
              <span className="pixel-badge pixel-badge-pink">100% ON-CHAIN</span>
              <span className="pixel-badge pixel-badge-teal">UNISWAP V4</span>
            </div>

            <h1 className={`${styles.title} text-glow`}>
              PixelGlim
            </h1>
            
            <p className={styles.subtitle}>
              PIXEL GOBLINS NFT
            </p>

            <p className={styles.description}>
              Buy PixelGlim tokens on Uniswap V4 and automatically receive pixel art GOBLIN NFTs. 
              Hold 1+ tokens = 1+ Goblins. Sell tokens = Goblins burn. All generated on-chain. 
              No IPFS. No servers. Pure pixel magic.
            </p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>10,000</div>
                <div className={styles.statLabel}>Max Supply</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>24×24</div>
                <div className={styles.statLabel}>Pixel Art</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>3,125</div>
                <div className={styles.statLabel}>Combos</div>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={handleBuyClick} className="pixel-btn">
                🦄 Buy on Uniswap
              </button>
              <button 
                onClick={handleDexScreenerClick} 
                className="pixel-btn pixel-btn-secondary"
              >
                📊 View Chart
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>⚡</span>
                <span>Dynamic NFTs</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔗</span>
                <span>On-Chain SVG</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎨</span>
                <span>5 Traits × 5</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className={styles.visual}>
            <div className={styles.apeContainer}>
              <div className={styles.apeDisplay}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.pixelApeSvg}>
                  {/* Background Forest */}
                  <rect width="24" height="24" fill="#228B22"/>
                  
                  {/* Head - GREEN GOBLIN */}
                  <rect x="10" y="5" width="4" height="1" fill="#7CFC00"/>
                  <rect x="9" y="6" width="6" height="1" fill="#7CFC00"/>
                  <rect x="8" y="7" width="8" height="5" fill="#7CFC00"/>
                  <rect x="9" y="12" width="6" height="1" fill="#7CFC00"/>
                  
                  {/* Big Ears */}
                  <rect x="6" y="8" width="2" height="2" fill="#7CFC00"/>
                  <rect x="16" y="8" width="2" height="2" fill="#7CFC00"/>
                  
                  {/* Eyes - Normal */}
                  <rect x="10" y="8" width="1" height="1" fill="#FFF"/>
                  <rect x="10" y="9" width="1" height="1" fill="#000"/>
                  <rect x="13" y="8" width="1" height="1" fill="#FFF"/>
                  <rect x="13" y="9" width="1" height="1" fill="#000"/>
                  
                  {/* Nose */}
                  <rect x="11" y="10" width="2" height="1" fill="#556B2F"/>
                  
                  {/* Smile */}
                  <rect x="10" y="11" width="1" height="1" fill="#000"/>
                  <rect x="11" y="12" width="2" height="1" fill="#000"/>
                  <rect x="13" y="11" width="1" height="1" fill="#000"/>
                  
                  {/* Body */}
                  <rect x="8" y="13" width="8" height="2" fill="#556B2F"/>
                  <rect x="9" y="15" width="6" height="5" fill="#556B2F"/>
                  
                  {/* Arms */}
                  <rect x="7" y="14" width="1" height="2" fill="#7CFC00"/>
                  <rect x="16" y="14" width="1" height="2" fill="#7CFC00"/>
                  
                  {/* Bottom */}
                  <rect x="10" y="20" width="4" height="1" fill="#556B2F"/>
                </svg>
              </div>
              
              <div className={styles.pixelFrame}></div>
              <div className={styles.glowEffect}></div>
            </div>

            <div className={styles.infoBoxes}>
              <div className="pixel-panel">
                <div className={styles.infoRow}>
                  <span>Token:</span>
                  <span className="text-yellow">PixelGlim</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Chain:</span>
                  <span className="text-teal">Ethereum</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Type:</span>
                  <span className="text-pink">ERC-20 + NFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Pixels Background */}
      <div className={styles.floatingPixels}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.pixel}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
