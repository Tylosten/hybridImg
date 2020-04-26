const errorWrapperFn = fn => {
  return async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const errorWrapper = app => {
  const get = (...args) => {
    const fn = args.splice(-1, 1)[0];
    return app.get(...args, errorWrapperFn(fn));
  };
  const post = (...args) => {
    const fn = args.splice(-1, 1)[0];
    return app.post(...args, errorWrapperFn(fn));
  };

  return { get, post };
};

export default errorWrapper;
