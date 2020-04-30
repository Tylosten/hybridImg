import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import { Heading, Button, Message, Form, Modal } from 'react-bulma-components';
const { Field, Control, Label, Input, Help } = Form;

const UserDetails = ({ user }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [oldPwd, setOldPwd] = useState();
  const [newPwd, setNewPwd] = useState();
  const [checkPwd, setCheckPwd] = useState();
  const [help, setHelp] = useState();

  const onChangePwd = () => {
    axios
      .post('/user/updatepwd', {
        oldPwd,
        newPwd,
      })
      .then(() => {
        setShowPwd(false);
      })
      .catch(err => {
        setHelp('Error', err.response.data.message);
      });
  };

  return (
    <>
      <Heading size={6}>{`Bonjour ${user.name}`}</Heading>
      <Button onClick={() => setShowPwd(true)}>Changer mon mot de passe</Button>
      <Modal
        show={showPwd}
        onClose={() => setShowPwd(false)}
        closeOnBlur={true}
      >
        <Modal.Content>
          <Message>
            <Message.Header>Changement de mot de passe</Message.Header>
            <Message.Body>
              <Field>
                <Label>Ancien mot de passe</Label>
                <Control>
                  <Input
                    value={oldPwd}
                    onChange={e => setOldPwd(e.target.value)}
                    placeholder="Ancien mot de passe"
                    type="password"
                  />
                  {!oldPwd ? <Help color="danger">Requis</Help> : <></>}
                </Control>
              </Field>
              <Field>
                <Label>nouveau mot de passe</Label>
                <Control>
                  <Input
                    value={newPwd}
                    onChange={e => setNewPwd(e.target.value)}
                    placeholder="Nouveau mot de passe"
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
                    placeholder="Confirmer mot de passe"
                    onChange={e => setCheckPwd(e.target.value)}
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
                  <Help color="danger">{help}</Help>
                  <Button
                    color="primary"
                    onClick={onChangePwd}
                    disabled={!(oldPwd && newPwd && newPwd === checkPwd)}
                  >
                    Valider
                  </Button>
                </Control>
              </Field>
            </Message.Body>
          </Message>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default UserDetails;
