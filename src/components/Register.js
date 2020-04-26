import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Columns, Message } from 'react-bulma-components';

import UserForm from './UserForm';
import { login, createUser } from '../store/StoreActions';
import StoreProvider from '../store/StoreProvider';

const Register = ({ dispatchToStore, authenticated }) => {
  const [help, setHelp] = useState();

  const onSubmit = (username, password) => {
    dispatchToStore(createUser({ username, password }))
      .then(() => {
        dispatchToStore(login(username, password)).catch(err => {
          setHelp(
            `Erreur : Vous êtes inscrit mais nous n'avons pas pu vous connecter (${err.response.data.message})`
          );
        });
      })
      .catch(err => {
        setHelp(`Erreur : ${err.response.data.message}`);
      });
  };

  return (
    <>
      {authenticated ? (
        <Redirect to="/home" />
      ) : (
        <Columns className="is-centered">
          <Columns.Column className="is-narrow">
            <Message style={{ marginTop: '1.5rem' }}>
              <Message.Header>Inscription</Message.Header>
              <Message.Body>
                <UserForm
                  onSubmit={onSubmit}
                  submitLabel="S'inscrire"
                  help={help}
                  withCheck
                />
              </Message.Body>
            </Message>
          </Columns.Column>
        </Columns>
      )}
    </>
  );
};

const extraProps = store => ({
  authenticated: store.session.authenticated,
});

export default StoreProvider(extraProps)(Register);
