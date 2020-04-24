import React, { useContext } from 'react';
import { StoreContext } from './StoreReducer';

export const storeProvider = (extraprops = () => ({})) => Component => {
  const WithStore = props => {
    const [store, dispatchToStore] = useContext(StoreContext);

    const getHybrid = hybridId => {
      const hybrid = store.hybrids[hybridId];
      if (!hybrid) {
        throw 'Invalid hybrid id : ' + hybridId;
      }
      return {
        ...hybrid,
        tags: hybrid.tags.map(id => store.tags[id]),
        user: store.users[hybrid.user],
      };
    };

    const getHybridTags = hybridId => {
      return getHybrid(hybridId).tags;
    };

    const getGrid = gridId => {
      const grid = store.grids[gridId];
      return {
        ...grid,
      };
    };

    const getGridHybrid = ({ grid, line, col }) => {
      const hybrid = Object.values(store.hybrids).find(
        h =>
          h.grid == grid && h.tags.includes(line.id) && h.tags.includes(col.id)
      );
      return hybrid ? getHybrid(hybrid.id) : undefined;
    };

    const getGridHybrids = grid => {
      return Object.values(store.hybrids).filter(h => h.grid === grid);
    };

    const getTemplate = id => {
      const template = { ...store.templates[id] };
      return {
        ...template,
        colThemes: Object.values(store.tags).filter(t =>
          template.colThemes.includes(t.id)
        ),
        lineThemes: Object.values(store.tags).filter(t =>
          template.lineThemes.includes(t.id)
        ),
      };
    };

    const getGridTemplate = gridId => {
      return getTemplate(store.grids[gridId].template);
    };

    const expandedStore = {
      ...store,
      getHybrid,
      getHybridTags,
      getGrid,
      getGridHybrid,
      getGridHybrids,
      getTemplate,
      getGridTemplate,
    };

    return (
      <Component
        {...props}
        {...extraprops(expandedStore, props)}
        store={expandedStore}
        dispatchToStore={dispatchToStore}
      />
    );
  };
  WithStore.displayName = Component.name + 'Container';
  return React.memo(WithStore);
};

export default storeProvider;
