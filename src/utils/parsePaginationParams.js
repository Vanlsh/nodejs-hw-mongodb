import { PER_PAGE_LIMIT } from '../constants/index.js';

const parseNumber = (unknown, defaultNumber) => {
  if (typeof unknown !== 'string') return defaultNumber;

  const parsedNumber = parseInt(unknown);

  if (Number.isNaN(parsedNumber) || parsedNumber < 1) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const page = parseNumber(query.page, 1);
  const perPage = parseNumber(query.perPage, 10);

  return {
    page,
    perPage: perPage <= PER_PAGE_LIMIT ? perPage : PER_PAGE_LIMIT,
  };
};
