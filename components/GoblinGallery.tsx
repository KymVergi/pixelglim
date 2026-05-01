'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { getRecentGoblins, getUserGoblins, subscribeToNewGoblins } from '@/lib/goblins';
import styles from './GoblinGallery.module.css';

interface GoblinGalleryProps {
  userOnly?: boolean;
}

export default function GoblinGallery({ userOnly = false }: GoblinGalleryProps) {
  const { user } = usePrivy();
  const [selectedGoblin, setSelectedGoblin] = useState<any>(null);

  const { data: goblins = [], isLoading, refetch } = useQuery({
    queryKey: userOnly ? ['userGoblins', user?.wallet?.address] : ['recentGoblins'],
    queryFn: () => 
      userOnly && user?.wallet?.address 
        ? getUserGoblins(user.wallet.address)
        : getRecentGoblins(12),
    refetchInterval: 10000, // Refetch cada 10s
    enabled: !userOnly || !!user?.wallet?.address,
  });

  // Subscribe to realtime updates
  useEffect(() => {
    if (!userOnly) {
      const channel = subscribeToNewGoblins((newGoblin) => {
        console.log('🧌 New goblin appeared!', newGoblin);
        refetch(); // Refetch when new goblin is minted
      });

      return () => {
        channel.unsubscribe();
      };
    }
  }, [userOnly, refetch]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className="pixel-loader"></div>
        <p className="mt-2">Loading Goblins...</p>
      </div>
    );
  }

  if (goblins.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🧌</div>
        <p>No Goblins found!</p>
        {userOnly && <p className={styles.emptyHint}>Buy PixelGlim tokens to get your first Goblin!</p>}
      </div>
    );
  }

  return (
    <>
      <div className={styles.gallery}>
        {goblins.map((goblin: any) => (
          <div 
            key={goblin.id} 
            className={`pixel-panel ${styles.apeCard}`}
            onClick={() => setSelectedGoblin(goblin)}
          >
            <div className={styles.apeImage}>
              {goblin.svg ? (
                <div 
                  className={styles.apeDisplay} 
                  dangerouslySetInnerHTML={{ __html: goblin.svg }}
                />
              ) : (
                <div className={styles.apeDisplay}>🧌</div>
              )}
            </div>
            <div className={styles.apeInfo}>
              <div className={styles.apeId}>Goblin #{goblin.token_id}</div>
              <div className={styles.traits}>
                <span className="pixel-badge pixel-badge-pink">{goblin.traits?.skin || 'Green'}</span>
                <span className="pixel-badge pixel-badge-teal">{goblin.traits?.eyes || 'Normal'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedGoblin && (
        <div className={styles.modal} onClick={() => setSelectedGoblin(null)}>
          <div className={`pixel-panel ${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedGoblin(null)}>╳</button>
            
            <div className={styles.modalGrid}>
              <div className={styles.modalImage}>
                {selectedGoblin.svg ? (
                  <div 
                    className={styles.apeDisplayLarge}
                    dangerouslySetInnerHTML={{ __html: selectedGoblin.svg }}
                  />
                ) : (
                  <div className={styles.apeDisplayLarge}>🧌</div>
                )}
              </div>
              
              <div className={styles.modalInfo}>
                <h2 className="text-glow mb-3">Goblin #{selectedGoblin.token_id}</h2>
                
                <div className={styles.section}>
                  <h3>Traits</h3>
                  <div className={styles.traitsList}>
                    <div className={styles.traitItem}>
                      <span>Skin:</span>
                      <span className="pixel-badge">{selectedGoblin.traits?.skin || 'Green'}</span>
                    </div>
                    <div className={styles.traitItem}>
                      <span>Eyes:</span>
                      <span className="pixel-badge">{selectedGoblin.traits?.eyes || 'Normal'}</span>
                    </div>
                    <div className={styles.traitItem}>
                      <span>Headwear:</span>
                      <span className="pixel-badge">{selectedGoblin.traits?.headwear || 'None'}</span>
                    </div>
                    <div className={styles.traitItem}>
                      <span>Mouth:</span>
                      <span className="pixel-badge">{selectedGoblin.traits?.mouth || 'Smile'}</span>
                    </div>
                    <div className={styles.traitItem}>
                      <span>Background:</span>
                      <span className="pixel-badge">{selectedGoblin.traits?.background || 'Forest'}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className="pixel-btn pixel-btn-small" onClick={() => alert('PixelGlim is ERC-20, not tradeable on OpenSea')}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}