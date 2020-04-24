import React from 'react';
import { Button, Box } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import ElementsDisplay from './ElementsDisplay';
import TemplateDisplay from './TemplateDisplay';

export const TemplatesDisplay = ({ templates }) => {
  return (
    <>
      <Box>
        <Link to="/template/new">
          <Button color="primary">Proposez un modèle de grille</Button>
        </Link>
      </Box>
      <ElementsDisplay
        ChildComponent={TemplateDisplay}
        getChildProps={template => ({ id: template.id })}
        elements={templates}
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
