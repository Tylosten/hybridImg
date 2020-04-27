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
        colThemes: Object.values(store.tags).filter(t =>
          grid.colThemes.includes(t.id)
        ),
        lineThemes: Object.values(store.tags).filter(t =>
          grid.lineThemes.includes(t.id)
        ),
      };
    };

    const getGridCell = ({ line, col, grid }) => {
      return Object.values(store.cells).find(
        c =>
          c.grid === grid && c.position.line === line && c.position.col === col
      );
    };

    const getCellHybrids = ({ grid, line, col }) => {
      const cell = getGridCell({ grid, line, col });
      const hybrids = cell.hybrids.map(id => getHybrid(id));
      return hybrids;
    };

    const getGridHybridIds = gridId => {
      return Object.values(store.cells)
        .filter(c => c.grid === gridId)
        .map(cell => cell.hybrids)
        .flat();
    };

    const getGridHybrids = gridId => {
      return getGridHybridIds(gridId).map(hybridId => getHybrid(hybridId));
    };

    const getGridUsers = gridId => {
      return getGridHybridIds(gridId).map(
        hybridId => store.users[store.hybrids[hybridId].user]
      );
    };

    const expandedStore = {
      ...store,
      getHybrid,
      getHybridTags,
      getGrid,
      getGridCell,
      getCellHybrids,
      getGridHybridIds,
      getGridHybrids,
      getGridUsers,
    };

    return (
      <Component
        {...props}
        {...extraprops(expandedStore, props)}
        dispatchToStore={dispatchToStore}
      />
    );
  };
  WithStore.displayName = Component.name + 'Container';
  return React.memo(WithStore);
};

export default storeProvider;
