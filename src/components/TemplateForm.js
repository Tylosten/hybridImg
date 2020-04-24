import React, { useState } from 'react';
import { Button, Form, Box, Heading } from 'react-bulma-components';
const { Field, Input, Label, Control, Help } = Form;
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import { createTemplate, createTag } from '../store/StoreActions';
import SelectCreateTags from './SelectCreateTags';

export const TemplateForm = ({ dispatchToStore }) => {
  const [name, setName] = useState();
  const [lineThemes, setLineThemes] = useState([]);
  const [colThemes, setColThemes] = useState([]);
  const [missingLineThemes, setMissingLineThemes] = useState([]);
  const [missingColThemes, setMissingColThemes] = useState([]);

  const onCreate = () => {
    if (!name) {
      return;
    }
    missingLineThemes.map(tag => {
      dispatchToStore(createTag(tag));
    });
    missingColThemes.map(tag => {
      dispatchToStore(createTag(tag));
    });
    dispatchToStore(
      createTemplate({
        name,
        lineThemes: lineThemes.map(tag => tag.id),
        colThemes: colThemes.map(tag => tag.id),
      })
    );
  };

  return (
    <Box>
      <Heading size={4}>Ajout d'un modèle de grille</Heading>
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
        <Label>Thèmes en colonne</Label>
        <Control>
          <SelectCreateTags
            color="info"
            onChange={(selected, toCreate) => {
              setColThemes(selected);
              setMissingColThemes(toCreate);
            }}
          />
        </Control>
      </Field>
      <Field>
        <Label>Thèmes en ligne</Label>
        <Control>
          <SelectCreateTags
            color="info"
            onChange={(selected, toCreate) => {
              setLineThemes(selected);
              setMissingLineThemes(toCreate);
            }}
          />
        </Control>
      </Field>
      <Field className="is-grouped">
        <Control>
          <Link to="/templates">
            <Button color="primary" onClick={onCreate}>
              Créer
            </Button>
          </Link>
        </Control>
        <Control>
          <Link to="/templates">
            <Button>Annuler</Button>
          </Link>
        </Control>
      </Field>
    </Box>
  );
};

export default StoreProvider()(TemplateForm);
