const errorWrapperFn = fn => {
  return async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      if (typeof err === 'string') {
        return res.status(400).json({ message: err });
      }
      return res.status(500).json({ message: err.message });
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
