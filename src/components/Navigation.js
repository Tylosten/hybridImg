import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, Image, Level } from 'react-bulma-components';
import StoreProvider from '../store/StoreProvider';
import { logout } from '../store/StoreActions';

export const Navigation = ({
  match,
  authenticated,
  username,
  isAdmin,
  dispatchToStore,
}) => {
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
            <Image src="/Images/mamouth-abeille.ico" />
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
            <Link to="/grids" className="navbar-item">
              Les Grilles
            </Link>
            <Link to="/hybrids" className="navbar-item">
              Les Images
            </Link>
          </Navbar.Container>
          <Navbar.Container position="end">
            {!authenticated ? (
              <>
                <Link to="/register" className="navbar-item">
                  Inscription
                </Link>
                <Link to="/login" className="navbar-item">
                  <Level>
                    <Level.Side>
                      <Level.Item>Connexion</Level.Item>
                      <Level.Item>
                        <Icon className="fa fa-sign-in-alt" />
                      </Level.Item>
                    </Level.Side>
                  </Level>
                </Link>
              </>
            ) : (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="navbar-item">
                    Admin
                  </Link>
                ) : (
                  <></>
                )}
                <Link to="/home" className="navbar-item">
                  {username}
                </Link>
                <Link to="/login" onClick={onLogOut} className="navbar-item">
                  <Level>
                    <Level.Side>
                      <Level.Item>Déconnexion</Level.Item>
                      <Level.Item>
                        <Icon className="fa fa-sign-out-alt" />
                      </Level.Item>
                    </Level.Side>
                  </Level>
                </Link>
              </>
            )}
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </>
  );
};

const extraProps = store => {
  return {
    authenticated: store.session.authenticated,
    isAdmin: store.session.user && store.session.user.role === 'admin',
    username: store.session.user ? store.session.user.name : '',
  };
};

export default StoreProvider(extraProps)(Navigation);
