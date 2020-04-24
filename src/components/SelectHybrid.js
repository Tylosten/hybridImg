import React from 'react';
import { Button, Message, Level } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
import { createHybrid, updateHybrid } from '../store/StoreActions';
import AlertMessage from './AlertMessage';

export const SelectHybrid = ({
  hybrids,
  line,
  col,
  grid,
  setShow,
  dispatchToStore,
}) => {
  const onUpload = async e => {
    const file = e.target.files[0];

    await dispatchToStore(
      createHybrid({
        file,
        name: `${line.name}/${col.name}`,
        tags: [line.id, col.id],
        grid: grid,
      })
    );

    setShow(false);
  };

  const onSelect = async hybrid => {
    await dispatchToStore(
      updateHybrid({
        id: hybrid.id,
        grid: grid,
      })
    );

    setShow(false);
  };

  const imgSize = 96;

  return (
    <AlertMessage height={`${imgSize * 2}px`}>
      <Message color="danger" className="is-light">
        <Message.Header>
          <p style={{ marginRight: '10px' }}>Choisissez ou ajoutez une image</p>
          <button className="delete" onClick={() => setShow(false)} />
        </Message.Header>
        <Message.Body
          style={{ height: `${imgSize + 40}px`, overflowY: 'auto' }}
        >
          <Level>
            <Level.Side>
              <Level.Item>
                <div className="file is-boxed">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      accept="image/*"
                      onChange={onUpload}
                    />
                    <button
                      className="file-cta"
                      style={{
                        height: `${imgSize}px`,
                        width: `${imgSize}px`,
                      }}
                    >
                      <i className="fas fa-upload" />
                    </button>
                  </label>
                </div>
              </Level.Item>
              {hybrids.map(hybrid => (
                <Level.Item key={hybrid.id}>
                  <Button
                    style={{
                      width: `${imgSize}px`,
                      height: `${imgSize}px`,
                    }}
                    onClick={() => onSelect(hybrid)}
                  >
                    <figure
                      className={`image is-square is-${imgSize}x${imgSize}`}
                    >
                      <img src={hybrid.url} />
                    </figure>
                  </Button>
                </Level.Item>
              ))}
            </Level.Side>
          </Level>
        </Message.Body>
      </Message>
    </AlertMessage>
  );
};

const extrasprops = (store, props) => {
  return {
    hybrids: Object.values(store.hybrids).filter(
      h =>
        h.tags.includes(props.line.id) &&
        h.tags.includes(props.col.id) &&
        h.user === store.session.user.id
    ),
  };
};

export default StoreProvider(extrasprops)(SelectHybrid);
