import React from 'react';
import { Tabs, Notification } from 'react-bulma-components';
import { Route } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import GridsDisplay from './GridsDisplay';
import FilteredHybrids from './FilteredHybrids';
import TemplatesDisplay from './TemplatesDisplay';
import UserDetails from './UserDetails';
import Tab from './Tab';

const Home = ({ user }) => {
  return (
    <>
      <Notification
        color="primary"
        className="is-light"
        style={{ paddingBottom: '0' }}
      >
        <Tabs className=" is-boxed">
          <Tab path="/home">Vos informations</Tab>
          <Tab path="/home/template">Vos modèles</Tab>
          <Tab path="/home/grid">Vos grilles</Tab>
          <Tab path="/home/hybrid">Vos images</Tab>
        </Tabs>
      </Notification>
      <Notification color="white">
        <Route exact path="/home">
          <UserDetails user={user} />
        </Route>
        <Route exact path="/home/template">
          <TemplatesDisplay filter={{ user: user.id }} />
        </Route>
        <Route exact path="/home/grid">
          <GridsDisplay filter={{ user: user.id }} />
        </Route>
        <Route exact path="/home/hybrid">
          <FilteredHybrids filter={{ user: user.id }} hideFilter />
        </Route>
      </Notification>
    </>
  );
};

const extraprops = store => ({
  user: store.session.user,
});

export default StoreProvider(extraprops)(Home);
