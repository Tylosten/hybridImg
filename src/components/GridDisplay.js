import React from 'react';
import { Table } from 'react-bulma-components';

import HybridCell from './HybridCell';
import StoreProvider from '../store/StoreProvider';

export const GridDisplay = ({ grid, edit, template }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th></th>
            {template.colThemes.map(col => (
              <th key={col.id}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {template.lineThemes.map(line => (
            <tr key={line.id}>
              <th>{line.name}</th>
              {template.colThemes.map(col => (
                <HybridCell
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
    edit: store.session.authenticated && store.session.user.id === grid.user,
    template: store.getGridTemplate(grid.id),
  };
}

export default StoreProvider(extraProps)(GridDisplay);
