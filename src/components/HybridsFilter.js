import React from 'react';
import { Form, Level, Notification } from 'react-bulma-components';
const { Input, Field, Control, Label, Select } = Form;

import StoreProvider from '../store/StoreProvider';
import SelectMultiple from './SelectMultiple';

const HybridsFilter = ({ filter, setFilter, grids, tags, users }) => {
  return (
    <>
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
    </>
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
