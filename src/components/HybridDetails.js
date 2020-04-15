import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { Tile, Image, Form, Button, Tag } from 'react-bulma-components';

const HybridDetails = props => {
  const [tags, setTags] = useState(props.tags);
  const [grid, setGrid] = useState(props.grid);
  const [name, setName] = useState(props.name);
  const [hybridTags, setHybridTags] = useState(props.hybridTags);
  const { id, url, user, grids, updateHybrid } = props;

  const onTagSelect = event => {
    const tagId = event.target.value;
    if (tagId) {
      const tag = tags.find(t => t.id === tagId);
      setHybridTags([...hybridTags, tag]);
      setTags(tags.filter(t => t.id !== tagId));
    }
  };

  const deleteTag = tag => {
    const newHybridTags = hybridTags.filter(t => t.id !== tag.id);
    setHybridTags(newHybridTags);
    const newTags = [...tags, tag];
    newTags.sort((a, b) => a.name > b.name);
    setTags(newTags);
  };

  const onSave = () => {
    updateHybrid(id, name, grid, hybridTags.map(t => t.id));
  };

  return (
    <Tile className="is-ancestor">
      <Tile className="is-parent">
        <Tile className="is-parent is-4">
          <Tile className="is-child">
            <Image src={url} alt={`Image ${name}`} />
          </Tile>
        </Tile>
        <Tile className="is-child" style={{ padding: '10px' }}>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom de l'image"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Auteurice</Form.Label>
            <Form.Control>
              <Form.Input value={user} disabled />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Grille</Form.Label>
            <Form.Control>
              <Form.Select
                className="is-rounded"
                onChange={event => setGrid(event.target.value)}
                value={grid}
              >
                {grids.map(grid => (
                  <option key={grid.id} value={grid.id}>
                    {grid.name}
                  </option>
                ))}
              </Form.Select>
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
                {hybridTags.map(tag => (
                  <Tag key={tag.id} color="info" style={{ margin: '5px' }}>
                    {tag.name}
                    <span
                      className="delete is-small"
                      onClick={() => deleteTag(tag)}
                    ></span>
                  </Tag>
                ))}
              </span>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Link to="/hybrids">
                <Button color="primary" onClick={onSave}>
                  Enregister
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
  const hybrid = { ...state.hybrids.find(h => h.id === id) };
  const tags = state.themes.filter(t => !hybrid.tags.includes(t.id));
  tags.sort((a, b) => a.name > b.name);
  hybrid.tags = state.themes.filter(t => hybrid.tags.includes(t.id));
  hybrid.user = state.users.find(u => hybrid.user === u.id);

  return {
    id,
    hybridTags: hybrid.tags,
    name: hybrid.name,
    grid: hybrid.grid,
    url: hybrid.url,
    user: hybrid.user.name,
    tags,
    grids: state.grids.filter(g => hybrid.user.id === g.user),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    updateHybrid(id, name, grid, tags) {
      dispatch(mutations.setHybridName(id, name));
      dispatch(mutations.setHybridGrid(id, grid));
      dispatch(mutations.setHybridTags(id, tags));
    },
  };
};

const ConnectedHybridDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(HybridDetails);

export default ConnectedHybridDetails;
