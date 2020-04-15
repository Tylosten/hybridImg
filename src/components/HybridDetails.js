import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { Tile, Image, Form, Button, Tag } from 'react-bulma-components';

const HybridDetails = ({ id, tags, hybrid, setHybridTags }) => {
  const onTagSelect = event => {};

  const onSave = () => {
    setHybridTags(id, hybrid.tags.map(t => t.id));
  };

  return (
    <Tile className="is-ancestor">
      <Tile className="is-parent">
        <Tile className="is-parent is-4">
          <Tile className="is-child">
            <Image src={hybrid.url} alt={`Image ${hybrid.name}`} />
          </Tile>
        </Tile>
        <Tile className="is-child" style={{ padding: '10px' }}>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type="text"
                value={hybrid.name}
                onChange={e => (hybrid.name = e.target.value)}
                placeholder="Nom de l'image"
                disabled
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Auteurice</Form.Label>
            <Form.Control>
              <Form.Input
                value={hybrid.author.name}
                onChange={e => (hybrid.author.name = e.target.value)}
                disabled
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Grille</Form.Label>
            <Form.Control>
              <Form.Input
                value={hybrid.grid.name}
                onChange={e => (hybrid.grid.name = e.target.value)}
                disabled
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Label>Tags</Form.Label>
              <Form.Select className="is-rounded" onChange={onTagSelect}>
                <option>...</option>
                {tags.map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Form.Select>

              <span>
                {hybrid.tags.map(tag => (
                  <Tag key={tag.id} color="info" style={{ margin: '5px' }}>
                    {tag.name}
                    <span className="delete is-small"></span>
                  </Tag>
                ))}
              </span>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Link to="/home">
                <Button color="primary" onClick={onSave}>
                  Save
                </Button>
              </Link>
            </Form.Control>
          </Form.Field>
        </Tile>
      </Tile>
    </Tile>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const hybrid = state.hybrids.find(h => h.id === id);
  const tags = state.themes;
  tags.sort((a, b) => a.name > b.name);
  hybrid.tags = state.themes.filter(t => hybrid.tags.includes(t.id));
  hybrid.author = state.users.find(u => hybrid.author === u.id);
  hybrid.grid = state.grids.find(g => hybrid.grid === g.id);

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

const ConnectedHybridDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(HybridDetails);

export default ConnectedHybridDetails;
