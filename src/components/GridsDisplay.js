import React from 'react';
import { Tile } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
import GridPreview from './GridPreview';

export const GridsDisplay = ({ grids, filter }) => {
  filter = { nbByLine: 4, ...filter };

  const filterGrids = grids.filter(g => {
    return (
      (!filter.user || filter.user === g.user) &&
      (!filter.tags ||
        filter.tags.every(
          t => g.lineThemes.includes(t) || g.lineThemes.includes(t)
        )) &&
      (!filter.name ||
        g.name.toLowerCase().match(`/.*${filter.name.toLowerCase()}.*/`))
    );
  });

  return (
    <>
      <br />
      <Tile className="is-ancestor">
        <Tile style={{ flexWrap: 'wrap' }}>
          {filterGrids.map(grid => (
            <div
              key={grid.id}
              className={`tile is-parent is-${12 / filter.nbByLine}`}
            >
              <Tile className="is-child">
                <GridPreview id={grid.id} />
              </Tile>
            </div>
          ))}
        </Tile>
      </Tile>
    </>
  );
};

function extraProps(store) {
  return {
    grids: Object.values(store.grids),
  };
}

export default StoreProvider(extraProps)(GridsDisplay);
