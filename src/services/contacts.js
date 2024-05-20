import { ContactsCollection } from '../db/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  console.log(contacts);
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};