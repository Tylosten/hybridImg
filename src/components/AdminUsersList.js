import React, { useState } from 'react';
import {
  Button,
  Heading,
  Modal,
  Form,
  Notification,
  Table,
} from 'react-bulma-components';
const { Field, Control, Input, Help, Label } = Form;
import axios from 'axios';
axios.defaults.withCredentials = true;

import StoreProvider from '../store/StoreProvider';
import { deleteUser } from '../store/StoreActions';

const AdminUsersList = ({ users, userId, dispatchToStore }) => {
  const [search, setSearch] = useState('');
  const [helpDelete, setHelpDelete] = useState('');
  const [userToDelete, setUserToDelete] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(false);

  const [helpUpdate, setHelpUpdate] = useState();
  const [newPwd, setNewPwd] = useState();
  const [checkPwd, setCheckPwd] = useState();

  const onChangePwd = () => {
    axios
      .post('/admin/updatepwd', {
        id: userToUpdate.id,
        newPwd,
      })
      .then(() => {
        setUserToUpdate(false);
      })
      .catch(err => {
        setHelpUpdate(err.response.data.message);
      });
  };

  function onDeleteUser() {
    dispatchToStore(deleteUser({ id: userToDelete.id })).catch(err => {
      setHelpDelete(err.response.data.message);
    });
  }

  return (
    <>
      <Table className="is-hoverable">
        <thead>
          <tr>
            <th>
              <Field>
                <Control>
                  <Input
                    size="small"
                    placeholder="Nom de l'utilisateur"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </Control>
              </Field>
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
            .map(user => (
              <tr key={user.id}>
                <th>{user.name}</th>
                <td>
                  <Field>
                    <Control>
                      <Button
                        onClick={() => setUserToUpdate(user)}
                        disabled={userId === user.id}
                      >
                        Changer le mot de passe
                      </Button>
                    </Control>
                  </Field>
                </td>
                <td>
                  <Field>
                    <Control>
                      <Button
                        color="danger"
                        onClick={() => setUserToDelete(user)}
                        disabled={userId === user.id}
                      >
                        Supprimer
                      </Button>
                    </Control>
                  </Field>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {userToDelete ? (
        <Modal
          show={!!userToDelete}
          onClose={() => setUserToDelete(false)}
          closeOnBlur={true}
        >
          <Modal.Content>
            <Notification color="danger" className="is-light">
              <Heading
                size={6}
              >{`Voulez vous vraiment supprimer ${userToDelete.name} ?`}</Heading>
              <Field className="is-grouped">
                <Control>
                  <Button color="danger" onClick={onDeleteUser}>
                    Oui
                  </Button>
                </Control>
                <Control>
                  <Button onClick={() => setUserToDelete(false)}>Non</Button>
                </Control>
                <Help color="danger">{helpDelete}</Help>
              </Field>
            </Notification>
          </Modal.Content>
        </Modal>
      ) : (
        <></>
      )}
      {userToUpdate ? (
        <Modal
          show={!!userToUpdate}
          onClose={() => setUserToUpdate(false)}
          closeOnBlur={true}
        >
          <Modal.Content>
            <Notification className="is-light">
              <Heading
                size={6}
              >{`Modifier le mot de passe de ${userToUpdate.name}`}</Heading>

              <Field>
                <Label>nouveau mot de passe</Label>
                <Control>
                  <Input
                    value={newPwd}
                    onChange={e => setNewPwd(e.target.value)}
                    placeholder="Mot de passe"
                    type="password"
                  />
                  {!newPwd ? <Help color="danger">Requis</Help> : <></>}
                </Control>
              </Field>
              <Field>
                <Label>Retapez le nouveau mot de passe</Label>
                <Control>
                  <Input
                    value={checkPwd}
                    onChange={e => setCheckPwd(e.target.value)}
                    placeholder="Confirmer mot de passe"
                    type="password"
                  />
                  {newPwd !== checkPwd ? (
                    <Help color="danger">Les mots de passe diffèrent</Help>
                  ) : (
                    <></>
                  )}
                </Control>
              </Field>
              <Field>
                <Control>
                  <Help color="danger">{helpUpdate}</Help>
                  <Button
                    color="primary"
                    onClick={onChangePwd}
                    disabled={!(newPwd && newPwd === checkPwd)}
                  >
                    Valider
                  </Button>
                </Control>
              </Field>
            </Notification>
          </Modal.Content>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

const extraprops = store => {
  const users = Object.values(store.users);
  users.sort();
  return {
    users,
    userId: store.session.user.id,
  };
};

export default StoreProvider(extraprops)(AdminUsersList);
