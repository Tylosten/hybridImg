import React from 'react';
import { Table } from 'react-bulma-components';

import GridCell from './GridCell';
import StoreProvider from '../store/StoreProvider';

export const GridDisplay = ({ grid, edit }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th></th>
            {grid.colThemes.map(col => (
              <th key={col.id}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.lineThemes.map(line => (
            <tr key={line.id}>
              <th>{line.name}</th>
              {grid.colThemes.map(col => (
                <GridCell
                  key={col.id}
                  edit={edit}
                  grid={grid.id}
                  line={line}
                  col={col}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

function extraProps(store, props) {
  const grid = store.getGrid(props.match.params.id);
  return {
    grid,
    edit:
      store.session.authenticated &&
      (store.session.user.id === grid.user || grid.isOpen),
  };
}

export default StoreProvider(extraProps)(GridDisplay);
