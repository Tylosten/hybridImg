import React from 'react';
import { connect } from 'react-redux';
import { Tile } from 'react-bulma-components';

import HybridDisplay from './HybridDisplay';

const HybridsDisplay = ({ hybrids }) => {
  const hybridByLine = 4; // Must be 1, 2, 3, 4, 6 or 12

  return (
    <>
      <br />
      <Tile className="is-ancestor">
        <Tile style={{ flexWrap: 'wrap' }}>
          {hybrids.map(hybrid => (
            <Tile
              key={hybrids.indexOf(hybrid)}
              className={`is-parent is-${12 / hybridByLine}`}
            >
              <Tile className="is-child">
                <HybridDisplay hybridId={hybrid.id} />
              </Tile>
            </Tile>
          ))}
        </Tile>
      </Tile>
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
