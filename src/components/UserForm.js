import React, { useState } from 'react';
import { Button, Form, Image, Level, Icon } from 'react-bulma-components';
const { Field, Label, Control, Input, Help } = Form;

const Captcha = ({ reload }) => {
  const [reloadcaptcha, setReloadcaptcha] = useState(0);
  return (
    <Level>
      <Level.Side>
        <Image src={`/captcha?a=${reloadcaptcha}&&b=${reload}`} />
        <Button
          size="small"
          color="light"
          onClick={() => {
            setReloadcaptcha(reloadcaptcha + 1);
          }}
        >
          <Icon className="fa fa-redo" alt="reload captcha" />
        </Button>
      </Level.Side>
    </Level>
  );
};

const UserForm = ({
  submitLabel,
  onSubmit,
  help,
  helpColor,
  withCheck,
  withCaptcha,
}) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState();
  const [captcha, setCaptcha] = useState();
  const [captchaId, setCaptchaId] = useState(0);

  const onClick = e => {
    e.preventDefault();
    onSubmit(username, password, captcha);
    setCaptchaId(captchaId + 1);
  };

  return (
    <>
      <Field>
        <Label>Nom</Label>
        <Control>
          <Input
            placeholder="Votre nom"
            value={username}
            onChange={e => setUserName(e.target.value)}
            required
          />
          <Help color="danger">{!username ? 'Ce champ est requis' : ''}</Help>
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
          <Help color="danger">{!password ? 'Ce champ est requis' : ''}</Help>
        </Control>
      </Field>
      <Field style={{ display: withCheck ? 'default' : 'none' }}>
        <Label>Confirmer le mot de passe</Label>
        <Control>
          <Input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={check}
            onChange={e => setCheck(e.target.value)}
            required
          />
          <Help color="danger">
            {password !== check ? 'Les mots de passe diffèrent' : ''}
          </Help>
        </Control>
      </Field>
      <Field style={{ display: withCaptcha ? 'default' : 'none' }}>
        <Label>Etes-vous un bot ?</Label>
        <Level>
          <Level.Side>
            <Control>
              <Input
                type="text"
                placeholder="captcha"
                value={captcha}
                onChange={e => setCaptcha(e.target.value)}
              />
              <Help color="danger">
                {!captcha ? 'Ce champ est requis' : ''}
              </Help>
            </Control>
            <Control>
              <Captcha reload={captchaId} />
            </Control>
          </Level.Side>
        </Level>
      </Field>
      <Field>
        <Control>
          <Help color={helpColor || 'danger'}>{help}</Help>
          <Button
            color="primary"
            onClick={onClick}
            disabled={
              !username ||
              !password ||
              (withCheck && password !== check) ||
              (withCaptcha && !captcha)
            }
          >
            {submitLabel}
          </Button>
        </Control>
      </Field>
    </>
  );
};

export default UserForm;
