import React, { useState } from 'react';
import { Tile } from 'react-bulma-components';

import HybridsFilter from './HybridsFilter';
import HybridsDisplay from './HybridsDisplay';

const FilteredHybrids = () => {
  const [filter, setFilter] = useState({});

  return (
    <Tile className="is-ancestor">
      <Tile className={'is-parent is-9'}>
        <Tile className="is-child">
          <HybridsDisplay filter={filter} />
        </Tile>
      </Tile>
      <Tile className={'is-parent is-3'}>
        <Tile className="is-child">
          <HybridsFilter filter={filter} setFilter={setFilter} />
        </Tile>
      </Tile>
    </Tile>
  );
};

export default FilteredHybrids;
