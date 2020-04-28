import React, { useState } from 'react';
import {
  Table,
  Notification,
  Button,
  Form,
  Level,
  Icon,
} from 'react-bulma-components';

import GridCell from './GridCell';
import StoreProvider from '../store/StoreProvider';
import useStateWithLocalStorage from './useStateWithLocalStorage';
import { updateCell } from '../store/StoreActions';

export const GridDisplay = ({
  grid,
  users,
  cells,
  getCellCandidates,
  dispatchToStore,
}) => {
  const [filter, setFilter] = useStateWithLocalStorage('filter', {});
  const [loading, setLoading] = useState(false);

  const autoFill = async () => {
    setLoading(true);
    Promise.all(
      cells.map(cell => {
        const candidates = getCellCandidates(cell);
        if (candidates.length > 0) {
          return dispatchToStore(
            updateCell({
              id: cell.id,
              hybrids: [...cell.hybrids, ...candidates],
            })
          );
        }
      })
    ).then(() => {
      setLoading(false);
    });
  };

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
              <Button color="primary" onClick={autoFill}>
                Remplir automatiquement
                {loading ? (
                  <span className="is-primary button is-loading"></span>
                ) : (
                  <></>
                )}
              </Button>
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
    cells: Object.values(store.cells).filter(c => c.grid === grid.id),
    getCellCandidates: cell => {
      return Object.values(store.hybrids)
        .filter(
          h =>
            h.user === store.session.user.id &&
            h.tags.includes(cell.position.col) &&
            h.tags.includes(cell.position.line) &&
            !cell.hybrids.includes(h.id)
        )
        .map(h => h.id);
    },
    users: store.getGridUsers(grid.id),
  };
}

export default StoreProvider(extraProps)(GridDisplay);
