import React from 'react';
import { Tile, Heading, Card, Notification } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
import GridsDisplay from './GridsDisplay';
import HybridsDisplay from './HybridsDisplay';

const Home = ({ user }) => {
  return (
    <Tile className="is-ancestor is-vertical">
      <Tile className="is-parent">
        <Tile className="is-child">
          <Notification color="primary" className="is-light">
            <Heading size={2}>{`Bonjour ${user.name}`}</Heading>
          </Notification>
        </Tile>
      </Tile>
      <Tile>
        <Tile className="is-parent">
          <Tile className="is-child">
            <Card>
              <Card.Header>
                <Card.Header.Title>Vos grilles</Card.Header.Title>
              </Card.Header>
              <Card.Content>
                <GridsDisplay />
              </Card.Content>
            </Card>
          </Tile>
        </Tile>
        <Tile className="is-parent">
          <Tile className="is-child">
            <Card>
              <Card.Header>
                <Card.Header.Title>Vos images</Card.Header.Title>
              </Card.Header>
              <Card.Content>
                <HybridsDisplay />
              </Card.Content>
            </Card>
          </Tile>
        </Tile>
      </Tile>
    </Tile>
  );
};

const extraprops = store => ({
  user: store.session.user,
});

export default StoreProvider(extraprops)(Home);
