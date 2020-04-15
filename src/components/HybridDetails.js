import React from 'react';
import { connect, dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { Tile } from 'react-bulma-components';

const HybridDetails = ({ id, tags, hybrid, setHybridTags }) => {
  const onTagSelect = event => {
    console.log(event.target.value);
  };

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <figure className="image">
              <img src={hybrid.url} alt={`Image ${hybrid.name}`} />
            </figure>
          </div>
        </div>
        <div className="tile is-child" style={{ padding: '10px' }}>
          <form className="container">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={hybrid.name}
                  placeholder="Nom de l'image"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Auteurice</label>
              <div className="control">
                <input className="input" value={hybrid.author.name} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Tags</label>
                <div className="select is-rounded">
                  <select onChange={onTagSelect}>
                    <option>...</option>
                    {tags.map(tag => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  {hybrid.tags.map(tag => (
                    <span
                      key={tag.id}
                      className="tag is-info "
                      style={{ margin: '5px' }}
                    >
                      {tag.name}
                      <div className="delete is-small"></div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <Link to="/home">
                  <div className="button is-primary">Save</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const hybrid = state.hybrids.find(h => h.id === id);
  const tags = state.themes;
  tags.sort((a, b) => a.name > b.name);
  hybrid.tags = state.themes.filter(t => hybrid.tags.includes(t.id));
  hybrid.author = state.users.filter(u => hybrid.author === u.id);

  return {
    id,
    hybrid,
    tags,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setHybridTags(id, tags) {
      dispatch(mutations.setHybridTags(id, tags));
    },
  };
};

const ConnectedHybridDetails = connect(mapStateToProps)(HybridDetails);

export default ConnectedHybridDetails;
