import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Heading, Icon, Button } from 'react-bulma-components';
import StoreProvider from '../store/StoreProvider';
import { logout } from '../store/StoreActions';

export const Navigation = ({ store, dispatchToStore }) => {
  const onLogOut = () => {
    dispatchToStore(logout());
  };
  return (
    <>
      <Navbar color="dark" role="navigation" aria-label="main navigation">
        <Navbar.Brand>
          <Link to="/home" className="navbar-item">
            <Heading style={{ color: 'inherit' }}>Hybrides</Heading>
          </Link>
          <Navbar.Burger
            data-target="mainnav"
            aria-label="menu"
            aria-expanded="false"
          />
        </Navbar.Brand>

        <Navbar.Menu id="mainnav">
          <Navbar.Container>
            <Link to="/grids" className="navbar-item">
              Les Grilles
            </Link>
            <Link to="/hybrids" className="navbar-item">
              Les Images
            </Link>
          </Navbar.Container>
          <Navbar.Container position="end">
            {!store.session.authenticated ? (
              <Link to="/login" className="navbar-item">
                <Icon className="fa fa-sign-in-alt" />
              </Link>
            ) : (
              <>
                <Navbar.Item>{store.session.user.name}</Navbar.Item>
                <Link to="/login" onClick={onLogOut} className="navbar-item">
                  <Icon className="fa fa-sign-out-alt" />
                </Link>
              </>
            )}
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </>
  );
};

export default StoreProvider()(Navigation);
