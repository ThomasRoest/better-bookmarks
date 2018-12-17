//@flow

export const setFilter = (tag: string) => {
  return {
    type: "SET_FILTER",
    tag
  };
};

export const setSearchTerm = (searchTerm: string) => {
  return {
    type: "SET_SEARCH_TERM",
    searchTerm
  };
};
