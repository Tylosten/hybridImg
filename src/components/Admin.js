import React from 'react';
import { Notification, Tabs } from 'react-bulma-components';
import { Route } from 'react-router-dom';

import Tab from './Tab';
import AdminAddUser from './AdminAddUser';
import AdminUsersList from './AdminUsersList';

const Admin = () => {
  return (
    <>
      <Notification
        color="primary"
        className="is-light"
        style={{ paddingBottom: '0' }}
      >
        <Tabs className=" is-boxed">
          <Tab path="/admin">Gérer les utilisateurs</Tab>
          <Tab path="/admin/add">Ajouter un utilisateur</Tab>
        </Tabs>
      </Notification>
      <Notification color="white">
        <Route exact path="/admin/add">
          <AdminAddUser />
        </Route>
        <Route exact path="/admin">
          <AdminUsersList />
        </Route>
      </Notification>
    </>
  );
};

export default Admin;
