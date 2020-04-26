function isAuth(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).redirect('/login');
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(401).redirect('/home');
    }

    return next(null);
  };
}

export default isAuth;
