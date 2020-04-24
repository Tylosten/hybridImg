import React, { useState, useEffect } from 'react';
import { Form, Tag, Icon, Button } from 'react-bulma-components';
const { Input, Field, Control, Help } = Form;

import StoreProvider from '../store/StoreProvider';

export const SelectCreateTags = props => {
  const { disabled, onChange, size, color } = props;
  const minSearch = props.minSearch || 1;

  const [help, setHelp] = useState('');
  const [search, setSearch] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(props.value || []);
  const [options, setOptions] = useState(
    props.tags.filter(tag => selected.every(select => select.id !== tag.id))
  );

  useEffect(() => {
    options.sort((a, b) => a.name > b.name);
    setOptions(options);
  }, []);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  useEffect(() => {
    setCandidates(
      search.length >= minSearch
        ? options.filter(tag =>
          tag.name.toLowerCase().includes(search.toLowerCase())
        )
        : []
    );

    setHelp('');
  }, [search, minSearch, options]);

  const onSelect = tag => {
    if (tag) {
      const option = options.find(o => o.id === tag.id);
      setSelected([...selected, option]);
      setOptions(options.filter(o => o.id !== tag.id));
      setSearch('');
    }
  };

  const onDelete = tag => {
    setSelected(selected.filter(o => o.id !== tag.id));
    const newOptions = [...options, tag];
    newOptions.sort((a, b) => a.name > b.name);
    setOptions(newOptions);
    setSearch('');
  };

  const onCreate = async () => {
    const alreadySelected = selected.some(
      tag => tag.name.toLowerCase() == search.toLowerCase()
    );
    if (alreadySelected) {
      setHelp('Ce tag est déjà selectionné.');
      setSearch('');
      return;
    }
    const existing = props.tags.find(
      tag => tag.name.toLowerCase() == search.toLowerCase()
    );
    if (existing) {
      onSelect(existing);
    }
    setSelected([...selected, { name: search.toLowerCase() }]);
  };

  return (
    <>
      <div className={`dropdown ${candidates.length > 0 ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">
          <Field className="has-addons">
            <Control className="is-expanded has-icons-right">
              <Input
                size={size}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                disabled={disabled}
              />
              <Help color="danger">{help}</Help>
            </Control>
            <Button
              size={size}
              color={color}
              onClick={onCreate}
              disabled={disabled || !search}
            >
              <Icon className="fa fa-greater-than" />
            </Button>
          </Field>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {candidates.map(candidate => (
              <Button
                color="white"
                className="dropdown-item"
                key={candidate.id}
                onClick={() => onSelect(candidate)}
              >
                {candidate.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <span>
        {selected.map(option => (
          <Tag
            key={selected.indexOf(option)}
            color={color}
            style={{ margin: '5px' }}
          >
            {option.name}
            {disabled ? (
              <></>
            ) : (
              <button
                className="delete is-small"
                onClick={() => onDelete(option)}
              ></button>
            )}
          </Tag>
        ))}
      </span>
    </>
  );
};

const extraprops = store => {
  return {
    tags: Object.values(store.tags),
  };
};

export default StoreProvider(extraprops)(SelectCreateTags);
