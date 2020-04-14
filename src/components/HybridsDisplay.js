import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import HybridDisplay from './HybridDisplay';

const HybridsDisplay = ({ hybrids }) => {
  const hybridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12

  return (
    <>
      <br />
      <div className="tile is-ancestor">
        <div className="tile" style={{ flexWrap: 'wrap' }}>
          {hybrids.map(hybrid => (
            <div
              key={hybrids.indexOf(hybrid)}
              className={`tile is-parent is-${12 / hybridByLine}`}
            >
              <div className="tile is-child">
                <HybridDisplay hybridId={hybrid.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    hybrids: state.hybrids,
  };
}

const ConnectedHybridsDisplay = connect(mapStateToProps)(HybridsDisplay);
export default ConnectedHybridsDisplay;
