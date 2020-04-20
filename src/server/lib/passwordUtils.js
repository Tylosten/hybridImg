import crypto from 'crypto';

export const verifyPassword = (password, hash, salt) => {
  const genHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return genHash === hash;
};

export const genPassword = password => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
};
