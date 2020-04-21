import React, { useState } from 'react';
import { Tile } from 'react-bulma-components';

import HybridsFilter from './HybridsFilter';
import HybridsDisplay from './HybridsDisplay';

const FilteredHybrids = () => {
  const [filter, setFilter] = useState({});

  return (
    <Tile className="is-ancestor">
      <Tile className={'is-parent is-2'}>
        <Tile className="is-child">
          <HybridsFilter filter={filter} setFilter={setFilter} />
        </Tile>
      </Tile>
      <Tile className={'is-parent is-10'}>
        <Tile className="is-child">
          <HybridsDisplay filter={filter} />
        </Tile>
      </Tile>
    </Tile>
  );
};

export default FilteredHybrids;
