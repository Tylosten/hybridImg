import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Columns, Box } from 'react-bulma-components';
const { Field, Label, Input, Control, Help } = Form;
const { Column } = Columns;

import StoreProvider from '../store/StoreProvider';
import { login } from '../store/StoreActions';

const Login = ({ dispatchToStore }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async e => {
    e.preventDefault();
    await dispatchToStore(login(username, password));

    return <Redirect to="/home" />;
  };

  return (
    <Columns className="is-centered">
      <Column className="is-narrow">
        <Box style={{ marginTop: '1.5rem' }}>
          <form>
            <Field>
              <Label>Nom</Label>
              <Control>
                <Input
                  placeholder="Votre nom"
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                  required
                />
                <Help
                  color="danger"
                  style={{ display: username ? 'none' : 'default' }}
                >
                  Ce champ est requis
                </Help>
              </Control>
            </Field>
            <Field>
              <Label>Mot de passe</Label>
              <Control>
                <Input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Help
                  color="danger"
                  style={{ display: password ? 'none' : 'default' }}
                >
                  Ce champ est requis
                </Help>
              </Control>
            </Field>
            <Field>
              <Control>
                <Link
                  className="button is-primary"
                  to="/home"
                  onClick={onSubmit}
                >
                  Se connecter
                </Link>
              </Control>
            </Field>
          </form>
        </Box>
      </Column>
    </Columns>
  );
};

function extraProps(store) {
  return {
    login: store.login,
  };
}

export default StoreProvider(extraProps)(Login);
