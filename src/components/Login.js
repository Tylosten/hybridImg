import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Columns, Box } from 'react-bulma-components';
const { Field, Label, Input, Control, Help } = Form;
const { Column } = Columns;

import StoreProvider from '../store/StoreProvider';
import { login } from '../store/StoreActions';

const Login = ({ authenticated, dispatchToStore }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async e => {
    e.preventDefault();
    await dispatchToStore(login(username, password));
  };

  return (
    <>
      {authenticated ? (
        <Redirect to="/home" />
      ) : (
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
                    />{' '}
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
                    <Button color="primary" onClick={onSubmit}>
                      Se connecter
                    </Button>
                  </Control>
                </Field>
              </form>
            </Box>
          </Column>
        </Columns>
      )}
    </>
  );
};

function extraProps(store) {
  return {
    login: store.login,
    authenticated: store.session.authenticated,
  };
}

export default StoreProvider(extraProps)(Login);
