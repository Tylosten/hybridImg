import React from 'react';
import { Button, Card, Heading } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';

export const TemplateDisplay = ({ template, edit }) => {
  console.log(Card);
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>{template.name}</Card.Header.Title>
        {edit ? <div className="delete" /> : <></>}
      </Card.Header>
      <Card.Content></Card.Content>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

const extraprops = (store, props) => {
  const template = store.templates[props.id];
  console.log(template);
  return {
    template,
    edit: template.user === store.session.user.id,
  };
};

export default StoreProvider(extraprops)(TemplateDisplay);
