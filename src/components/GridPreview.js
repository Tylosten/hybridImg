import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Media,
  Tag,
  Form,
  Notification,
  Button,
  Level,
  Modal,
} from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
import { deleteGrid } from '../store/StoreActions';

export const GridPreview = ({
  grid,
  hybrids,
  template,
  user,
  dispatchToStore,
  edit,
}) => {
  const hybrid = hybrids[Math.floor(Math.random() * hybrids.length)];
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
      <Link to={`/grid/${grid.id}`}>
        <Box>
          <Heading size={4}>{grid.name}</Heading>
          <Media>
            <Media.Content>
              <figure className="image is-square is-96x96">
                <img
                  src={hybrid ? hybrid.url : ''}
                  alt={`Image de la grille ${grid.name}`}
                />
              </figure>
            </Media.Content>
            <Media.Content>
              <Form.Field>
                <Form.Label>Auteurice</Form.Label>
                <Form.Control>{user.name}</Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label>Thèmes</Form.Label>
                <Form.Control>
                  <div>
                    {template.colThemes.map(tag => (
                      <Tag key={tag.id} color="info">
                        {tag.name}
                      </Tag>
                    ))}
                  </div>
                  <div>
                    {template.lineThemes.map(tag => (
                      <Tag key={tag.id} color="info" className="is-light">
                        {tag.name}
                      </Tag>
                    ))}
                  </div>
                </Form.Control>
              </Form.Field>
            </Media.Content>
          </Media>
        </Box>
      </Link>
    </div>
  );
};

function extraProps(store, props) {
  const grid = store.getGrid(props.id);
  return {
    grid,
    hybrids: store.getGridHybrids(props.id),
    template: store.getGridTemplate(props.id),
    user: store.users[grid.user],
    edit: store.session.user.id === grid.user,
  };
}

export default StoreProvider(extraProps)(GridPreview);
