import React, { useState, useEffect } from 'react';
import {
  Tile,
  Image,
  Form,
  Button,
  Icon,
  Notification,
  Heading,
  Modal,
} from 'react-bulma-components';
const { Field, Control, Input, Label } = Form;
import { useHistory } from 'react-router-dom';

import SelectCreateTags from './SelectCreateTags';

import StoreProvider from '../store/StoreProvider';
import {
  updateHybrid,
  deleteHybrid,
  createHybrid,
} from '../store/StoreActions';

export const HybridDetails = props => {
  const { edit, dispatchToStore, redirect } = props;
  const history = useHistory();

  if (redirect) {
    history.goBack();
    return <div></div>;
  }

  const [hybrid, setHybrid] = useState(props.hybrid);
  const [alertDelete, setAlertDelete] = useState(false);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const onSave = () => {
    if (hybrid.id) {
      dispatchToStore(updateHybrid({ ...hybrid, file: file })).then(() => {
        history.goBack();
      });
    } else {
      dispatchToStore(createHybrid({ ...hybrid, file: file })).then(() => {
        history.goBack();
      });
    }
  };

  const onCancel = () => {
    setHybrid(props.hybrid);
    setFile(undefined);
  };

  const onDelete = async () => {
    dispatchToStore(deleteHybrid(hybrid.id)).then(() => {
      history.goBack();
    });
  };

  useEffect(() => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      return () => {
        URL.revokeObjectURL(file);
        setPreviewUrl(undefined);
      };
    }
  }, [file]);

  const onUpload = e => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Modal
        show={alertDelete}
        onClose={() => setAlertDelete(false)}
        closeOnBlur={true}
      >
        <Modal.Content>
          <Notification color="danger" className="is-light">
            <Heading size={5}>
              Voulez vous vraiment supprimer cette image ?
            </Heading>
            <Field className="is-grouped">
              <Control>
                <Button color="danger" onClick={onDelete}>
                  Supprimer
                </Button>
              </Control>
              <Control>
                <Button onClick={() => setAlertDelete(false)}>Annuler</Button>
              </Control>
            </Field>
          </Notification>
        </Modal.Content>
      </Modal>

      <Tile className="is-ancestor">
        <Tile className="is-parent">
          <Tile className="is-parent is-4">
            <Tile className="is-child">
              <Image
                src={previewUrl || hybrid.url}
                alt={`Image ${hybrid.name}`}
              />
            </Tile>
          </Tile>
          <Tile className="is-child" style={{ padding: '10px' }}>
            <Field>
              <Control>
                <Input
                  type="text"
                  value={hybrid.name}
                  onChange={e => setHybrid({ ...hybrid, name: e.target.value })}
                  placeholder="Nom de l'image"
                  disabled={!edit}
                />
              </Control>
            </Field>
            <Field>
              <Label>Auteurice</Label>
              <Control>
                <Input value={hybrid.user.name} disabled />
              </Control>
            </Field>
            <Field>
              <Label>Tags</Label>
              <Control>
                <SelectCreateTags
                  color="info"
                  value={hybrid.tags}
                  onChange={selected =>
                    setHybrid({ ...hybrid, tags: selected })
                  }
                  disabled={!edit}
                />
              </Control>
            </Field>
            {edit ? (
              <>
                <Field>
                  <div className="file">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        name="resume"
                        onChange={onUpload}
                      />
                      <div className="file-cta">
                        <i className="file-icon fas fa-upload" alt="Upload" />
                        Upload
                      </div>
                    </label>
                  </div>
                </Field>
                <Field className="is-grouped has-addons">
                  <Control>
                    <Button
                      color="primary"
                      onClick={onSave}
                      disabled={!edit || (!hybrid.id && !file)}
                    >
                      <Icon className="fa fa-save" />
                      <span>Sauvegarder</span>
                    </Button>
                  </Control>
                  <Control>
                    <Button onClick={onCancel} disabled={!edit}>
                      <span>Reset</span>
                    </Button>
                  </Control>
                </Field>
                {hybrid.id ? (
                  <Field>
                    <Control>
                      <Button
                        color="danger"
                        onClick={() => setAlertDelete(true)}
                        disabled={!edit}
                      >
                        <Icon className="fa fa-trash" />
                        <span>Supprimer</span>
                      </Button>
                    </Control>
                  </Field>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </Tile>
        </Tile>
      </Tile>
    </>
  );
};

function extraProps(store, props) {
  const id = props.match.params.id;
  try {
    const hybrid = id ? store.getHybrid(id) : { user: store.session.user };
    return {
      hybrid,
      edit: hybrid.user.id === store.session.user.id,
    };
  } catch (err) {
    return { redirect: true };
  }
}

export default StoreProvider(extraProps)(HybridDetails);
