import React, { useState } from 'react';
import {
  Button,
  Heading,
  Modal,
  Form,
  Notification,
  Table,
} from 'react-bulma-components';
const { Field, Control, Input, Help } = Form;

import StoreProvider from '../store/StoreProvider';
import { deleteUser } from '../store/StoreActions';

const AdminUsersList = ({ users, userId, dispatchToStore }) => {
  const [search, setSearch] = useState('');
  const [helpDelete, setHelpDelete] = useState('');
  const [userToDelete, setUserToDelete] = useState(false);

  function onDeleteUser() {
    dispatchToStore(deleteUser({ id: userToDelete.id })).catch(err => {
      setHelpDelete(err);
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
                        color="danger"
                        onClick={() => setUserToDelete(user)}
                        disabled={userId === user.id}
                      >
                        Supprimer
                      </Button>
                      <Help>{helpDelete}</Help>
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
