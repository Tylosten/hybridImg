import React from 'react';
import { Icon, Form } from 'react-bulma-components';
const File = Form.InputFile;
import StoreProvider from '../store/StoreProvider';
import { createHybrid, deleteHybrid } from '../store/StoreActions';
import HybridDisplay from './HybridDisplay';

export const HybridCell = ({
  edit,
  grid,
  line,
  col,
  dispatchToStore,
  hybrid,
}) => {
  const onHybridUpload = async e => {
    const file = e.target.files[0];

    if (!hybrid) {
      await dispatchToStore(
        createHybrid({
          file,
          name: `${line.name}/${col.name}`,
          tags: [line.id, col.id],
          grid: grid,
        })
      );
    }
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
              onClick={() => {
                dispatchToStore(deleteHybrid(hybrid.id));
              }}
            ></span>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <File
          input-props={{ accept: 'image/*' }}
          label=""
          icon={<Icon className="fa fa-image" />}
          onChange={onHybridUpload}
        />
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
