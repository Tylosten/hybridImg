import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Heading } from 'react-bulma-components';

export const Navigation = () => {
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
        </Navbar.Menu>
      </Navbar>
    </>
  );
};

export default Navigation;
