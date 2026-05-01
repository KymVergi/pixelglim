// Sistema de generación y renderizado de goblins
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface GoblinNFT {
  id: number;
  token_id: number;
  owner_address: string;
  seed: string;
  traits: {
    skin: string;
    eyes: string;
    headwear: string;
    mouth: string;
    background: string;
  };
  svg: string;
  created_at: string;
}

// Trait options
const SKINS = ['Green', 'Blue', 'Purple', 'Yellow', 'Zombie'];
const EYES = ['Normal', 'Red', 'Glowing', 'One-Eyed', 'Cyclops'];
const HEADWEAR = ['None', 'Helmet', 'Wizard Hat', 'Crown', 'Bones'];
const MOUTHS = ['Smile', 'Neutral', 'Fangs', 'Tongue Out', 'Gold Tooth'];
const BACKGROUNDS = ['Forest', 'Dungeon', 'Magic', 'Graveyard', 'Gold'];

// Trait rarities (weighted random)
const SKIN_WEIGHTS = [40, 30, 20, 8, 2]; // Green(40%), Blue(30%), Purple(20%), Yellow(8%), Zombie(2%)
const EYES_WEIGHTS = [40, 25, 20, 10, 5];
const HEADWEAR_WEIGHTS = [35, 30, 20, 10, 5];
const MOUTH_WEIGHTS = [35, 30, 20, 10, 5];
const BG_WEIGHTS = [30, 25, 25, 15, 5];

function weightedRandom(weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) return i;
    random -= weights[i];
  }
  return 0;
}

export function generateRandomTraits() {
  return {
    skin: SKINS[weightedRandom(SKIN_WEIGHTS)],
    eyes: EYES[weightedRandom(EYES_WEIGHTS)],
    headwear: HEADWEAR[weightedRandom(HEADWEAR_WEIGHTS)],
    mouth: MOUTHS[weightedRandom(MOUTH_WEIGHTS)],
    background: BACKGROUNDS[weightedRandom(BG_WEIGHTS)],
  };
}

export function generateGoblinSVG(traits: GoblinNFT['traits']): string {
  // Color mapping
  const skinColors: { [key: string]: string } = {
    'Green': '#7CFC00',
    'Blue': '#4169E1',
    'Purple': '#9B59B6',
    'Yellow': '#F4E04D',
    'Zombie': '#8FBC8F',
  };

  const bgColors: { [key: string]: string } = {
    'Forest': '#228B22',
    'Dungeon': '#2C2C2C',
    'Magic': '#9B59B6',
    'Graveyard': '#4A4A4A',
    'Gold': '#FFD700',
  };

  const skin = skinColors[traits.skin];
  const bg = bgColors[traits.background];

  let svg = `<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;
  
  // Background
  svg += `<rect width="24" height="24" fill="${bg}"/>`;
  
  // Headwear (before head)
  svg += renderHeadwear(traits.headwear);
  
  // Head
  svg += `<rect x="10" y="5" width="4" height="1" fill="${skin}"/>`;
  svg += `<rect x="9" y="6" width="6" height="1" fill="${skin}"/>`;
  svg += `<rect x="8" y="7" width="8" height="5" fill="${skin}"/>`;
  svg += `<rect x="9" y="12" width="6" height="1" fill="${skin}"/>`;
  
  // Big ears
  svg += `<rect x="6" y="8" width="2" height="2" fill="${skin}"/>`;
  svg += `<rect x="16" y="8" width="2" height="2" fill="${skin}"/>`;
  
  // Eyes
  svg += renderEyes(traits.eyes);
  
  // Mouth
  svg += renderMouth(traits.mouth);
  
  // Body
  const bodyColor = traits.skin === 'Yellow' ? '#8B0000' : (traits.skin === 'Blue' ? '#808080' : '#556B2F');
  svg += `<rect x="8" y="13" width="8" height="2" fill="${bodyColor}"/>`;
  svg += `<rect x="9" y="15" width="6" height="5" fill="${bodyColor}"/>`;
  svg += `<rect x="7" y="14" width="1" height="2" fill="${skin}"/>`;
  svg += `<rect x="16" y="14" width="1" height="2" fill="${skin}"/>`;
  svg += `<rect x="10" y="20" width="4" height="1" fill="${bodyColor}"/>`;
  
  svg += `</svg>`;
  return svg;
}

function renderHeadwear(type: string): string {
  if (type === 'None') return '';
  
  if (type === 'Helmet') {
    return `<rect x="8" y="3" width="8" height="2" fill="#808080"/>
            <rect x="9" y="5" width="1" height="1" fill="#808080"/>
            <rect x="14" y="5" width="1" height="1" fill="#808080"/>`;
  }
  
  if (type === 'Wizard Hat') {
    return `<rect x="11" y="1" width="2" height="1" fill="#4B0082"/>
            <rect x="10" y="2" width="4" height="1" fill="#4B0082"/>
            <rect x="8" y="3" width="8" height="2" fill="#4B0082"/>
            <rect x="10" y="3" width="1" height="1" fill="#FFD700"/>
            <rect x="13" y="3" width="1" height="1" fill="#FFD700"/>`;
  }
  
  if (type === 'Crown') {
    return `<rect x="9" y="3" width="7" height="2" fill="#FFD700"/>
            <rect x="9" y="2" width="1" height="1" fill="#FFD700"/>
            <rect x="11" y="2" width="1" height="1" fill="#FFD700"/>
            <rect x="13" y="2" width="1" height="1" fill="#FFD700"/>
            <rect x="15" y="2" width="1" height="1" fill="#FFD700"/>
            <rect x="10" y="2" width="1" height="1" fill="#FF0000"/>
            <rect x="12" y="2" width="1" height="1" fill="#FF0000"/>
            <rect x="14" y="2" width="1" height="1" fill="#FF0000"/>`;
  }
  
  if (type === 'Bones') {
    return `<rect x="10" y="3" width="1" height="1" fill="#FFF"/>
            <rect x="13" y="3" width="1" height="1" fill="#FFF"/>
            <rect x="9" y="4" width="1" height="1" fill="#FFF"/>
            <rect x="14" y="4" width="1" height="1" fill="#FFF"/>`;
  }
  
  return '';
}

function renderEyes(type: string): string {
  if (type === 'Normal') {
    return `<rect x="10" y="8" width="1" height="1" fill="#FFF"/>
            <rect x="10" y="9" width="1" height="1" fill="#000"/>
            <rect x="13" y="8" width="1" height="1" fill="#FFF"/>
            <rect x="13" y="9" width="1" height="1" fill="#000"/>`;
  }
  
  if (type === 'Red') {
    return `<rect x="10" y="8" width="1" height="2" fill="#FF0000"/>
            <rect x="13" y="8" width="1" height="2" fill="#FF0000"/>`;
  }
  
  if (type === 'Glowing') {
    return `<rect x="9" y="9" width="1" height="1" fill="#00FFFF"/>
            <rect x="10" y="8" width="1" height="2" fill="#00FFFF"/>
            <rect x="13" y="8" width="1" height="2" fill="#00FFFF"/>
            <rect x="14" y="9" width="1" height="1" fill="#00FFFF"/>`;
  }
  
  if (type === 'Cyclops') {
    return `<rect x="11" y="8" width="2" height="3" fill="#000"/>
            <rect x="11" y="9" width="2" height="1" fill="#FF0000"/>`;
  }
  
  // One-Eyed
  return `<rect x="11" y="8" width="2" height="2" fill="#000"/>
          <rect x="11" y="8" width="1" height="1" fill="#FFF"/>`;
}

function renderMouth(type: string): string {
  if (type === 'Smile') {
    return `<rect x="10" y="11" width="1" height="1" fill="#000"/>
            <rect x="11" y="12" width="2" height="1" fill="#000"/>
            <rect x="13" y="11" width="1" height="1" fill="#000"/>`;
  }
  
  if (type === 'Neutral') {
    return `<rect x="11" y="11" width="2" height="1" fill="#000"/>`;
  }
  
  if (type === 'Fangs') {
    return `<rect x="10" y="11" width="1" height="2" fill="#FFF"/>
            <rect x="13" y="11" width="1" height="2" fill="#FFF"/>`;
  }
  
  if (type === 'Tongue Out') {
    return `<rect x="11" y="11" width="2" height="1" fill="#000"/>
            <rect x="11" y="12" width="2" height="1" fill="#FF69B4"/>`;
  }
  
  if (type === 'Gold Tooth') {
    return `<rect x="10" y="11" width="1" height="1" fill="#000"/>
            <rect x="11" y="12" width="1" height="1" fill="#FFD700"/>
            <rect x="12" y="12" width="1" height="1" fill="#000"/>
            <rect x="13" y="11" width="1" height="1" fill="#000"/>`;
  }
  
  return '';
}

// Supabase functions
export async function getRecentGoblins(limit: number = 12): Promise<GoblinNFT[]> {
  try {
    const { data, error } = await supabase
      .from('goblins')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recent goblins:', error);
    return [];
  }
}

export async function getUserGoblins(address: string): Promise<GoblinNFT[]> {
  try {
    const { data, error } = await supabase
      .from('goblins')
      .select('*')
      .eq('owner_address', address.toLowerCase())
      .order('token_id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user goblins:', error);
    return [];
  }
}

export async function getTotalGoblinsCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('goblins')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching goblin count:', error);
    return 0;
  }
}

// Subscribe to new goblins in real-time
export function subscribeToNewGoblins(callback: (goblin: GoblinNFT) => void) {
  return supabase
    .channel('goblins_channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'goblins',
      },
      (payload) => {
        callback(payload.new as GoblinNFT);
      }
    )
    .subscribe();
}
