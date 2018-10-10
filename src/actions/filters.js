export const setFilter = tag => {
  return {
    type: "SET_FILTER",
    tag
  };
};

export const setSearchTerm = searchTerm => {
  return {
    type: "SET_SEARCH_TERM",
    searchTerm
  };
};
