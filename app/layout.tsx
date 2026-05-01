import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'PixelGlim ',
  description: 'Buy PixelGlim tokens on Uniswap, get pixel art APE NFTs. 100% on-chain, powered by Uniswap V4.',
  keywords: ['PixelGlim', 'NFT', 'Ethereum', 'Uniswap', 'Pixel Art', 'On-Chain', 'DeFi'],
  authors: [{ name: 'PixelGlim Team' }],
  openGraph: {
    title: 'PixelGlim',
    description: 'Buy tokens, get pixel goblins. 100% on-chain NFTs.',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelGlim',
    description: 'Buy tokens, get pixel goblins. 100% on-chain NFTs.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scanlines crt-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
