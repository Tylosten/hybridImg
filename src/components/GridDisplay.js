import React from 'react';
import {
  Table,
  Notification,
  Button,
  Form,
  Level,
} from 'react-bulma-components';

import GridCell from './GridCell';
import StoreProvider from '../store/StoreProvider';
import useStateWithLocalStorage from './useStateWithLocalStorage';

export const GridDisplay = ({ grid, users }) => {
  const [filter, setFilter] = useStateWithLocalStorage('filter', {});

  return (
    <>
      <Notification color="primary" className="is-light">
        <Level>
          <Level.Side>
            <Level.Item>
              <Form.Label>Filter par auteurice :</Form.Label>
            </Level.Item>
            <Level.Item>
              <Form.Select
                value={filter.user}
                onChange={e => setFilter({ ...filter, user: e.target.value })}
              >
                <option></option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </Form.Select>
            </Level.Item>
          </Level.Side>
          <Level.Side>
            <Level.Item>
              <Button color="primary">Remplir automatiquement</Button>
            </Level.Item>
          </Level.Side>
        </Level>
      </Notification>
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
                  grid={grid.id}
                  line={line}
                  col={col}
                  filter={filter}
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
    users: store.getGridUsers(grid.id),
  };
}

export default StoreProvider(extraProps)(GridDisplay);
