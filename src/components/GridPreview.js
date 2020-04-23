import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Heading, Media, Tag, Form } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
export const GridPreview = ({ grid, hybrids, user }) => {
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
            <Form.Field>
              <Form.Label>Auteurice</Form.Label>
              <Form.Control>{user.name}</Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Thèmes</Form.Label>
              <Form.Control>
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
              </Form.Control>
            </Form.Field>
          </Media.Content>
        </Media>
      </Box>
    </Link>
  );
};

function extraProps(store, props) {
  const grid = store.getGrid(props.id);
  return {
    grid,
    hybrids: store.getGridHybrids(props.id),
    user: Object.values(store.users).find(u => u.id === grid.user),
  };
}

export default StoreProvider(extraProps)(GridPreview);
