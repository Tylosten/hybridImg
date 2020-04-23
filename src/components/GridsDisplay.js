import React from 'react';

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
    <ElementsDisplay
      ChildComponent={GridPreview}
      getChildProps={grid => ({ id: grid.id })}
      elements={filterGrids}
      byLine={byLine}
      hideSlider
    />
  );
};

function extraProps(store) {
  return {
    grids: Object.values(store.grids),
  };
}

export default StoreProvider(extraProps)(GridsDisplay);
