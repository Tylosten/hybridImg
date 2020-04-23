import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Heading, Media, Tag } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
export const GridPreview = ({ grid, hybrids }) => {
  const hybrid = hybrids[Math.floor(Math.random() * hybrids.length)];
  return (
    <Link to={`/grid/${grid.id}`}>
      <Box>
        <Heading size={4}>{grid.name}</Heading>
        <Media>
          <Media.Content>
            <figure className="image is-square is-96x96">
              <img src={hybrid.url} />
            </figure>
          </Media.Content>
          <Media.Content>
            <div>
              {grid.colThemes.map(tag => (
                <Tag key={tag.id} color="info">
                  {tag.name}
                </Tag>
              ))}
            </div>
            <div>
              {grid.lineThemes.map(tag => (
                <Tag key={tag.id} color="info" className="is-light">
                  {tag.name}
                </Tag>
              ))}
            </div>
          </Media.Content>
        </Media>
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
