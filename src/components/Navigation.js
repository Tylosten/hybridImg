import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, Image } from 'react-bulma-components';
import StoreProvider from '../store/StoreProvider';
import { logout } from '../store/StoreActions';

export const Navigation = ({ match, store, dispatchToStore }) => {
  const onLogOut = () => {
    dispatchToStore(logout());
  };
  return (
    <>
      <Navbar
        color={match.url === '/' ? 'white' : 'white'}
        role="navigation"
        aria-label="main navigation"
      >
        <Navbar.Brand>
          <Link to="/" className="navbar-item">
            <Image className="is-rounded" src="./Images/mamouth-abeille.png" />
          </Link>
          <Navbar.Burger
            data-target="mainnav"
            aria-label="menu"
            aria-expanded="false"
          />
        </Navbar.Brand>

        <Navbar.Menu id="mainnav">
          <Navbar.Container>
            <Link to="/home" className="navbar-item">
              Home
            </Link>
            <Link to="/templates" className="navbar-item">
              Les Modèles
            </Link>
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
                <div>
                  <Icon className="fa fa-sign-in-alt" />
                </div>
              </Link>
            ) : (
              <>
                <Link to="/home" className="navbar-item">
                  {store.session.user.name}
                </Link>
                <Link to="/login" onClick={onLogOut} className="navbar-item">
                  <div>
                    <Icon className="fa fa-sign-out-alt" />
                  </div>
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
