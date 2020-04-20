import React from 'react';
import { Tile } from 'react-bulma-components';

import HybridDisplay from './HybridDisplay';
import StoreProvider from '../store/StoreProvider';

export const HybridsDisplay = props => {
  const hybridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12
  const maxHybridByCol = Math.max(
    1,
    Math.floor(props.hybrids.length / hybridByLine)
  );
  let gridHybrids = [];
  for (let i = 0; i < hybridByLine; i++) {
    gridHybrids = [...gridHybrids, props.hybrids.splice(0, maxHybridByCol)];
  }

  return (
    <>
      <br />
      <Tile className="is-ancestor">
        <Tile>
          {gridHybrids.map(colhybrids => (
            <Tile key={gridHybrids.indexOf(colhybrids)} className="is-vertical">
              {colhybrids.map(hybrid => (
                <Tile key={hybrid.id} className={'is-parent'}>
                  <Tile className="is-child">
                    <HybridDisplay hybrid={hybrid} />
                  </Tile>
                </Tile>
              ))}
            </Tile>
          ))}
        </Tile>
      </Tile>
    </>
  );
};

function extraProps(store) {
  return {
    hybrids: Object.values(store.hybrids).map(h => ({
      ...h,
      tags: store.getHybridTags(h.id),
    })),
  };
}

export default StoreProvider(extraProps)(HybridsDisplay);
