import { CONTACT_TYPE } from '../constants/index.js';

const parseContactType = (unknown) => {
  if (CONTACT_TYPE.includes(unknown)) return unknown;
};

const parseBoolean = (unknown) => {
  if (['true', 'false'].includes(unknown)) return unknown === 'true';
};

export const parseFilters = (query) => {
  return {
    isFavorite: parseBoolean(query.isFavorite),
    contactType: parseContactType(query.contactType),
  };
};
