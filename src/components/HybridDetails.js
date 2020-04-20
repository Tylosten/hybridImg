import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tile,
  Image,
  Form,
  Button,
  Tag,
  Icon,
  Notification,
  Heading,
} from 'react-bulma-components';
const { Field, Control, Input, Label, Select } = Form;

import StoreProvider from '../store/StoreProvider';
import { updateHybrid, deleteHybrid } from '../store/StoreActions';

export const HybridDetails = props => {
  const { grids, edit, dispatchToStore } = props;
  const [hybrid, setHybrid] = useState(props.hybrid);
  const [tags, setTags] = useState(props.tags);
  const [alertDelete, setAlertDelete] = useState(false);

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
    dispatchToStore(
      updateHybrid({ ...hybrid, tags: hybrid.tags.map(t => t.id) })
    );
  };

  const onCancel = () => {
    setHybrid(props.hybrid);
    setTags(props.tags);
  };

  const onDelete = async () => {
    dispatchToStore(deleteHybrid(hybrid.id));
  };

  return (
    <>
      {alertDelete ? (
        <div
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            width: '100%',
            height: '100%',
            zIndex: 5,
            backgroundColor: '#0008',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '50%',
              right: '50%',
            }}
          >
            <Notification
              color="danger"
              className="alert is-light"
              style={{
                position: 'relative',
                top: '-50%',
                right: '-50%',
              }}
            >
              <Heading size={5}>
                Voulez vous vraiment supprimer cette image ?
              </Heading>
              <Field className="is-grouped">
                <Control>
                  <Link to="/hybrids">
                    <Button color="danger" onClick={onDelete}>
                      Supprimer
                    </Button>
                  </Link>
                </Control>
                <Control>
                  <Button onClick={() => setAlertDelete(false)}>Annuler</Button>
                </Control>
              </Field>
            </Notification>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Tile className="is-ancestor">
        <Tile className="is-parent">
          <Tile className="is-parent is-4">
            <Tile className="is-child">
              <Image src={hybrid.url} alt={`Image ${hybrid.name}`} />
            </Tile>
          </Tile>
          <Tile className="is-child" style={{ padding: '10px' }}>
            <Field>
              <Control>
                <Input
                  type="text"
                  value={hybrid.name}
                  onChange={e => setHybrid({ ...hybrid, name: e.target.value })}
                  placeholder="Nom de l'image"
                  disabled={!edit}
                />
              </Control>
            </Field>
            <Field>
              <Label>Auteurice</Label>
              <Control>
                <Input value={hybrid.user.name} disabled />
              </Control>
            </Field>
            <Field>
              <Label>Grille</Label>
              <Control>
                <Select
                  className="is-rounded"
                  onChange={e => setHybrid({ ...hybrid, grid: e.target.value })}
                  value={hybrid.grid}
                  disabled={!edit}
                >
                  <option>...</option>
                  {Object.values(grids).map(grid => (
                    <option key={grid.id} value={grid.id}>
                      {grid.name}
                    </option>
                  ))}
                </Select>
              </Control>
            </Field>
            <Field>
              <Control>
                <Label>Tags</Label>
                {edit ? (
                  <Select className="is-rounded" onChange={onTagSelect}>
                    <option>...</option>
                    {Object.values(tags).map(tag => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <></>
                )}

                <span>
                  {hybrid.tags.map(tag => (
                    <Tag key={tag.id} color="info" style={{ margin: '5px' }}>
                      {tag.name}
                      {edit ? (
                        <button
                          className="delete is-small"
                          onClick={() => deleteTag(tag)}
                        ></button>
                      ) : (
                        <></>
                      )}
                    </Tag>
                  ))}
                </span>
              </Control>
            </Field>
            {edit ? (
              <>
                <Field className="is-grouped has-addons">
                  <Control>
                    <Link to="/hybrids">
                      <Button color="primary" onClick={onSave} disabled={!edit}>
                        <Icon className="fa fa-save" />
                        <span>Editer</span>
                      </Button>
                    </Link>
                  </Control>
                  <Control>
                    <Button onClick={onCancel} disabled={!edit}>
                      <span>Annuler</span>
                    </Button>
                  </Control>
                  <Control>
                    <Button
                      color="danger"
                      onClick={() => setAlertDelete(true)}
                      disabled={!edit}
                    >
                      <Icon className="fa fa-trash" />
                      <span>Supprimer</span>
                    </Button>
                  </Control>
                </Field>
              </>
            ) : (
              <></>
            )}
          </Tile>
        </Tile>
      </Tile>
    </>
  );
};

function extraProps(store, props) {
  const id = props.match.params.id;
  const hybrid = store.getHybrid(id);
  return {
    hybrid,
    tags: Object.values(store.tags).filter(
      t => !hybrid.tags.map(hybridTag => hybridTag.id).includes(t.id)
    ),
    grids: Object.values(store.grids).filter(g => g.user === hybrid.user.id),
    saveHybrid: store.saveHybrid,
    edit:
      hybrid && store.session.user && hybrid.user.id === store.session.user.id,
  };
}

export default StoreProvider(extraProps)(HybridDetails);
