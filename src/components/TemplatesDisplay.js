import React from 'react';
import { Button, Box } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import ElementsDisplay from './ElementsDisplay';
import TemplateDisplay from './TemplateDisplay';

export const TemplatesDisplay = ({ templates, byLine }) => {
  return (
    <>
      <Box>
        <Link to="/templates/new">
          <Button color="primary">Proposez un modèle de grille</Button>
        </Link>
      </Box>
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
