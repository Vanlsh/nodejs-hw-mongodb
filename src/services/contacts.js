import {
  SORT_ORDER,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
  DEFAULT_SORT_BY,
} from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE,
  sortOrder = SORT_ORDER.ASC,
  sortBy = DEFAULT_SORT_BY,
  filter = {},
) => {
  const contactFilter = ContactsCollection.find();

  if (typeof filter.isFavorite === 'boolean') {
    contactFilter.where('isFavorite').equals(filter.isFavorite);
  }

  if (filter.contactType) {
    contactFilter.where('contactType').equals(filter.contactType);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactFilter)
    .countDocuments();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  const limit = perPage;
  const skip = perPage * (paginationData.page - 1);

  const contacts = await contactFilter
    .skip(skip)
    .limit(limit)
    .sort({
      [sortBy]: sortOrder,
    })
    .exec();

  return { contacts, ...paginationData };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete({
    _id: contactId,
  });

  return contact;
};
