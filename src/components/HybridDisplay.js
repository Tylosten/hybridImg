import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Level, Tag } from 'react-bulma-components';

const HybridDisplay = ({ hybrid, tags }) => {
  return (
    <Box>
      <Link to={`/hybrid/${hybrid.id}`}>
        <img className="image" src={hybrid.url} />
      </Link>
      <Level style={{ flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <Tag key={tags.indexOf(tag)} color="info">
            {tag.name}
          </Tag>
        ))}
      </Level>
    </Box>
  );
};

function mapStateToProps(state, ownProps) {
  const hybrid = state.hybrids.find(hybrid => hybrid.id === ownProps.hybridId);
  const tags = state.themes.filter(tag => hybrid.tags.includes(tag.id));
  return {
    hybrid,
    tags,
  };
}

const ConnectedHybridDisplay = connect(mapStateToProps)(HybridDisplay);
export default ConnectedHybridDisplay;
