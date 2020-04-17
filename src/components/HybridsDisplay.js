import React from 'react';
import { Tile } from 'react-bulma-components';

import HybridDisplay from './HybridDisplay';
import StoreProvider from './StoreProvider';

export const HybridsDisplay = ({ hybrids }) => {
  const hybridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12

  return (
    <>
      <br />
      <Tile className="is-ancestor">
        <Tile style={{ flexWrap: 'wrap' }}>
          {hybrids.map(hybrid => (
            <Tile
              key={hybrid.id}
              className={`is-parent is-${12 / hybridByLine}`}
            >
              <Tile className="is-child">
                <HybridDisplay hybrid={hybrid} />
              </Tile>
            </Tile>
          ))}
        </Tile>
      </Tile>
    </>
  );
};

function extraProps(store) {
  return {
    hybrids: Object.values(store.getState().hybrids).map(h => ({
      ...h,
      tags: store.getHybridTags(h.id),
    })),
  };
}

export default StoreProvider(extraProps)(HybridsDisplay);
