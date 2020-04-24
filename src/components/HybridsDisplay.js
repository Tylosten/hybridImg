import React from 'react';

import HybridDisplay from './HybridDisplay';
import ElementsDisplay from './ElementsDisplay';
import StoreProvider from '../store/StoreProvider';

export const HybridsDisplay = ({ hybrids, filter }) => {
  filter = filter || {};

  const filterHybrids = hybrids.filter(h => {
    return (
      (!filter.user || filter.user === h.user) &&
      (!filter.grid || filter.grid === h.grid) &&
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
  };
}

export default StoreProvider(extraProps)(HybridsDisplay);
