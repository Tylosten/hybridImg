import React, { useState } from 'react';
import { Button, Form, Box, Heading } from 'react-bulma-components';
const { Field, Input, Label, Control, Help } = Form;
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import { createGrid } from '../store/StoreActions';
import SelectCreateTags from './SelectCreateTags';

export const GridForm = ({ dispatchToStore }) => {
  const [name, setName] = useState();
  const [lineThemes, setLineThemes] = useState([]);
  const [colThemes, setColThemes] = useState([]);

  const onCreate = async () => {
    if (!name) {
      return;
    }

    if (lineThemes.length == 0 || colThemes.length === 0) {
      return;
    }

    dispatchToStore(
      await createGrid({
        name,
        lineThemes,
        colThemes,
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
        <Label>Thèmes en colonne</Label>
        <Control>
          <SelectCreateTags
            color="info"
            onChange={selected => {
              setColThemes(selected);
            }}
          />
          {colThemes.length === 0 ? (
            <Help color="danger">Il faut au moins un thème</Help>
          ) : (
            <></>
          )}
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
          {lineThemes.length === 0 ? (
            <Help color="danger">Il faut au moins un thème</Help>
          ) : (
            <></>
          )}
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

export default StoreProvider()(GridForm);
