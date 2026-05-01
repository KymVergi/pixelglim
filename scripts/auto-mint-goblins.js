// Auto-minter de goblins - Crea 1 goblin cada 15 segundos
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const MINT_INTERVAL = 15000; // 15 segundos

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Traits
const SKINS = ['Green', 'Blue', 'Purple', 'Yellow', 'Zombie'];
const EYES = ['Normal', 'Red', 'Glowing', 'One-Eyed', 'Cyclops'];
const HEADWEAR = ['None', 'Helmet', 'Wizard Hat', 'Crown', 'Bones'];
const MOUTHS = ['Smile', 'Neutral', 'Fangs', 'Tongue Out', 'Gold Tooth'];
const BACKGROUNDS = ['Forest', 'Dungeon', 'Magic', 'Graveyard', 'Gold'];

const SKIN_WEIGHTS = [40, 30, 20, 8, 2];
const EYES_WEIGHTS = [40, 25, 20, 10, 5];
const HEADWEAR_WEIGHTS = [35, 30, 20, 10, 5];
const MOUTH_WEIGHTS = [35, 30, 20, 10, 5];
const BG_WEIGHTS = [30, 25, 25, 15, 5];

function weightedRandom(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) return i;
    random -= weights[i];
  }
  return 0;
}

function generateRandomTraits() {
  return {
    skin: SKINS[weightedRandom(SKIN_WEIGHTS)],
    eyes: EYES[weightedRandom(EYES_WEIGHTS)],
    headwear: HEADWEAR[weightedRandom(HEADWEAR_WEIGHTS)],
    mouth: MOUTHS[weightedRandom(MOUTH_WEIGHTS)],
    background: BACKGROUNDS[weightedRandom(BG_WEIGHTS)],
  };
}

function generateGoblinSVG(traits) {
  const skinColors = {
    'Green': '#7CFC00',
    'Blue': '#4169E1',
    'Purple': '#9B59B6',
    'Yellow': '#F4E04D',
    'Zombie': '#8FBC8F',
  };

  const bgColors = {
    'Forest': '#228B22',
    'Dungeon': '#2C2C2C',
    'Magic': '#9B59B6',
    'Graveyard': '#4A4A4A',
    'Gold': '#FFD700',
  };

  const skin = skinColors[traits.skin];
  const bg = bgColors[traits.background];
  const bodyColor = traits.skin === 'Yellow' ? '#8B0000' : (traits.skin === 'Blue' ? '#808080' : '#556B2F');

  let svg = `<svg width="240" height="240" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;
  svg += `<rect width="24" height="24" fill="${bg}"/>`;
  svg += renderHeadwear(traits.headwear);
  svg += `<rect x="10" y="5" width="4" height="1" fill="${skin}"/>`;
  svg += `<rect x="9" y="6" width="6" height="1" fill="${skin}"/>`;
  svg += `<rect x="8" y="7" width="8" height="5" fill="${skin}"/>`;
  svg += `<rect x="9" y="12" width="6" height="1" fill="${skin}"/>`;
  svg += `<rect x="6" y="8" width="2" height="2" fill="${skin}"/>`;
  svg += `<rect x="16" y="8" width="2" height="2" fill="${skin}"/>`;
  svg += renderEyes(traits.eyes);
  svg += renderMouth(traits.mouth);
  svg += `<rect x="8" y="13" width="8" height="2" fill="${bodyColor}"/>`;
  svg += `<rect x="9" y="15" width="6" height="5" fill="${bodyColor}"/>`;
  svg += `<rect x="7" y="14" width="1" height="2" fill="${skin}"/>`;
  svg += `<rect x="16" y="14" width="1" height="2" fill="${skin}"/>`;
  svg += `<rect x="10" y="20" width="4" height="1" fill="${bodyColor}"/>`;
  svg += `</svg>`;
  
  return svg;
}

function renderHeadwear(type) {
  if (type === 'Helmet') return '<rect x="8" y="3" width="8" height="2" fill="#808080"/><rect x="9" y="5" width="1" height="1" fill="#808080"/><rect x="14" y="5" width="1" height="1" fill="#808080"/>';
  if (type === 'Wizard Hat') return '<rect x="11" y="1" width="2" height="1" fill="#4B0082"/><rect x="10" y="2" width="4" height="1" fill="#4B0082"/><rect x="8" y="3" width="8" height="2" fill="#4B0082"/><rect x="10" y="3" width="1" height="1" fill="#FFD700"/><rect x="13" y="3" width="1" height="1" fill="#FFD700"/>';
  if (type === 'Crown') return '<rect x="9" y="3" width="7" height="2" fill="#FFD700"/><rect x="10" y="2" width="1" height="1" fill="#FF0000"/><rect x="12" y="2" width="1" height="1" fill="#FF0000"/><rect x="14" y="2" width="1" height="1" fill="#FF0000"/>';
  if (type === 'Bones') return '<rect x="10" y="3" width="1" height="1" fill="#FFF"/><rect x="13" y="3" width="1" height="1" fill="#FFF"/>';
  return '';
}

function renderEyes(type) {
  if (type === 'Normal') return '<rect x="10" y="8" width="1" height="1" fill="#FFF"/><rect x="10" y="9" width="1" height="1" fill="#000"/><rect x="13" y="8" width="1" height="1" fill="#FFF"/><rect x="13" y="9" width="1" height="1" fill="#000"/>';
  if (type === 'Red') return '<rect x="10" y="8" width="1" height="2" fill="#FF0000"/><rect x="13" y="8" width="1" height="2" fill="#FF0000"/>';
  if (type === 'Glowing') return '<rect x="9" y="9" width="1" height="1" fill="#00FFFF"/><rect x="10" y="8" width="1" height="2" fill="#00FFFF"/><rect x="13" y="8" width="1" height="2" fill="#00FFFF"/><rect x="14" y="9" width="1" height="1" fill="#00FFFF"/>';
  if (type === 'Cyclops') return '<rect x="11" y="8" width="2" height="3" fill="#000"/><rect x="11" y="9" width="2" height="1" fill="#FF0000"/>';
  return '<rect x="11" y="8" width="2" height="2" fill="#000"/><rect x="11" y="8" width="1" height="1" fill="#FFF"/>';
}

function renderMouth(type) {
  if (type === 'Smile') return '<rect x="10" y="11" width="1" height="1" fill="#000"/><rect x="11" y="12" width="2" height="1" fill="#000"/><rect x="13" y="11" width="1" height="1" fill="#000"/>';
  if (type === 'Neutral') return '<rect x="11" y="11" width="2" height="1" fill="#000"/>';
  if (type === 'Fangs') return '<rect x="10" y="11" width="1" height="2" fill="#FFF"/><rect x="13" y="11" width="1" height="2" fill="#FFF"/>';
  if (type === 'Tongue Out') return '<rect x="11" y="11" width="2" height="1" fill="#000"/><rect x="11" y="12" width="2" height="1" fill="#FF69B4"/>';
  if (type === 'Gold Tooth') return '<rect x="10" y="11" width="1" height="1" fill="#000"/><rect x="11" y="12" width="1" height="1" fill="#FFD700"/><rect x="12" y="12" width="1" height="1" fill="#000"/><rect x="13" y="11" width="1" height="1" fill="#000"/>';
  return '';
}

function randomAddress() {
  return '0x' + Array(40).fill(0).map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
}

async function getNextTokenId() {
  const { data, error } = await supabase
    .from('goblins')
    .select('token_id')
    .order('token_id', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return 1;
  return data[0].token_id + 1;
}

async function mintGoblin() {
  try {
    const tokenId = await getNextTokenId();
    const traits = generateRandomTraits();
    const svg = generateGoblinSVG(traits);
    const seed = Math.floor(Math.random() * 1000000).toString();
    const owner = randomAddress();

    const { data, error } = await supabase
      .from('goblins')
      .insert({
        token_id: tokenId,
        owner_address: owner,
        seed,
        traits,
        svg,
      })
      .select()
      .single();

    if (error) throw error;

    console.log(`🧌 Goblin #${tokenId} minted!`, {
      skin: traits.skin,
      eyes: traits.eyes,
      headwear: traits.headwear,
      mouth: traits.mouth,
      background: traits.background,
    });

    return data;
  } catch (error) {
    console.error('❌ Error minting goblin:', error.message);
  }
}

// Main loop
async function startAutoMinter() {
  console.log('🔥 APEG Goblins Auto-Minter Started!');
  console.log(`⏱️  Minting 1 goblin every ${MINT_INTERVAL / 1000} seconds...`);
  console.log('');

  // Mint immediately
  await mintGoblin();

  // Then mint every 15 seconds
  setInterval(mintGoblin, MINT_INTERVAL);
}

startAutoMinter();
