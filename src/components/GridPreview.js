import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Heading } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';

export const GridPreview = ({ grid, hybrids }) => {
  return (
    <Link to={`/grid/${grid.id}`}>
      <Box>
        <Heading size={4}>{grid.name}</Heading>
        <div style={{ flexWrap: 'wrap' }}>
          {hybrids.map(hybrid => (
            <div
              key={hybrid.id}
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

function extraProps(store, props) {
  return {
    grid: store.getGrid(props.id),
    hybrids: store.getGridHybrids(props.id),
  };
}

export default StoreProvider(extraProps)(GridPreview);
