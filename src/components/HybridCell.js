import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'react-bulma-components';
import StoreProvider from './StoreProvider';
import HybridDisplay from './HybridDisplay';

export const HybridCell = props => {
  const {
    edit,
    grid,
    line,
    col,
    addHybrid,
    deleteHybrid,
    saveHybrid,
    store,
  } = props;
  const [hybrid, setHybrid] = useState(props.hybrid);

  const onStoreChange = () => {
    setHybrid(store.getGridHybrid(props));
  };

  useEffect(() => {
    const subscription = store.subscribe(onStoreChange);
    return () => {
      store.unsubscribe(subscription);
    };
  }, []);

  const onHybridUpload = () => {
    const newUrl = './Images/20200412_003859.jpg';

    if (!hybrid) {
      addHybrid({
        url: newUrl,
        name: `${line.name}/${col.name}`,
        tags: [line.id, col.id],
        grid: grid,
      });
    } else {
      hybrid.url = newUrl;
      setHybrid(hybrid);
      saveHybrid(hybrid);
    }
  };

  const imgSize = 128;

  return (
    <td>
      {hybrid ? (
        <div style={{ position: 'relative', width: `${imgSize}px` }}>
          <HybridDisplay hybrid={hybrid} hideTags />
          <span
            className="delete is-small"
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              dislay: edit ? 'default' : 'none',
            }}
            onClick={() => {
              deleteHybrid(hybrid.id);
            }}
          ></span>
        </div>
      ) : (
        <Button
          color="light"
          onClick={onHybridUpload}
          style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
          disabled={!edit}
        >
          <Icon size="auto" className="fa fa-plus" />
        </Button>
      )}
    </td>
  );
};

function extraProps(store, props) {
  return {
    hybrid: store.getGridHybrid(props),
    addHybrid: store.addHybrid,
    deleteHybrid: store.deleteHybrid,
  };
}

export default StoreProvider(extraProps)(HybridCell);
