import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Columns, Message } from 'react-bulma-components';
const { Column } = Columns;

import StoreProvider from '../store/StoreProvider';
import { login } from '../store/StoreActions';
import UserForm from './UserForm';

const Login = ({ authenticated, dispatchToStore }) => {
  const [help, setHelp] = useState('');

  const onSubmit = async (username, password) => {
    dispatchToStore(login(username, password)).catch(err => {
      setHelp(`Erreur : ${err.response.data || err.message}`);
    });
  };

  return (
    <>
      {authenticated ? (
        <Redirect to="/home" />
      ) : (
        <Columns className="is-centered">
          <Column className="is-narrow">
            <Message style={{ marginTop: '1.5rem' }}>
              <Message.Header>Connexion</Message.Header>
              <Message.Body>
                <UserForm
                  submitLabel="Se connecter"
                  onSubmit={onSubmit}
                  help={help}
                />
              </Message.Body>
            </Message>
          </Column>
        </Columns>
      )}
    </>
  );
};

function extraProps(store) {
  return {
    authenticated: store.session.authenticated,
  };
}

export default StoreProvider(extraProps)(Login);
