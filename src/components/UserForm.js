import React, { useState } from 'react';
import { Button, Form } from 'react-bulma-components';
const { Field, Label, Control, Input, Help } = Form;

const UserForm = ({ submitLabel, onSubmit, help, helpColor, withCheck }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState();

  const onClick = e => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form>
      <Field>
        <Label>Nom</Label>
        <Control>
          <Input
            placeholder="Votre nom"
            value={username}
            onChange={e => setUserName(e.target.value)}
            required
          />{' '}
          {username ? <></> : <Help color="danger">Ce champ est requis</Help>}
        </Control>
      </Field>
      <Field>
        <Label>Mot de passe</Label>
        <Control>
          <Input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Help
            color="danger"
            style={{ display: password ? 'none' : 'default' }}
          >
            Ce champ est requis
          </Help>
        </Control>
      </Field>
      {withCheck ? (
        <Field>
          <Label>Confirmer le mot de passe</Label>
          <Control>
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={check}
              onChange={e => setCheck(e.target.value)}
              required
            />
            {password === check ? (
              <></>
            ) : (
              <Help color="danger">Les mots de passe diffèrent</Help>
            )}
          </Control>
        </Field>
      ) : (
        <></>
      )}
      <Field>
        <Control>
          <Help color={helpColor || 'danger'}>{help}</Help>
          <Button
            color="primary"
            onClick={onClick}
            disabled={
              !username || !password || (withCheck && password !== check)
            }
          >
            {submitLabel}
          </Button>
        </Control>
      </Field>
    </form>
  );
};

export default UserForm;
