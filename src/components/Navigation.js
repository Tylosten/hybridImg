import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Navigation = () => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/home" className="navbar-item">
          <h1 className="title" style={{ color: 'inherit' }}>
            Images hybrides
          </h1>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/grids" className="navbar-item">
            Les Grilles
          </Link>
          <Link to="/images" className="navbar-item">
            Les Images
          </Link>
        </div>
      </div>
    </nav>
  );
};

const ConnectedNavigation = connect(state => state)(Navigation);
export default ConnectedNavigation;
