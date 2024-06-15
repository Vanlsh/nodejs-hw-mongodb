import fs from 'node:fs/promises';

export const deleteFileHandler = async (error, req, res, next) => {
  const file = req.file;

  if (file) {
    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.log(error);
    }
  }

  next(error);
};
