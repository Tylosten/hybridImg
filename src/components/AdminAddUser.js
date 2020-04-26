import React, { useState } from 'react';

import StoreProvider from '../store/StoreProvider';
import { createUser } from '../store/StoreActions';
import UserForm from './UserForm';

const AdminAddUser = ({ dispatchToStore }) => {
  const [help, setHelp] = useState();
  const [helpColor, setHelpColor] = useState();
  const onCreateUser = (username, password) => {
    dispatchToStore(createUser({ username, password }))
      .then(() => {
        setHelp('Utilisateur ajouté');
        setHelpColor('success');
      })
      .catch(err => {
        setHelp(`Erreur : ${err.response.data.message}`);
        setHelpColor('danger');
      });
  };
  return (
    <UserForm
      submitLabel="Ajouter"
      onSubmit={onCreateUser}
      help={help}
      helpColor={helpColor}
    />
  );
};

export default StoreProvider()(AdminAddUser);
