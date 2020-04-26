import React from 'react';
import { Button, Message, Level, Modal } from 'react-bulma-components';

import StoreProvider from '../store/StoreProvider';
import { createHybrid, updateHybrid } from '../store/StoreActions';

export const SelectHybrid = ({
  hybrids,
  line,
  col,
  grid,
  show,
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
    <Modal show={show} onClose={() => setShow(false)} closeOnBlur={true}>
      <Modal.Content>
        <Message color="danger" className="is-light">
          <Message.Header>
            <p style={{ marginRight: '10px' }}>
              Choisissez ou ajoutez une image
            </p>
          </Message.Header>
          <Message.Body
            style={{ height: `${imgSize + 40}px`, overflowY: 'auto' }}
          >
            <Level>
              <Level.Side>
                <Level.Item>
                  <div className="file">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        name="resume"
                        onChange={onUpload}
                      />
                      <div
                        className="file-cta button"
                        style={{
                          height: `${imgSize}px`,
                          width: `${imgSize}px`,
                        }}
                      >
                        <i className="file-icon fas fa-upload" />
                      </div>
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
      </Modal.Content>
    </Modal>
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
