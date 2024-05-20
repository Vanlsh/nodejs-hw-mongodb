import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const PORT = env('PORT', '3000');
  const app = express();

  app.use(pino());
  app.use(cors());

  app.get('/contacts', async (_, res) => {
    try {
      const contacts = await getAllContacts();
      res
        .status(200)
        .json({ data: contacts, message: 'Successfully found contacts!' });
    } catch (error) {
      next();
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
      res.status(200).json({
        data: contact,
        message: `Successfully found contact with id ${contactId}!`,
      });
    } catch (error) {
      next({ message: 'Contact not found!', status: 404 });
    }
  });

  app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((error, _, res, __) => {
    const { message = 'Server internal error!', status = 500 } = error;
    res.status(status).json({ message });
  });

  app.listen(PORT, (error) => {
    if (error) {
      console.log('Server crushed. error: ', error);
      process.exit(1);
    }
    console.log('Server is running on port', PORT);
  });
};
