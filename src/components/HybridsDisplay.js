import React from 'react';
import { Tile } from 'react-bulma-components';

import HybridDisplay from './HybridDisplay';
import StoreProvider from '../store/StoreProvider';

export const HybridsDisplay = ({ hybrids, filter }) => {
  filter = { nbByLine: 4, ...filter };

  const filterHybrids = hybrids.filter(h => {
    return (
      (!filter.user || filter.user === h.user) &&
      (!filter.grid || filter.grid === h.grid) &&
      (!filter.tags || filter.tags.every(t => h.tags.includes(t))) &&
      (!filter.name ||
        h.name.toLowerCase().match(`/.*${filter.name.toLowerCase()}.*/`))
    );
  });

  const maxHybridByCol = Math.max(
    1,
    Math.floor(hybrids.length / filter.nbByLine)
  );
  let gridHybrids = [];
  for (let i = 0; i < filter.nbByLine; i++) {
    gridHybrids = [...gridHybrids, filterHybrids.splice(0, maxHybridByCol)];
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
