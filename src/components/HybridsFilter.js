import React, { useState, useEffect } from 'react';
import { Form, Icon, Level, Button } from 'react-bulma-components';
const { Input, Field, Control, Label, Select } = Form;
import { useHistory, useLocation } from 'react-router-dom';

import StoreProvider from '../store/StoreProvider';
import SelectMultiple from './SelectMultiple';

const HybridsFilter = ({ grids, tags, users }) => {
  const location = useLocation();
  const urlFilter = JSON.parse(
    new URLSearchParams(location.search).get('filter')
  );
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState(urlFilter || {});

  const history = useHistory();
  useEffect(() => {
    history.push(`?filter=${JSON.stringify(filter)}`);
  }, [filter]);

  const getFilterNb = () => {
    return (
      (filter.user ? 1 : 0) +
      (filter.grid ? 1 : 0) +
      (filter.name ? 1 : 0) +
      (filter.tags && filter.tags.length > 0 ? 1 : 0)
    );
  };

  return (
    <div style={{ display: 'relative' }}>
      {show ? (
        <>
          <Level color="primary" weight="light">
            <Field>
              <Label>Nom</Label>
              <Control>
                <Input
                  size="small"
                  value={filter.name}
                  onChange={e => setFilter({ ...filter, name: e.target.value })}
                />
              </Control>
            </Field>
            <Field>
              <Label>Auteurice</Label>
              <Control>
                <Select
                  size="small"
                  className="is-rounded"
                  onChange={e => setFilter({ ...filter, user: e.target.value })}
                  value={filter.user}
                >
                  <option></option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </Select>
              </Control>
            </Field>
            <Field>
              <Label>Tags</Label>
              <SelectMultiple
                size="small"
                options={tags}
                selected={filter.tags}
                onChange={selected => setFilter({ ...filter, tags: selected })}
              />
            </Field>
            <Field>
              <Label>Grille</Label>
              <Select
                size="small"
                className="is-rounded"
                value={filter.grid}
                onChange={e => setFilter({ ...filter, grid: e.target.value })}
              >
                <option></option>
                {grids.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </Select>
            </Field>
          </Level>
          <div style={{ position: 'absolute', right: '50%' }}>
            <div style={{ position: 'relative', right: '-50%' }}>
              <Button
                size="small"
                color="primary"
                className="is-rounded has-icon"
                onClick={() => setShow(!show)}
              >
                <span>{`Filtrer (${getFilterNb()})`}</span>
                <Icon className="fa fa-chevron-up" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ position: 'absolute', right: '50%' }}>
          <div style={{ position: 'relative', right: '-50%' }}>
            <Button
              size="small"
              color="primary"
              className="is-rounded"
              onClick={() => setShow(!show)}
            >
              <span>{`Filtrer (${getFilterNb()})`}</span>
              <Icon className="fa fa-chevron-down" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const extraprops = store => {
  return {
    grids: Object.values(store.grids),
    tags: Object.values(store.tags),
    users: Object.values(store.users),
  };
};

export default StoreProvider(extraprops)(HybridsFilter);
