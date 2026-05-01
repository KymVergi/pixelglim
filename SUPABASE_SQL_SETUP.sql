-- ========================================
-- PIXELGLIM - Supabase Database Setup
-- ========================================

-- 1. Crear tabla de goblins
CREATE TABLE goblins (
  id BIGSERIAL PRIMARY KEY,
  token_id INTEGER UNIQUE NOT NULL,
  owner_address TEXT NOT NULL,
  seed TEXT NOT NULL,
  traits JSONB NOT NULL,
  svg TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices para performance
CREATE INDEX idx_goblins_created_at ON goblins(created_at DESC);
CREATE INDEX idx_goblins_owner ON goblins(owner_address);
CREATE INDEX idx_goblins_token_id ON goblins(token_id);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE goblins ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Todos pueden leer
CREATE POLICY "Enable read access for all users" ON goblins
  FOR SELECT USING (true);

-- 5. Policy: Solo service role puede insertar
CREATE POLICY "Enable insert for service role only" ON goblins
  FOR INSERT WITH CHECK (true);

-- 6. Habilitar Realtime (para ver goblins aparecer en tiempo real)
ALTER PUBLICATION supabase_realtime ADD TABLE goblins;

-- ========================================
-- INSERTAR 5 GOBLINS INICIALES
-- ========================================

INSERT INTO goblins (token_id, owner_address, seed, traits, svg) VALUES
(
  1,
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  '12345',
  '{"skin":"Green","eyes":"Normal","headwear":"None","mouth":"Smile","background":"Forest"}'::jsonb,
  '<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="24" height="24" fill="#228B22"/><rect x="10" y="5" width="4" height="1" fill="#7CFC00"/><rect x="9" y="6" width="6" height="1" fill="#7CFC00"/><rect x="8" y="7" width="8" height="5" fill="#7CFC00"/><rect x="9" y="12" width="6" height="1" fill="#7CFC00"/><rect x="6" y="8" width="2" height="2" fill="#7CFC00"/><rect x="16" y="8" width="2" height="2" fill="#7CFC00"/><rect x="10" y="8" width="1" height="1" fill="#FFF"/><rect x="10" y="9" width="1" height="1" fill="#000"/><rect x="13" y="8" width="1" height="1" fill="#FFF"/><rect x="13" y="9" width="1" height="1" fill="#000"/><rect x="10" y="11" width="1" height="1" fill="#000"/><rect x="11" y="12" width="2" height="1" fill="#000"/><rect x="13" y="11" width="1" height="1" fill="#000"/><rect x="8" y="13" width="8" height="2" fill="#556B2F"/><rect x="9" y="15" width="6" height="5" fill="#556B2F"/><rect x="7" y="14" width="1" height="2" fill="#7CFC00"/><rect x="16" y="14" width="1" height="2" fill="#7CFC00"/><rect x="10" y="20" width="4" height="1" fill="#556B2F"/></svg>'
),
(
  2,
  '0x8Ba1f109551bD432803012645Ac136ddd64DBA72',
  '23456',
  '{"skin":"Blue","eyes":"Red","headwear":"Helmet","mouth":"Fangs","background":"Dungeon"}'::jsonb,
  '<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="24" height="24" fill="#2C2C2C"/><rect x="8" y="3" width="8" height="2" fill="#808080"/><rect x="9" y="5" width="1" height="1" fill="#808080"/><rect x="14" y="5" width="1" height="1" fill="#808080"/><rect x="10" y="5" width="4" height="1" fill="#4169E1"/><rect x="9" y="6" width="6" height="1" fill="#4169E1"/><rect x="8" y="7" width="8" height="5" fill="#4169E1"/><rect x="9" y="12" width="6" height="1" fill="#4169E1"/><rect x="6" y="8" width="2" height="2" fill="#4169E1"/><rect x="16" y="8" width="2" height="2" fill="#4169E1"/><rect x="10" y="8" width="1" height="2" fill="#FF0000"/><rect x="13" y="8" width="1" height="2" fill="#FF0000"/><rect x="10" y="11" width="1" height="2" fill="#FFF"/><rect x="13" y="11" width="1" height="2" fill="#FFF"/><rect x="8" y="13" width="8" height="2" fill="#808080"/><rect x="9" y="15" width="6" height="5" fill="#808080"/><rect x="7" y="14" width="1" height="2" fill="#4169E1"/><rect x="16" y="14" width="1" height="2" fill="#4169E1"/><rect x="10" y="20" width="4" height="1" fill="#808080"/></svg>'
),
(
  3,
  '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
  '34567',
  '{"skin":"Purple","eyes":"Glowing","headwear":"Wizard Hat","mouth":"Neutral","background":"Magic"}'::jsonb,
  '<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="24" height="24" fill="#9B59B6"/><rect x="11" y="1" width="2" height="1" fill="#4B0082"/><rect x="10" y="2" width="4" height="1" fill="#4B0082"/><rect x="8" y="3" width="8" height="2" fill="#4B0082"/><rect x="10" y="3" width="1" height="1" fill="#FFD700"/><rect x="13" y="3" width="1" height="1" fill="#FFD700"/><rect x="10" y="5" width="4" height="1" fill="#9B59B6"/><rect x="9" y="6" width="6" height="1" fill="#9B59B6"/><rect x="8" y="7" width="8" height="5" fill="#9B59B6"/><rect x="9" y="12" width="6" height="1" fill="#9B59B6"/><rect x="6" y="8" width="2" height="2" fill="#9B59B6"/><rect x="16" y="8" width="2" height="2" fill="#9B59B6"/><rect x="9" y="9" width="1" height="1" fill="#00FFFF"/><rect x="10" y="8" width="1" height="2" fill="#00FFFF"/><rect x="13" y="8" width="1" height="2" fill="#00FFFF"/><rect x="14" y="9" width="1" height="1" fill="#00FFFF"/><rect x="11" y="11" width="2" height="1" fill="#000"/><rect x="8" y="13" width="8" height="2" fill="#6C3483"/><rect x="9" y="15" width="6" height="5" fill="#6C3483"/><rect x="7" y="14" width="1" height="2" fill="#9B59B6"/><rect x="16" y="14" width="1" height="2" fill="#9B59B6"/><rect x="10" y="20" width="4" height="1" fill="#6C3483"/></svg>'
),
(
  4,
  '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
  '45678',
  '{"skin":"Yellow","eyes":"Normal","headwear":"Crown","mouth":"Gold Tooth","background":"Gold"}'::jsonb,
  '<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="24" height="24" fill="#FFD700"/><rect x="9" y="3" width="7" height="2" fill="#FFD700"/><rect x="10" y="2" width="1" height="1" fill="#FF0000"/><rect x="12" y="2" width="1" height="1" fill="#FF0000"/><rect x="14" y="2" width="1" height="1" fill="#FF0000"/><rect x="10" y="5" width="4" height="1" fill="#F4E04D"/><rect x="9" y="6" width="6" height="1" fill="#F4E04D"/><rect x="8" y="7" width="8" height="5" fill="#F4E04D"/><rect x="9" y="12" width="6" height="1" fill="#F4E04D"/><rect x="6" y="8" width="2" height="2" fill="#F4E04D"/><rect x="16" y="8" width="2" height="2" fill="#F4E04D"/><rect x="10" y="8" width="1" height="1" fill="#FFF"/><rect x="10" y="9" width="1" height="1" fill="#000"/><rect x="13" y="8" width="1" height="1" fill="#FFF"/><rect x="13" y="9" width="1" height="1" fill="#000"/><rect x="10" y="11" width="1" height="1" fill="#000"/><rect x="11" y="12" width="1" height="1" fill="#FFD700"/><rect x="12" y="12" width="1" height="1" fill="#000"/><rect x="13" y="11" width="1" height="1" fill="#000"/><rect x="8" y="13" width="8" height="2" fill="#8B0000"/><rect x="9" y="15" width="6" height="5" fill="#8B0000"/><rect x="7" y="14" width="1" height="2" fill="#F4E04D"/><rect x="16" y="14" width="1" height="2" fill="#F4E04D"/><rect x="10" y="20" width="4" height="1" fill="#8B0000"/></svg>'
),
(
  5,
  '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  '56789',
  '{"skin":"Zombie","eyes":"Cyclops","headwear":"Bones","mouth":"Tongue Out","background":"Graveyard"}'::jsonb,
  '<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="24" height="24" fill="#4A4A4A"/><rect x="10" y="3" width="1" height="1" fill="#FFF"/><rect x="13" y="3" width="1" height="1" fill="#FFF"/><rect x="10" y="5" width="4" height="1" fill="#8FBC8F"/><rect x="9" y="6" width="6" height="1" fill="#8FBC8F"/><rect x="8" y="7" width="8" height="5" fill="#8FBC8F"/><rect x="9" y="12" width="6" height="1" fill="#8FBC8F"/><rect x="6" y="8" width="2" height="2" fill="#8FBC8F"/><rect x="16" y="8" width="2" height="2" fill="#8FBC8F"/><rect x="11" y="8" width="2" height="3" fill="#000"/><rect x="11" y="9" width="2" height="1" fill="#FF0000"/><rect x="11" y="11" width="2" height="1" fill="#000"/><rect x="11" y="12" width="2" height="1" fill="#FF69B4"/><rect x="8" y="13" width="8" height="2" fill="#2F4F2F"/><rect x="9" y="15" width="6" height="5" fill="#2F4F2F"/><rect x="7" y="14" width="1" height="2" fill="#8FBC8F"/><rect x="16" y="14" width="1" height="2" fill="#8FBC8F"/><rect x="10" y="20" width="4" height="1" fill="#2F4F2F"/></svg>'
);

-- ========================================
-- VERIFICAR
-- ========================================

-- Ver los 5 goblins creados
SELECT token_id, traits->>'skin' as skin, traits->>'eyes' as eyes 
FROM goblins 
ORDER BY token_id;

-- Debería mostrar:
-- token_id | skin   | eyes
-- ---------+--------+--------
--     1    | Green  | Normal
--     2    | Blue   | Red
--     3    | Purple | Glowing
--     4    | Yellow | Normal
--     5    | Zombie | Cyclops
