import React from 'react';

import HybridDisplay from './HybridDisplay';
import ElementsDisplay from './ElementsDisplay';
import StoreProvider from '../store/StoreProvider';

export const HybridsDisplay = ({ hybrids, filter, getGridHybridIds }) => {
  filter = filter || {};

  const filterHybrids = hybrids.filter(h => {
    return (
      (!filter.user || filter.user === h.user) &&
      (!filter.grid || getGridHybridIds(filter.grid).includes(h.id)) &&
      (!filter.tags || filter.tags.every(t => h.tags.includes(t))) &&
      (!filter.name || h.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  });

  return (
    <ElementsDisplay
      ChildComponent={HybridDisplay}
      getChildProps={hybrid => ({ hybrid })}
      elements={filterHybrids}
    />
  );
};

function extraProps(store) {
  return {
    hybrids: Object.values(store.hybrids).map(h => ({
      ...h,
      tags: store.getHybridTags(h.id),
    })),
    getGridHybridIds: store.getGridHybridIds,
  };
}

export default StoreProvider(extraProps)(HybridsDisplay);
