import React, { useState } from 'react';
import { Button, Form, Box, Heading } from 'react-bulma-components';
const { Field, Input, Label, Control, Help, Checkbox, Select } = Form;

import StoreProvider from '../store/StoreProvider';
import { createGrid } from '../store/StoreActions';

export const GridForm = props => {
  const { dispatchToStore, templates, history } = props;
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [templateId, setTemplateId] = useState(props.templateId);

  const onCreate = async () => {
    if (!templateId) {
      return;
    }

    await dispatchToStore(
      createGrid({
        name,
        isOpen,
        template: templateId,
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
        </Control>
      </Field>
      <Field>
        <Label>Ouverture aux autres auteurices</Label>
        <Control>
          <Checkbox
            checked={isOpen}
            onChange={e => setIsOpen(e.target.checked)}
          />
        </Control>
      </Field>
      <Field>
        <Label>Modèle</Label>
        <Control>
          <Select
            value={templateId}
            onChange={e => setTemplateId(e.target.value)}
          >
            <option></option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
          {templateId ? <></> : <Help color="danger">Ce champ est requis</Help>}
        </Control>
      </Field>
      <Field className="is-grouped">
        <Control>
          <Button color="primary" onClick={onCreate}>
            Créer
          </Button>
        </Control>
        <Control>
          <Button onClick={() => history.goBack()}>Annuler</Button>
        </Control>
      </Field>
    </Box>
  );
};

const extraprops = (store, props) => {
  let templateId = props.match.params.templateId;
  templateId = store.templates[templateId] ? templateId : undefined;
  return {
    templates: Object.values(store.templates),
    templateId,
    user: store.session.user.name,
  };
};

export default StoreProvider(extraprops)(GridForm);
