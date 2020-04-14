import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const GridPreview = ({ grid, hybrids }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{grid.name}</div>
      </div>
      <div className="card-content" style={{ overflowX: 'auto' }}>
        {hybrids.map(hybrid => (
          <img
            key={hybrids.indexOf(hybrid)}
            className=" image is-48x48"
            src={hybrid.url}
            style={{ display: 'inline', marginRight: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    grid: state.grids.find(g => g.id === ownProps.gridId),
    hybrids: state.hybrids.filter(h => h.grid === ownProps.gridId),
  };
}

const ConnectedGridPreview = connect(mapStateToProps)(GridPreview);
export default ConnectedGridPreview;
