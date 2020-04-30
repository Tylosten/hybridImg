import React, { useState } from 'react';
import { Button, Form, Box, Heading } from 'react-bulma-components';
const { Field, Input, Label, Control, Help } = Form;
import { useHistory } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import { createGrid } from '../store/StoreActions';
import SelectCreateTags from './SelectCreateTags';

export const GridForm = ({ dispatchToStore }) => {
  const [name, setName] = useState();
  const [help, setHelp] = useState();
  const [lineThemes, setLineThemes] = useState([]);
  const [colThemes, setColThemes] = useState([]);
  const history = useHistory();

  const onCreate = async () => {
    if (!verifyForm()) {
      return;
    }

    dispatchToStore(
      createGrid({
        name,
        lineThemes,
        colThemes,
      })
    )
      .then(() => {
        history.goBack();
      })
      .catch(err => {
        setHelp(`Erreur : ${err.response.data.message}`);
      });
  };

  const verifyForm = () => {
    return (
      name &&
      lineThemes.length > 0 &&
      colThemes.length > 0 &&
      lineThemes.every(l => colThemes.every(c => c.name !== l.name))
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
            placeholder="Nom"
            onChange={e => setName(e.target.value)}
          />
          <Help color="danger">{!name ? 'Ce champ est requis' : ''}</Help>
        </Control>
      </Field>
      <Field>
        <Label>Thèmes en colonne</Label>
        <Control>
          <SelectCreateTags
            color="info"
            onChange={selected => {
              setColThemes(selected);
            }}
          />
          <Help color="danger">
            {colThemes.length === 0 ? 'Il faut au moins un thème' : ''}
          </Help>
        </Control>
      </Field>
      <Field>
        <Label>Thèmes en ligne</Label>
        <Control>
          <SelectCreateTags
            color="info"
            onChange={selected => {
              setLineThemes(selected);
            }}
          />
          <Help color="danger">
            {lineThemes.length === 0 ? 'Il faut au moins un thème' : ''}
          </Help>
          <Help color="danger">
            {lineThemes.some(l => colThemes.some(c => c.name === l.name))
              ? 'Un thème est dupliqué en ligne et colonne'
              : ''}
          </Help>
        </Control>
      </Field>
      <Help color="danger">{help}</Help>
      <Field className="is-grouped">
        <Control>
          <Button color="primary" onClick={onCreate} disabled={!verifyForm()}>
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

export default StoreProvider()(GridForm);
