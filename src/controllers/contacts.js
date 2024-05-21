import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (_, res) => {
  const contacts = await getAllContacts();
  const resBody = { data: contacts, message: 'Successfully found contacts!' };
  res.status(200).json(resBody);
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    next(new Error('Not found'));
  }

  res.status(200).json({
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};
