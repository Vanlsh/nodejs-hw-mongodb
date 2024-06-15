export const convertBoolean = (req, res, next) => {
  const value = req.body.isFavorite;
  if (value && ['true', 'false'].includes(value)) {
    req.body.isFavorite = value === 'true';
  }
  next();
};
