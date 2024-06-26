export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);

  page = Math.max(1, Math.min(page, totalPages));

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
