import React from 'react';
import { Button, Icon } from 'react-bulma-components';
import StoreProvider from '../store/StoreProvider';
import {
  createHybrid,
  updateHybrid,
  deleteHybrid,
} from '../store/StoreActions';
import HybridDisplay from './HybridDisplay';

export const HybridCell = ({
  edit,
  grid,
  line,
  col,
  dispatchToStore,
  hybrid,
}) => {
  const onHybridUpload = async () => {
    const newUrl = './Images/20200412_003859.jpg';

    if (!hybrid) {
      await dispatchToStore(
        createHybrid({
          url: newUrl,
          name: `${line.name}/${col.name}`,
          tags: [line.id, col.id],
          grid: grid,
        })
      );
    } else {
      hybrid.url = newUrl;
      await dispatchToStore(updateHybrid(hybrid));
    }
  };

  const imgSize = 128;

  return (
    <td>
      {hybrid ? (
        <div style={{ position: 'relative', width: `${imgSize}px` }}>
          <HybridDisplay hybrid={hybrid} hideTags />
          {edit ? (
            <span
              className="delete is-small"
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
              }}
              onClick={() => {
                dispatchToStore(deleteHybrid(hybrid.id));
              }}
            ></span>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Button
          color="light"
          onClick={onHybridUpload}
          style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
          disabled={!edit}
        >
          <Icon size="auto" className="fa fa-image" />
        </Button>
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
