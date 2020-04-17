import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Level, Tag, Image } from 'react-bulma-components';

export const HybridDisplay = ({ hybrid, hideTags }) => {
  return (
    <Box>
      <Link to={`/hybrid/${hybrid.id}`}>
        <Image src={hybrid.url} />
      </Link>
      <Level
        style={{ flexWrap: 'wrap', display: hideTags ? 'none' : 'default' }}
      >
        {hybrid.tags.map(tag => (
          <Tag key={tag.id} color="info">
            {tag.name}
          </Tag>
        ))}
      </Level>
    </Box>
  );
};

export default HybridDisplay;
