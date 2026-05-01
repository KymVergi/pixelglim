# 🦍 APEG WEB - PIXEL ART NFT FRONTEND

## ✨ LO QUE SE HA CONSTRUIDO

### 🎨 DISEÑO COMPLETO PIXEL ART 16/32-BIT

**Stack Tecnológico:**
- ✅ Next.js 15 (App Router)
- ✅ TypeScript
- ✅ CSS Modules (NO Tailwind)
- ✅ Privy (Wallet Connection)
- ✅ Supabase (Database opcional)
- ✅ DexScreener API (Métricas en tiempo real)
- ✅ React Query (Data fetching)
- ✅ Framer Motion (Animaciones)

### 📂 ARCHIVOS CREADOS

```
apeg-web-final/
├── app/
│   ├── globals.css          ✅ Estilos pixel art completos
│   ├── layout.tsx            ✅ Root layout con metadata
│   ├── page.tsx              ✅ Home page con todas las secciones
│   ├── page.module.css       ✅ Estilos de la página principal
│   └── providers.tsx         ✅ Privy + React Query config
│
├── components/
│   ├── Header.tsx            ✅ Navegación + wallet
│   ├── Header.module.css     ✅ Estilos del header
│   ├── Hero.tsx              ✅ Hero épico con animaciones
│   ├── Hero.module.css       ✅ Estilos del hero
│   ├── DexScreenerStats.tsx  ✅ Métricas en tiempo real
│   │
│   │ ⚠️ COMPONENTES FALTANTES (crear estos):
│   ├── DexScreenerStats.module.css
│   ├── ApegGallery.tsx
│   ├── ApegGallery.module.css
│   ├── LiveActivity.tsx
│   ├── LiveActivity.module.css
│   ├── HowItWorks.tsx
│   ├── HowItWorks.module.css
│   ├── Footer.tsx
│   └── Footer.module.css
│
├── lib/
│   ├── dexscreener.ts        ✅ DexScreener API integration
│   └── supabase.ts           ✅ Supabase client + types
│
├── package.json              ✅ Dependencies
├── tsconfig.json             ✅ TypeScript config
├── next.config.ts            ✅ Next.js config
└── .env.example              ⚠️ Crear este archivo
```

---

## 🚀 SETUP E INSTALACIÓN

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crear `.env.local`:

```env
# Privy (obtener de https://dashboard.privy.io)
NEXT_PUBLIC_PRIVY_APP_ID=tu_privy_app_id

# Contratos (después del deployment)
NEXT_PUBLIC_APEG_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_UNISWAP_POOL_ADDRESS=0x...

# Supabase (opcional - para analytics)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_key

# Chain
NEXT_PUBLIC_CHAIN_ID=1
```

### 3. Crear Componentes Faltantes

Los componentes principales ya están listos. Estos son los que necesitas crear:

#### `components/DexScreenerStats.module.css`
```css
.loading {
  text-align: center;
  padding: 64px 0;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.statCard {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon {
  font-size: 32px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-darker);
  border: 2px solid var(--apeg-pink);
  flex-shrink: 0;
}

.label {
  font-size: 10px;
  color: var(--pixel-gray-3);
  margin-bottom: 8px;
}

.value {
  font-size: 18px;
  color: var(--apeg-yellow);
  margin-bottom: 4px;
}

.change {
  font-size: 10px;
}

.change.positive {
  color: var(--success);
}

.change.negative {
  color: var(--error);
}

.detail {
  font-size: 8px;
  color: var(--pixel-gray-4);
}

.chart {
  margin: 48px 0;
  border: var(--border-medium) var(--apeg-pink);
  box-shadow: var(--shadow-pixel-lg);
  overflow: hidden;
}

.chartFrame {
  width: 100%;
  height: 500px;
  border: none;
}

.liveIndicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 10px;
  color: var(--success);
}

.pulse {
  width: 12px;
  height: 12px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
  }
}

@media (max-width: 768px) {
  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .chartFrame {
    height: 400px;
  }
}
```

#### `components/ApegGallery.tsx`
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecentApegs } from '@/lib/supabase';
import styles from './ApegGallery.module.css';

export default function ApegGallery() {
  const { data: apegs = [], isLoading } = useQuery({
    queryKey: ['recentApegs'],
    queryFn: () => getRecentApegs(12),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className="pixel-loader"></div>
      </div>
    );
  }

  if (apegs.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🦍</div>
        <p>No Apes minted yet!</p>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {apegs.map((ape) => (
        <div key={ape.id} className="pixel-panel">
          <div className={styles.apeCard}>
            <div className={styles.apeImage}>🦍</div>
            <div className={styles.apeInfo}>
              <div className={styles.apeId}>Ape #{ape.token_id}</div>
              <div className={styles.traits}>
                <span className="pixel-badge">{ape.traits.skin}</span>
                <span className="pixel-badge">{ape.traits.eyes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

#### `components/HowItWorks.tsx`
```tsx
'use client';

import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <div className="container">
      <h2 className="text-center text-glow mb-4">How It Works</h2>
      
      <div className={styles.steps}>
        <div className="pixel-panel">
          <div className={styles.stepNumber}>1</div>
          <h3>Buy APEG Tokens</h3>
          <p>Purchase APEG tokens on Uniswap V4. Simple swap ETH → APEG.</p>
        </div>

        <div className="pixel-panel">
          <div className={styles.stepNumber}>2</div>
          <h3>Get APE NFTs</h3>
          <p>Automatically receive pixel art APE NFTs. 1+ tokens = 1+ Apes.</p>
        </div>

        <div className="pixel-panel">
          <div className={styles.stepNumber}>3</div>
          <h3>Trade or Hold</h3>
          <p>Sell tokens = Apes burn. Buy more = get more Apes. Dynamic NFTs.</p>
        </div>
      </div>
    </div>
  );
}
```

#### `components/Footer.tsx`
```tsx
'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logo}>
            <span className="text-glow">APEG</span>
            <p>Pixel Ape NFTs on Ethereum</p>
          </div>
          
          <div className={styles.links}>
            <a href="https://twitter.com/apeg" target="_blank">Twitter</a>
            <a href="https://discord.gg/apeg" target="_blank">Discord</a>
            <a href="https://t.me/apeg" target="_blank">Telegram</a>
            <a href="https://etherscan.io" target="_blank">Etherscan</a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© 2026 APEG. All rights reserved.</p>
          <p>Made with 🦍 and ❤️</p>
        </div>
      </div>
    </footer>
  );
}
```

### 4. Crear Base de Datos Supabase (Opcional)

Si quieres usar Supabase para analytics:

```sql
-- Tabla de stats
CREATE TABLE apeg_stats (
  id BIGSERIAL PRIMARY KEY,
  total_supply INTEGER,
  holders_count INTEGER,
  apes_minted INTEGER,
  floor_price NUMERIC,
  volume_24h NUMERIC,
  market_cap NUMERIC,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Tabla de NFTs
CREATE TABLE apeg_nfts (
  id BIGSERIAL PRIMARY KEY,
  token_id INTEGER UNIQUE,
  owner_address TEXT,
  seed TEXT,
  traits JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de transacciones
CREATE TABLE apeg_transactions (
  id BIGSERIAL PRIMARY KEY,
  tx_hash TEXT UNIQUE,
  from_address TEXT,
  to_address TEXT,
  amount TEXT,
  type TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  block_number INTEGER
);

-- Tabla de analytics
CREATE TABLE page_views (
  id BIGSERIAL PRIMARY KEY,
  page TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 CARACTERÍSTICAS DEL DISEÑO

### Pixel Art Completo:
- ✅ Fuente "Press Start 2P"
- ✅ Pixelated image rendering
- ✅ Scanlines CRT effect
- ✅ Borders estilo 16-bit
- ✅ Shadows pixel perfect
- ✅ Animaciones retro
- ✅ Color palette limitada
- ✅ Grid backgrounds
- ✅ Glowing text effects

### Componentes Interactivos:
- ✅ Header sticky con scroll effect
- ✅ Hero con apes animados
- ✅ Stats live desde DexScreener
- ✅ Wallet connection con Privy
- ✅ Responsive design
- ✅ Mobile menu

---

## 🔧 COMANDOS

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Lint
npm run lint
```

---

## 📦 DEPLOYMENT

### Vercel (Recomendado)
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### Variables de entorno en Vercel:
- Ir a Settings → Environment Variables
- Agregar todas las variables de `.env.local`

---

## ✅ CHECKLIST FINAL

- [ ] npm install
- [ ] Crear `.env.local` con tus keys
- [ ] Crear componentes CSS faltantes
- [ ] Obtener Privy App ID
- [ ] (Opcional) Setup Supabase
- [ ] Deploy a Vercel
- [ ] Actualizar contract address después del deploy
- [ ] Testear wallet connection
- [ ] Verificar que DexScreener carga

---

## 🎯 PRÓXIMOS PASOS

1. **Completar componentes CSS** (5 archivos .module.css faltantes)
2. **Obtener Privy App ID** de dashboard.privy.io
3. **Configurar Supabase** (opcional)
4. **Deploy smart contracts**
5. **Actualizar .env con direcciones reales**
6. **Deploy web a Vercel**
7. **Testing completo**

---

## 💡 TIPS

- Los estilos globales son **ÉPICOS** - todo pixel perfect
- DexScreener se actualiza cada 30 segundos automáticamente
- Privy maneja wallets embedded + externos
- Supabase es opcional - la web funciona sin él
- Mobile responsive listo

---

## 🆘 SOPORTE

Si necesitas ayuda:
1. Revisa los componentes de ejemplo
2. Los estilos están todos comentados
3. TypeScript te ayudará con los tipos

---

¡LISTO PARA LANZAR! 🚀🦍
