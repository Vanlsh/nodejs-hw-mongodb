export const errorHandler = (error, _, res, __) => {
  const { message = 'Server internal error!', status = 500 } = error;
  res.status(status).json({ message });
};
