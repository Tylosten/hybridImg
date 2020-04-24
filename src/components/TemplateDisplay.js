import React, { useState } from 'react';
import {
  Button,
  Card,
  Icon,
  Tag,
  Notification,
  Heading,
  Level,
} from 'react-bulma-components';
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import { deleteTemplate } from '../store/StoreActions';
import AlertMessage from './AlertMessage';

export const TemplateDisplay = ({
  template,
  edit,
  canDelete,
  grids,
  userId,
  dispatchToStore,
}) => {
  const [showDelete, setShowDelete] = useState(false);

  const onDelete = () => {
    dispatchToStore(deleteTemplate({ id: template.id }));
    setShowDelete(false);
  };

  return (
    <>
      <AlertMessage show={showDelete} closeFn={() => setShowDelete(false)}>
        {canDelete ? (
          <Notification color="danger" className="is-light">
            <Heading>Voulez vous supprimer ce modèle ?</Heading>
            <Level>
              <Button color="danger" onClick={onDelete}>
                Confirmer
              </Button>
              <Button onClick={() => setShowDelete(false)}>Annuler</Button>
            </Level>
          </Notification>
        ) : (
          <Notification color="danger" className="is-light">
            <Heading>
              Suppression impossible. Des grilles sont associées à ce modèle.
            </Heading>
          </Notification>
        )}
      </AlertMessage>
      <Card>
        <Card.Header>
          <Card.Header.Title>{template.name}</Card.Header.Title>
          {edit ? (
            <div className="delete" onClick={() => setShowDelete(true)} />
          ) : (
            <></>
          )}
        </Card.Header>
        <Card.Content>
          <div>
            <span style={{ fontWeight: 'bold' }}>Grilles associées : </span>
            {grids.map(grid => (
              <Link key={grid.id} to={`/grid/${grid.id}`}>
                <Tag color="warning">{grid.name}</Tag>
              </Link>
            ))}
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Thèmes : </span>
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
          </div>
        </Card.Content>
        <Card.Footer className="has-text-right">
          <Link to={`/grids/new/${template.id}`}>
            <Button color="white">
              <Icon className="fa fa-plus" />
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
};

const extraprops = (store, props) => {
  const template = store.getTemplate(props.id);
  const edit = template.user === store.session.user.id;
  const grids = Object.values(store.grids).filter(
    g => g.template === template.id
  );
  return {
    template,
    edit,
    grids,
    userId: store.session.user.id,
    canDelete: edit && grids.length === 0,
  };
};

export default StoreProvider(extraprops)(TemplateDisplay);
