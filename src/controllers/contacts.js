import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
} from '../services/contacts.js';

export const getContactsController = async (_, res) => {
  const contacts = await getAllContacts();

  const resBody = {
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  };

  res.status(200).json(resBody);
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
