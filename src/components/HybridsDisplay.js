import React, { useState } from 'react';
import { Tile } from 'react-bulma-components';

import HybridDisplay from './HybridDisplay';
import StoreProvider from '../store/StoreProvider';

export const HybridsDisplay = ({ hybrids, filter }) => {
  const sliderValues = [12, 6, 4, 3, 2, 1];
  const [nbByLine, setnbByLine] = useState(4);
  filter = { ...filter };

  const filterHybrids = hybrids.filter(h => {
    return (
      (!filter.user || filter.user === h.user) &&
      (!filter.grid || filter.grid === h.grid) &&
      (!filter.tags || filter.tags.every(t => h.tags.includes(t))) &&
      (!filter.name || h.name.toLowerCase().includes(filter.name.toLowerCase))
    );
  });

  const maxHybridByCol = Math.max(1, Math.floor(hybrids.length / nbByLine));
  let gridHybrids = [];
  for (let i = 0; i < nbByLine; i++) {
    gridHybrids = [...gridHybrids, filterHybrids.splice(0, maxHybridByCol)];
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', right: '20px' }}>
        <input
          className="slider is-small is-primary"
          step="1"
          min="0"
          max="5"
          value={sliderValues.indexOf(nbByLine)}
          onChange={e => setnbByLine(sliderValues[e.target.value])}
          type="range"
        />
      </div>
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
    </div>
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
