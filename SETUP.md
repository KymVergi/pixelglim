# 🧌 PixelGlim - Setup Rápido

## 🎯 ¿Qué es esto?

**Demo de NFTs de goblins auto-minteándose en tiempo real** usando Supabase.
- ✅ Sin blockchain (solo para demo)
- ✅ Goblins aparecen cada 15 segundos automáticamente
- ✅ Todos los usuarios ven lo mismo en tiempo real
- ✅ 100% gratis

---

## 🚀 Setup en 5 pasos (10 minutos)

### **1. Supabase (Gratis)**

1. Ve a https://supabase.com y crea una cuenta
2. Crea un nuevo proyecto
3. En **SQL Editor**, ejecuta TODO el contenido de `SUPABASE_SQL_SETUP.sql`
4. Esto creará:
   - Tabla `goblins`
   - 5 goblins iniciales
   - Realtime habilitado

### **2. Obtener credenciales de Supabase**

En tu proyecto Supabase:
- Ve a **Settings** → **API**
- Copia:
  - **Project URL** (ej: `https://abc123.supabase.co`)
  - **anon/public key** (empieza con `eyJ...`)
  - **service_role key** (empieza con `eyJ...`, úsala SOLO en el auto-minter)

### **3. Configurar .env.local**

```bash
# Copia el ejemplo
cp .env.example .env.local

# Edita .env.local con tus valores:
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...tu_anon_key
SUPABASE_SERVICE_KEY=eyJhbGciOiJ...tu_service_key

# Ankr RPC (opcional - solo si quieres usar wallet)
NEXT_PUBLIC_RPC_URL=https://rpc.ankr.com/eth/TU_API_KEY
```

### **4. Instalar dependencias**

```bash
npm install
```

### **5. Correr el proyecto**

Necesitas **2 terminales**:

**Terminal 1 - Auto-minter (crea goblins cada 15s):**
```bash
node scripts/auto-mint-goblins.js
```

Verás:
```
🔥 APEG Goblins Auto-Minter Started!
⏱️  Minting 1 goblin every 15 seconds...

🧌 Goblin #6 minted! { skin: 'Green', eyes: 'Normal', ... }
🧌 Goblin #7 minted! { skin: 'Blue', eyes: 'Red', ... }
```

**Terminal 2 - Web:**
```bash
npm run dev
```

**Abre:** http://localhost:3000

---

## 🎮 ¿Qué verás?

### **En "Recent Goblins":**
- 5 goblins iniciales (del SQL)
- Nuevos goblins aparecen cada 15 segundos
- Cada uno con traits aleatorios
- SVG pixel art renderizado
- Todos los usuarios lo ven al mismo tiempo

### **Traits aleatorios:**
- **Skin:** Green, Blue, Purple, Yellow, Zombie
- **Eyes:** Normal, Red, Glowing, One-Eyed, Cyclops
- **Headwear:** None, Helmet, Wizard Hat, Crown, Bones
- **Mouth:** Smile, Neutral, Fangs, Tongue Out, Gold Tooth
- **Background:** Forest, Dungeon, Magic, Graveyard, Gold

---

## ⚙️ Configuración

### **Cambiar velocidad de minteo:**

Edita `scripts/auto-mint-goblins.js`:

```javascript
// Más rápido (5 segundos):
const MINT_INTERVAL = 5000;

// Más lento (30 segundos):
const MINT_INTERVAL = 30000;

// Super rápido (1 segundo):
const MINT_INTERVAL = 1000;
```

### **Ver cuántos goblins hay:**

En Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM goblins;
```

### **Limpiar y empezar de nuevo:**

```sql
-- Borrar todos excepto los 5 iniciales
DELETE FROM goblins WHERE token_id > 5;

-- O borrar TODO y volver a correr el SQL
DROP TABLE goblins;
```

---

## 📁 Archivos incluidos

- `SUPABASE_SQL_SETUP.sql` - SQL para crear tabla + 5 goblins iniciales
- `goblin-preview.html` - Preview de 5 goblins (abre en navegador)
- `PIXELGLIM_CHANGES.md` - Documentación de cambios
- `scripts/auto-mint-goblins.js` - Auto-minter
- `.env.example` - Plantilla de configuración

---

## 🆘 Troubleshooting

### **"Error: relation 'goblins' does not exist"**
→ No ejecutaste el SQL. Ve a Supabase SQL Editor y corre `SUPABASE_SQL_SETUP.sql`

### **"No goblins aparecen"**
→ Verifica que el auto-minter esté corriendo (`node scripts/auto-mint-goblins.js`)

### **"SUPABASE_SERVICE_KEY is required"**
→ Falta la service key en `.env.local` (solo para el auto-minter)

### **Goblins no aparecen en tiempo real**
→ Verifica que ejecutaste la línea de Realtime en el SQL:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE goblins;
```

---

## 🎬 Para hacer un video demo

1. Abre la web en pantalla completa
2. Deja el auto-minter corriendo
3. Graba la sección "Recent Goblins"
4. Verás goblins aparecer automáticamente cada 15s ✨

---

## 📊 Supabase Dashboard

En https://supabase.com puedes ver:
- **Table Editor** - Ver todos los goblins
- **SQL Editor** - Ejecutar queries
- **Logs** - Ver inserts en tiempo real
- **Database** - Ver stats

---

**¡Todo listo!** 🧌⚡

Si tienes dudas, lee `PIXELGLIM_CHANGES.md` para más detalles.
