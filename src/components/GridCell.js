import React, { useState } from 'react';
import { Icon, Button } from 'react-bulma-components';
import StoreProvider from '../store/StoreProvider';
import { updateCell } from '../store/StoreActions';
import HybridDisplay from './HybridDisplay';
import SelectHybrid from './SelectHybrid';

export const GridCell = ({
  edit,
  cell,
  line,
  col,
  dispatchToStore,
  hybrids,
}) => {
  const [showSelect, setShowSelect] = useState(false);

  const unlinkHybrid = hybrid => () => {
    dispatchToStore(
      updateCell({
        id: cell.id,
        hybrids: cell.hybrids.filter(id => id !== hybrid.id),
      })
    );
  };

  const imgSize = 128;

  return (
    <td>
      {hybrids.map(hybrid => (
        <div
          key={hybrid.id}
          style={{ position: 'relative', minWidth: `${imgSize}px` }}
        >
          <HybridDisplay hybrid={hybrid} hideTags />
          {edit ? (
            <span
              className="delete is-small"
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
              }}
              onClick={unlinkHybrid(hybrid)}
            ></span>
          ) : (
            <></>
          )}
        </div>
      ))}
      <SelectHybrid
        cell={cell}
        line={line}
        col={col}
        show={showSelect}
        setShow={setShowSelect}
      />
      <Button
        style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
        onClick={() => {
          setShowSelect(true);
        }}
        data-tooltip="Ajouter une image"
      >
        <Icon className="fa fa-image" alt="Ajouter une image" />
      </Button>
    </td>
  );
};

function extraProps(store, props) {
  const cell = store.getGridCell({
    line: props.line.id,
    col: props.col.id,
    grid: props.grid,
  });
  return {
    cell,
    hybrids: cell.hybrids.map(id => store.getHybrid(id)),
  };
}

export default StoreProvider(extraProps)(GridCell);
