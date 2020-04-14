import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import GridPreview from './GridPreview';

const GridsDisplay = ({ grids }) => {
  const gridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12

  return (
    <div className="tile is-ancestor">
      <div className="tile" style={{ flexWrap: 'wrap' }}>
        {grids.map(grid => (
          <div
            key={grids.indexOf(grid)}
            className={`tile is-parent is-${12 / gridByLine}`}
          >
            <div className="tile is-child">
              <GridPreview gridId={grid.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    grids: state.grids,
  };
}

const ConnectedGridsDisplay = connect(mapStateToProps)(GridsDisplay);
export default ConnectedGridsDisplay;
