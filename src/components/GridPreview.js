import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Tile } from 'react-bulma-components';

const GridPreview = ({ grid, hybrids }) => {
  return (
    <Card>
      <Card.Header>
        <div className="card-header-title">{grid.name}</div>
      </Card.Header>
      <Card.Content>
        <div style={{ flexWrap: 'wrap' }}>
          {hybrids.map(hybrid => (
            <div
              key={hybrids.indexOf(hybrid)}
              style={{ display: 'inline-block', marginRight: '10px' }}
            >
              <Image size={48} src={hybrid.url} />
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
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
