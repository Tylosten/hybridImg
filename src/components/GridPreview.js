import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Tag,
  Notification,
  Button,
  Level,
  Modal,
  Card,
  Icon,
} from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
import { deleteGrid } from '../store/StoreActions';

export const GridPreview = ({ grid, dispatchToStore, edit, users }) => {
  const [showDelete, setShowDelete] = useState(false);

  const onDelete = () => {
    dispatchToStore(deleteGrid({ id: grid.id }));
  };

  return (
    <div style={{ position: 'relative' }}>
      <Modal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        closeOnBlur={true}
      >
        <Modal.Content>
          <Notification color="danger" className="is-light">
            <Heading>Voulez vous supprimer cette grille ?</Heading>
            <Level>
              <Button color="danger" onClick={onDelete}>
                Confirmer
              </Button>
              <Button onClick={() => setShowDelete(false)}>Annuler</Button>
            </Level>
          </Notification>
        </Modal.Content>
      </Modal>
      {edit ? (
        <div
          className="delete"
          style={{ position: 'absolute', top: '20px', right: '20px' }}
          onClick={() => setShowDelete(true)}
        ></div>
      ) : (
        <></>
      )}
      <Card>
        <Card.Header>
          <Card.Header.Title>{grid.name}</Card.Header.Title>
          <Level className="has-text-right">
            <Level.Side>
              <Level.Item>
                <Link to={`/grid/${grid.id}`}>
                  <Button color="white" data-tooltip="Voir la grille">
                    <Icon className="fa fa-eye" alt="Voir la grille" />
                  </Button>
                </Link>
              </Level.Item>
              <Level.Item>
                {edit ? (
                  <Button
                    color="white"
                    size="small"
                    onClick={() => setShowDelete(true)}
                    data-tooltip="Supprimer"
                  >
                    <Icon className="fa fa-trash" alt="Supprimer" />
                  </Button>
                ) : (
                  <></>
                )}
              </Level.Item>
            </Level.Side>
          </Level>
        </Card.Header>
        <Card.Content>
          <div>
            <span style={{ fontWeight: 'bold' }}>Participants : </span>
            {users.map(user => (
              <Link key={user.id}>
                <Tag color="warning">{user.name}</Tag>
              </Link>
            ))}
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Thèmes : </span>
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
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

function extraProps(store, props) {
  const grid = store.getGrid(props.id);
  return {
    grid,
    user: store.users[grid.user],
    users: store.getGridUsers(props.id),
    edit: store.session.user.id === grid.user,
  };
}

export default StoreProvider(extraProps)(GridPreview);
