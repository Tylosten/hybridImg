import React from 'react';

import { Notification, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import ElementsDisplay from './ElementsDisplay';
import GridPreview from './GridPreview';

export const GridsDisplay = ({ grids, filter, byLine }) => {
  filter = filter || {};

  const filterGrids = grids.filter(g => {
    return (
      (!filter.user || filter.user === g.user) &&
      (!filter.tags ||
        filter.tags.every(
          t => g.lineThemes.includes(t) || g.lineThemes.includes(t)
        )) &&
      (!filter.name ||
        g.name.toLowerCase().match(`/.*${filter.name.toLowerCase()}.*/`))
    );
  });

  return (
    <>
      <Notification color="primary" className="is-light">
        <Link to="/grids/new">
          <Button color="primary">Nouvelle grille</Button>
        </Link>
      </Notification>
      <ElementsDisplay
        ChildComponent={GridPreview}
        getChildProps={grid => ({ id: grid.id })}
        elements={filterGrids}
        byLine={byLine}
      />
    </>
  );
};

function extraProps(store) {
  return {
    grids: Object.values(store.grids),
  };
}

export default StoreProvider(extraProps)(GridsDisplay);
