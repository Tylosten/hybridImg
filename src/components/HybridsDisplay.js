import React from 'react';
import { useLocation } from 'react-router-dom';

import HybridDisplay from './HybridDisplay';
import ElementsDisplay from './ElementsDisplay';
import StoreProvider from '../store/StoreProvider';

export const HybridsDisplay = ({ hybrids, filter, getGridHybridIds }) => {
  const location = useLocation();
  const urlFilter = JSON.parse(
    new URLSearchParams(location.search).get('filter')
  );
  filter = { ...urlFilter, ...filter };

  const filterHybrids = hybrids.filter(h => {
    return (
      (!filter.user || filter.user === h.user) &&
      (!filter.grid || getGridHybridIds(filter.grid).includes(h.id)) &&
      (!filter.tags ||
        filter.tags.every(t =>
          h.tags.some(hybridTag => hybridTag.id === t.id)
        )) &&
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
