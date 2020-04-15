import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Image, Heading } from 'react-bulma-components';

const GridPreview = ({ grid, hybrids }) => {
  return (
    <Link to={`/grid/${grid.id}`}>
      <Box>
        <Heading>{grid.name}</Heading>
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
      </Box>
    </Link>
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
