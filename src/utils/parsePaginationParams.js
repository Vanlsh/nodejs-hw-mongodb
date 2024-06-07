const parseNumber = (unknown, defaultNumber) => {
  if (typeof unknown !== 'string') return defaultNumber;

  const parsedNumber = parseInt(unknown);

  if (Number.isNaN(parsedNumber) || parsedNumber < 1) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
