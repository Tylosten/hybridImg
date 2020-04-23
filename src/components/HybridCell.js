import React, { useState } from 'react';
import { Icon, Form, Button } from 'react-bulma-components';
const File = Form.InputFile;
import StoreProvider from '../store/StoreProvider';
import { createHybrid, updateHybrid } from '../store/StoreActions';
import HybridDisplay from './HybridDisplay';
import SelectHybrid from './SelectHybrid';

export const HybridCell = ({
  edit,
  grid,
  line,
  col,
  dispatchToStore,
  hybrid,
}) => {
  const [showSelect, setShowSelect] = useState(false);

  const unlinkHybrid = hybrid => () => {
    dispatchToStore(
      updateHybrid({
        id: hybrid.id,
        grid: 'no grid',
      })
    );
  };

  const imgSize = 128;

  return (
    <td>
      {hybrid ? (
        <div style={{ position: 'relative', minWidth: `${imgSize}px` }}>
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
      ) : (
        <>
          {showSelect ? (
            <SelectHybrid
              line={line}
              col={col}
              setShow={setShowSelect}
              grid={grid}
            />
          ) : (
            <></>
          )}
          <Button
            style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
            onClick={() => {
              setShowSelect(true);
            }}
          >
            <Icon className="fa fa-image" />
          </Button>
        </>
      )}
    </td>
  );
};

function extraProps(store, props) {
  return {
    hybrid: store.getGridHybrid(props),
  };
}

export default StoreProvider(extraProps)(HybridCell);
