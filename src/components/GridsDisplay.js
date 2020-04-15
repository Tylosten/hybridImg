import React from 'react';
import { connect } from 'react-redux';
import { Tile } from 'react-bulma-components';

import GridPreview from './GridPreview';

const GridsDisplay = ({ grids }) => {
  const gridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12

  return (
    <Tile className="is-ancestor">
      <Tile style={{ flexWrap: 'wrap' }}>
        {grids.map(grid => (
          <div
            key={grids.indexOf(grid)}
            className={`tile is-parent is-${12 / gridByLine}`}
          >
            <Tile className="is-child">
              <GridPreview gridId={grid.id} />
            </Tile>
          </div>
        ))}
      </Tile>
    </Tile>
  );
};

function mapStateToProps(state) {
  return {
    grids: state.grids,
  };
}

const ConnectedGridsDisplay = connect(mapStateToProps)(GridsDisplay);
export default ConnectedGridsDisplay;
