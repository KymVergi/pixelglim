# 🧌 CAMBIOS APEG → PIXELGLIM

## ✅ CAMBIOS REALIZADOS:

### **1. Nombres de archivos y carpetas:**
- `apeg-web-final/` queda igual (carpeta raíz)
- Los archivos internos se actualizan

### **2. Textos en la web:**

**Hero.tsx:**
- "APEG" → "PixelGlim"
- "APE + PEG = PIXEL APES" → "PIXEL GOBLINS NFT"
- "Buy APEG tokens" → "Buy PixelGlim tokens"
- "APE NFTs" → "GOBLIN NFTs"
- "Apes burn" → "Goblins burn"

**ApegGallery.tsx → GoblinGallery.tsx:**
- "Recent Apes" → "Recent Goblins"
- "Your Apes" → "Your Goblins"
- "No Apes found" → "No Goblins found"
- Emoji 🦍 → 🧌

**Header.tsx:**
- Logo "APEG" → "PixelGlim"

**Footer.tsx:**
- "APEG" → "PixelGlim"
- "Buy APEG" → "Buy PixelGlim"

**HowItWorks.tsx:**
- "Buy APEG" → "Buy PixelGlim"
- "Receive Apes" → "Receive Goblins"
- "Ape burns" → "Goblin burns"

**LiveActivity.tsx:**
- "Recent Activity" permanece igual
- Transacciones muestran "Minted Goblin"

**DexScreenerStats.tsx:**
- "APEG/ETH" → "GLIM/ETH"
- Stats de PixelGlim

### **3. Variables de entorno (.env.example):**
```bash
# ANTES
NEXT_PUBLIC_APEG_CONTRACT_ADDRESS=0x...

# AHORA
NEXT_PUBLIC_PIXELGLIM_CONTRACT_ADDRESS=0x...
```

### **4. package.json:**
```json
{
  "name": "pixelglim-web",
  "description": "PixelGlim - Pixel Goblin NFTs",
  ...
}
```

### **5. Metadata (layout.tsx):**
- Title: "PixelGlim - Pixel Goblin NFTs"
- Description: "Buy PixelGlim tokens and get pixel art goblin NFTs"

### **6. CSS clases y estilos:**
- `.apeg-*` → `.glim-*` (donde sea relevante)
- Colores mantienen el esquema pink/teal/yellow

### **7. Lib files:**
- `lib/goblins.ts` - Ya está listo
- `lib/contract.ts` - Actualizar referencias APEG → PixelGlim
- `lib/supabase.ts` - Actualizar tipos ApegNFT → GoblinNFT

### **8. Componentes:**
Todos actualizados para usar "PixelGlim" y "Goblins" en lugar de "APEG" y "Apes"

---

## 📊 SUPABASE:

**Tabla:** `goblins` (ya creada en SQL)

**Campos:**
- id (BIGSERIAL PRIMARY KEY)
- token_id (INTEGER UNIQUE)
- owner_address (TEXT)
- seed (TEXT)
- traits (JSONB)
- svg (TEXT)
- created_at (TIMESTAMP)

**5 Goblins iniciales incluidos en el SQL!**

---

## 🚀 PARA USAR:

1. **Crear proyecto en Supabase**
2. **Ejecutar el SQL** (SUPABASE_SQL_SETUP.sql)
3. **Configurar .env.local:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
   SUPABASE_SERVICE_KEY=tu_service_key
   ```
4. **Correr auto-minter:**
   ```bash
   node scripts/auto-mint-goblins.js
   ```
5. **Ver la web:**
   ```bash
   npm run dev
   ```

**¡Verás "Recent Goblins" con los 5 iniciales + nuevos cada 15 segundos!** 🧌⚡
