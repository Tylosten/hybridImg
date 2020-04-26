import React from 'react';
import { Tabs } from 'react-bulma-components';
import { Link, useLocation } from 'react-router-dom';

const Tab = ({ path, children }) => {
  const location = useLocation();
  return (
    <Tabs.Tab renderAs="span" active={location.pathname === path}>
      <Link to={path}>
        <span>{children}</span>
      </Link>
    </Tabs.Tab>
  );
};

export default Tab;
