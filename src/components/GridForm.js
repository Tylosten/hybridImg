import React, { useState } from 'react';
import { Button, Form, Box, Heading } from 'react-bulma-components';
const { Field, Input, Label, Control, Help, Checkbox, Select } = Form;
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import { createGrid } from '../store/StoreActions';

export const GridForm = props => {
  const { dispatchToStore, templates } = props;
  const [name, setName] = useState(`${props.template.name} - ${props.user}`);
  const [isOpen, setIsOpen] = useState(true);
  const [template, setTemplate] = useState(props.template);

  const onCreate = async () => {
    if (!name || !template) {
      return;
    }

    dispatchToStore(
      await createGrid({
        name,
        isOpen,
        template: template.id,
      })
    );
  };

  return (
    <Box>
      <Heading size={4}>Ajout d'une grille</Heading>
      <Field>
        <Label>Nom</Label>
        <Control>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {name ? <></> : <Help color="danger">Ce champ est requis</Help>}
        </Control>
      </Field>
      <Field>
        <Label>Ouverture aux autres auteurices</Label>
        <Control>
          <Checkbox
            checked={isOpen}
            onChange={e => setIsOpen(e.target.value)}
          />
        </Control>
      </Field>
      <Field>
        <Label>Modèle</Label>
        <Control>
          <Select
            value={template.id}
            onChange={e => setTemplate(e.target.value)}
          >
            {templates.map(t => (
              <option key={t.id}>{t.name}</option>
            ))}
          </Select>
        </Control>
      </Field>
      <Field className="is-grouped">
        <Control>
          <Link to="/grids">
            <Button color="primary" onClick={onCreate}>
              Créer
            </Button>
          </Link>
        </Control>
        <Control>
          <Link to="/grids">
            <Button>Annuler</Button>
          </Link>
        </Control>
      </Field>
    </Box>
  );
};

const extraprops = (store, props) => {
  return {
    templates: Object.values(store.templates),
    template: store.templates[props.match.params.templateId],
    user: store.session.user.name,
  };
};

export default StoreProvider(extraprops)(GridForm);
