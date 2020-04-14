import React from 'react';
import { connect } from 'react-redux';

const HybridDisplay = ({ hybrid, tags }) => {
  return (
    <div className="box">
      <img className="image" src={hybrid.url} />
      <div className="level">
        {tags.map(tag => (
          <span key={tags.indexOf(tag)} className="tag">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
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
