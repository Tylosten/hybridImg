import React from 'react';
import { Button, Notification } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import ElementsDisplay from './ElementsDisplay';
import TemplateDisplay from './TemplateDisplay';

export const TemplatesDisplay = ({ templates, byLine }) => {
  return (
    <>
      <Notification color="primary" className="is-light">
        <Link to="/templates/new">
          <Button color="primary">Proposez un modèle de grille</Button>
        </Link>
      </Notification>
      <ElementsDisplay
        ChildComponent={TemplateDisplay}
        getChildProps={template => ({ id: template.id })}
        elements={templates}
        byLine={byLine}
      />
    </>
  );
};

const extraprops = store => {
  return {
    templates: Object.values(store.templates),
  };
};

export default StoreProvider(extraprops)(TemplatesDisplay);
