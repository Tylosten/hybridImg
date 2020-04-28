import React from 'react';
import { Notification, Button, Form } from 'react-bulma-components';
const { Field, Control } = Form;
import { Link } from 'react-router-dom';

import HybridsFilter from './HybridsFilter';
import HybridsDisplay from './HybridsDisplay';

const FilteredHybrids = props => {
  return (
    <>
      <Notification color="primary" className="is-light">
        <Field className="is-grouped">
          <Control>
            <Link to="/hybrids/new">
              <Button color="primary">Nouvelle Image</Button>
            </Link>
          </Control>
        </Field>
        {props.hideFilter ? <></> : <HybridsFilter />}
      </Notification>
      <HybridsDisplay />
    </>
  );
};

export default FilteredHybrids;
