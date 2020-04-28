import React, { useState, useEffect } from 'react';
import { Form, Tag } from 'react-bulma-components';
const { Select } = Form;

const SelectMultiple = props => {
  const [selected, setSelected] = useState(props.selected || []);
  const [options, setOptions] = useState(props.options || []);
  const { disabled, onChange, size } = props;

  useEffect(() => {
    options.sort((a, b) => a.name > b.name);
    setOptions(
      options.filter(o => selected.every(select => select.id !== o.id))
    );
  }, [selected]);

  const onSelect = e => {
    const id = e.target.value;
    if (id) {
      const option = options.find(o => o.id === id);
      setSelected([...selected, option]);
      setOptions(options.filter(o => o.id !== id));
    }
  };

  const onDelete = option => {
    setSelected(selected.filter(o => o.id !== option.id));
    const newOptions = [...options, option];
    newOptions.sort((a, b) => a.name > b.name);
    setOptions(newOptions);
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      {disabled ? (
        <></>
      ) : (
        <Select className="is-rounded" size={size} onChange={onSelect}>
          <option></option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      )}
      <span>
        {selected.map(option => (
          <Tag key={option.id} color="info" style={{ margin: '5px' }}>
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

export default SelectMultiple;
