import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Heading } from 'react-bulma-components';

export const Navigation = () => {
  return (
    <Navbar color="dark" role="navigation" aria-label="main navigation">
      <Navbar.Brand>
        <Link to="/home" className="navbar-item">
          <Heading style={{ color: 'inherit' }}>Images hybrides</Heading>
        </Link>
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Container>
          <Link to="/grids" className="navbar-item">
            Les Grilles
          </Link>
          <Link to="/images" className="navbar-item">
            Les Images
          </Link>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

const ConnectedNavigation = connect(state => state)(Navigation);
export default ConnectedNavigation;
