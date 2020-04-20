import React from 'react';
import { Table } from 'react-bulma-components';

import HybridCell from './HybridCell';
import StoreProvider from '../store/StoreProvider';

export const GridDisplay = ({ grid, edit }) => {
  return (
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
  );
};

function extraProps(store, props) {
  return {
    grid: store.getGrid(props.match.params.id),
  };
}

export default StoreProvider(extraProps)(GridDisplay);
