import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tile, Image, Form, Button, Tag } from 'react-bulma-components';

import StoreProvider from './StoreProvider';

export const HybridDetails = props => {
  const { grids, saveHybrid } = props;
  const [hybrid, setHybrid] = useState(props.hybrid);
  const [tags, setTags] = useState(props.tags);

  const onTagSelect = e => {
    const tagId = e.target.value;
    if (tagId) {
      const tag = tags.find(t => t.id === tagId);
      setHybrid({ ...hybrid, tags: [...hybrid.tags, tag] });
      setTags(tags.filter(t => t.id !== tagId));
    }
  };

  const deleteTag = tag => {
    const newHybridTags = hybrid.tags.filter(t => t.id !== tag.id);
    setHybrid({ ...hybrid, tags: newHybridTags });
    const newTags = [...tags, tag];
    newTags.sort((a, b) => a.name > b.name);
    setTags(newTags);
  };

  const onSave = () => {
    saveHybrid({ ...hybrid, tags: hybrid.tags.map(t => t.id) });
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
                onChange={e => setHybrid({ ...hybrid, name: e.target.value })}
                placeholder="Nom de l'image"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Auteurice</Form.Label>
            <Form.Control>
              <Form.Input value={hybrid.user} disabled />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Grille</Form.Label>
            <Form.Control>
              <Form.Select
                className="is-rounded"
                onChange={e => setHybrid({ ...hybrid, grid: e.target.value })}
                value={hybrid.grid}
              >
                <option>...</option>
                {Object.values(grids).map(grid => (
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
                {Object.values(tags).map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Form.Select>

              <span>
                {hybrid.tags.map(tag => (
                  <Tag key={tag.id} color="info" style={{ margin: '5px' }}>
                    {tag.name}
                    <button
                      className="delete is-small"
                      onClick={() => deleteTag(tag)}
                    ></button>
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

function extraProps(store, props) {
  const id = props.match.params.id;
  const hybrid = store.getHybrid(id);
  return {
    hybrid,
    tags: Object.values(store.getState().tags).filter(
      t => !hybrid.tags.map(hybridTag => hybridTag.id).includes(t.id)
    ),
    grids: store.getState().grids,
    saveHybrid: store.saveHybrid,
  };
}

export default StoreProvider(extraProps)(HybridDetails);
