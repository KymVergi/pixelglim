'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds
            refetchInterval: 60 * 1000, // 1 minute
          },
        },
      })
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'clxmf7c490000ll080d0b2h36'}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#FF6B9D',
          logo: undefined,
          showWalletLoginFirst: true,
          landingHeader: '🦍 Connect to APEG',
          loginMessage: 'Connect your wallet to view and trade APE NFTs',
        },
        loginMethods: ['wallet', 'email'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: {
          id: 1,
          name: 'Ethereum',
          network: 'mainnet',
          nativeCurrency: {
            decimals: 18,
            name: 'Ether',
            symbol: 'ETH',
          },
          rpcUrls: {
            public: {
              http: ['https://eth.llamarpc.com'],
            },
            default: {
              http: ['https://eth.llamarpc.com'],
            },
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </PrivyProvider>
  );
}
