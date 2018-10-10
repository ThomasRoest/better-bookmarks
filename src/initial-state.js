const initialState = {
  auth: {
    status: "ANONYMOUS",
    email: null,
    displayName: null,
    photoURL: null,
    uid: null
  },
  filters: {
    tagFilter: "default",
    searchTerm: ""
  },
  isLoading: false,
  tags: [],
  bookmarks: []
};

export default initialState;
