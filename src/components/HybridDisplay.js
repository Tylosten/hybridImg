import React from 'react';
import { Link } from 'react-router-dom';
import { Notification, Level, Tag, Image } from 'react-bulma-components';

export const HybridDisplay = ({ hybrid, hideTags }) => {
  return (
    <Notification className="box" style={{ padding: '0.2rem' }}>
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
    </Notification>
  );
};

export default HybridDisplay;
