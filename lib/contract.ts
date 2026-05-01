// Contract integration for reading APEG NFTs from blockchain

import { createPublicClient, http, Address } from 'viem';
import { mainnet } from 'viem/chains';

const APEG_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_APEG_CONTRACT_ADDRESS || '') as Address;

// ABI simplificado - solo las funciones que necesitamos
const APEG_ABI = [
  {
    name: 'OwnerApegsCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'OwnerApeg',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'seed', type: 'uint256' },
        ],
      },
    ],
  },
  {
    name: 'UpegsTotalCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const IMAGE_PROVIDER_ABI = [
  {
    name: 'generateSVG',
    type: 'function',
    stateMutability: 'pure',
    inputs: [{ name: 'seed', type: 'uint256' }],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'getTraitNames',
    type: 'function',
    stateMutability: 'pure',
    inputs: [{ name: 'seed', type: 'uint256' }],
    outputs: [
      { name: 'skinName', type: 'string' },
      { name: 'eyesName', type: 'string' },
      { name: 'headwearName', type: 'string' },
      { name: 'mouthName', type: 'string' },
      { name: 'backgroundName', type: 'string' },
    ],
  },
] as const;

// Client de viem
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export interface ApegNFT {
  id: number;
  seed: string;
  owner: string;
  svg: string;
  traits: {
    skin: string;
    eyes: string;
    headwear: string;
    mouth: string;
    background: string;
  };
}

// Obtener el count total de apegs minteados
export async function getTotalApegsCount(): Promise<number> {
  try {
    const count = await publicClient.readContract({
      address: APEG_CONTRACT_ADDRESS,
      abi: APEG_ABI,
      functionName: 'UpegsTotalCount',
    });
    return Number(count);
  } catch (error) {
    console.error('Error fetching total apegs:', error);
    return 0;
  }
}

// Obtener apegs de un owner específico
export async function getUserApegs(ownerAddress: string): Promise<ApegNFT[]> {
  if (!ownerAddress) return [];
  
  try {
    const count = await publicClient.readContract({
      address: APEG_CONTRACT_ADDRESS,
      abi: APEG_ABI,
      functionName: 'OwnerApegsCount',
      args: [ownerAddress as Address],
    });
    
    const apegsCount = Number(count);
    if (apegsCount === 0) return [];
    
    const apegs: ApegNFT[] = [];
    
    // Fetch cada apeg
    for (let i = 0; i < apegsCount; i++) {
      const apegData = await publicClient.readContract({
        address: APEG_CONTRACT_ADDRESS,
        abi: APEG_ABI,
        functionName: 'OwnerApeg',
        args: [ownerAddress as Address, BigInt(i)],
      });
      
      // Obtener SVG y traits del ImageProvider
      const svg = await generateApegSVG(apegData.seed);
      const traits = await getApegTraits(apegData.seed);
      
      apegs.push({
        id: Number(apegData.id),
        seed: apegData.seed.toString(),
        owner: ownerAddress,
        svg,
        traits,
      });
    }
    
    return apegs;
  } catch (error) {
    console.error('Error fetching user apegs:', error);
    return [];
  }
}

// Generar SVG desde el ImageProvider
export async function generateApegSVG(seed: bigint): Promise<string> {
  const imageProviderAddress = process.env.NEXT_PUBLIC_IMAGE_PROVIDER_ADDRESS as Address;
  if (!imageProviderAddress) return '';
  
  try {
    const svg = await publicClient.readContract({
      address: imageProviderAddress,
      abi: IMAGE_PROVIDER_ABI,
      functionName: 'generateSVG',
      args: [seed],
    });
    
    return svg;
  } catch (error) {
    console.error('Error generating SVG:', error);
    return '';
  }
}

// Obtener nombres de traits
export async function getApegTraits(seed: bigint) {
  const imageProviderAddress = process.env.NEXT_PUBLIC_IMAGE_PROVIDER_ADDRESS as Address;
  if (!imageProviderAddress) {
    return {
      skin: 'Unknown',
      eyes: 'Unknown',
      headwear: 'Unknown',
      mouth: 'Unknown',
      background: 'Unknown',
    };
  }
  
  try {
    const [skin, eyes, headwear, mouth, background] = await publicClient.readContract({
      address: imageProviderAddress,
      abi: IMAGE_PROVIDER_ABI,
      functionName: 'getTraitNames',
      args: [seed],
    });
    
    return { skin, eyes, headwear, mouth, background };
  } catch (error) {
    console.error('Error getting traits:', error);
    return {
      skin: 'Unknown',
      eyes: 'Unknown',
      headwear: 'Unknown',
      mouth: 'Unknown',
      background: 'Unknown',
    };
  }
}

// Obtener los últimos N apegs minteados (simulado - en prod necesitarías events)
export async function getRecentApegs(limit: number = 12): Promise<ApegNFT[]> {
  try {
    const totalCount = await getTotalApegsCount();
    if (totalCount === 0) return [];
    
    // Por ahora retornamos apegs de ejemplo
    // En producción, necesitarías escuchar Transfer events o usar The Graph
    const mockApegs: ApegNFT[] = [];
    
    for (let i = Math.max(0, totalCount - limit); i < totalCount; i++) {
      // Mock data - reemplazar con datos reales del contrato
      mockApegs.push({
        id: i + 1,
        seed: String(Math.floor(Math.random() * 1000000)),
        owner: '0x0000000000000000000000000000000000000000',
        svg: '',
        traits: {
          skin: ['Brown', 'Golden', 'Gray', 'Blue', 'Albino'][Math.floor(Math.random() * 5)],
          eyes: ['Normal', 'Laser', 'Sunglasses', '3D Glasses', 'Cyclops'][Math.floor(Math.random() * 5)],
          headwear: ['None', 'Cap', 'Headphones', 'Crown', 'Halo'][Math.floor(Math.random() * 5)],
          mouth: ['Smile', 'Neutral', 'Cigarette', 'Tongue Out', 'Diamond Grill'][Math.floor(Math.random() * 5)],
          background: ['Orange', 'Blue', 'Purple', 'Rainbow', 'Gold'][Math.floor(Math.random() * 5)],
        },
      });
    }
    
    return mockApegs;
  } catch (error) {
    console.error('Error fetching recent apegs:', error);
    return [];
  }
}
