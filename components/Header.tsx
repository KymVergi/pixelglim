'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo} onClick={() => scrollToSection('home')}>
            <div className={styles.pixelApe} title="PixelGlim">
              🦍
            </div>
            <div className={styles.logoText}>
              <span className="text-glow">PixelGlim</span>
              <span className={styles.logoSubtext}>Pixel Apes</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <button onClick={() => scrollToSection('home')} className={styles.navLink}>
              Home
            </button>
            <button onClick={() => scrollToSection('stats')} className={styles.navLink}>
              Stats
            </button>
            <button onClick={() => scrollToSection('about')} className={styles.navLink}>
              About
            </button>
            <button onClick={() => scrollToSection('gallery')} className={styles.navLink}>
              Gallery
            </button>
          </nav>

          {/* Wallet Section */}
          <div className={styles.actions}>
            {ready && !authenticated && (
              <button onClick={login} className="pixel-btn pixel-btn-small">
                Connect
              </button>
            )}
            
            {authenticated && user?.wallet?.address && (
              <div className={styles.wallet}>
                <div className={styles.walletAddress}>
                  {formatAddress(user.wallet.address)}
                </div>
                <button 
                  onClick={logout} 
                  className={styles.logoutBtn}
                  title="Disconnect"
                >
                  ╳
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '╳' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <button onClick={() => scrollToSection('home')} className={styles.mobileLink}>
              Home
            </button>
            <button onClick={() => scrollToSection('stats')} className={styles.mobileLink}>
              Stats
            </button>
            <button onClick={() => scrollToSection('about')} className={styles.mobileLink}>
              About
            </button>
            <button onClick={() => scrollToSection('gallery')} className={styles.mobileLink}>
              Gallery
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
