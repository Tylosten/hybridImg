import React from 'react';
import { Tile } from 'react-bulma-components';

import StoreProvider from './StoreProvider';
import GridPreview from './GridPreview';

const GridsDisplay = ({ grids }) => {
  const gridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12
  return (
    <>
      <br />
      <Tile className="is-ancestor">
        <Tile style={{ flexWrap: 'wrap' }}>
          {Object.values(grids).map(grid => (
            <div
              key={grid.id}
              className={`tile is-parent is-${12 / gridByLine}`}
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
    grids: store.getState().grids,
  };
}

export default StoreProvider(extraProps)(GridsDisplay);
