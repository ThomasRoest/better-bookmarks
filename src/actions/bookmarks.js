import { firestore } from "../firebase";
import axios from "axios";
import { LAMBDA_ENDPOINT } from "../config";

export const setBookmarks = bookmarks => {
  return {
    type: "SET_BOOKMARKS",
    payload: bookmarks
  };
};

export const paginateBookmarks = bookmarks => {
  return {
    type: "PAGINATE_BOOKMARKS",
    payload: bookmarks
  };
};

export const addBookmark = (id, data) => {
  return {
    type: "ADD_BOOKMARK",
    payload: {
      id: id,
      title: data.title,
      url: data.url,
      userId: data.userId,
      searchTerms: data.searchTerms
    }
  };
};

export const createAlgoliaItem = (id, data) => {
  const bookmark = { id, ...data };
  return dispatch => {
    axios.post(`${LAMBDA_ENDPOINT}algolia-add`, JSON.stringify(bookmark));
  };
};

export const deleteAlgoliaItem = (id, userId) => {
  const data = { id, userId };
  return dispatch => {
    axios.post(`${LAMBDA_ENDPOINT}algolia-delete`, JSON.stringify(data));
  };
};

export const bookmarkDeleted = id => {
  return {
    type: "REMOVE_BOOKMARK",
    payload: { id }
  };
};

export const bookmarkFetched = (id, data) => {
  return {
    type: "BOOKMARK_FETCHED",
    payload: { id, ...data }
  };
};

export const setLastbookmark = lastbookmark => {
  return {
    type: "SET_LAST_BOOKMARK",
    lastbookmark
  };
};

export const fetchBookmarks = userId => {
  const bookmarkRef = firestore
    .collection(`users/${userId}/bookmarks`)
    .orderBy("pinned", "desc")
    .orderBy("createdAt", "desc")
    .limit(10);
  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });

      if (newbookmarks.length >= 1) {
        dispatch(setBookmarks(newbookmarks));
        dispatch(setLastbookmark(newbookmarks[newbookmarks.length - 1]));
      }
    });
  };
};

export const queryByTag = (userId, tag) => {
  const bookmarkRef = firestore
    .collection(`users/${userId}/bookmarks`)
    .where("tag", "==", tag);

  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });
      dispatch(setBookmarks(newbookmarks));
    });
  };
};

export const searchQuery = (userId, query) => {
  const bookmarkRef = firestore
    .collection(`users/${userId}/bookmarks`)
    .where("searchTerms", "array-contains", query);

  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });
      dispatch(setBookmarks(newbookmarks));
    });
  };
};

export const loadMore = (userId, lastbookmark) => {
  const bookmarkRef = firestore
    .collection(`users/${userId}/bookmarks`)
    .where("pinned", "==", false)
    .orderBy("createdAt", "desc")
    .startAfter(lastbookmark)
    .limit(10);
  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });

      if (newbookmarks.length >= 1) {
        dispatch(paginateBookmarks(newbookmarks));
        dispatch(setLastbookmark(newbookmarks[newbookmarks.length - 1]));
      }
    });
  };
};

export const createBookmark = bookmark => {
  const bookmarkRef = firestore.collection(
    `users/${bookmark.userId}/bookmarks`
  );
  return dispatch => {
    bookmarkRef
      .add(bookmark)
      .then(docRef => {
        dispatch(addBookmark(docRef.id, bookmark));
        dispatch(createAlgoliaItem(docRef.id, bookmark));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteBookmark = (id, userId) => {
  const bookmarkRef = firestore.collection(`users/${userId}/bookmarks`);
  return dispatch => {
    bookmarkRef
      .doc(id)
      .delete()
      .then(() => {
        dispatch(bookmarkDeleted(id));
      });
    dispatch(deleteAlgoliaItem(id, userId));
  };
};

export const fetchAllBookmarks = userId => {
  console.log("fetching all bookmarks");
  const bookmarkRef = firestore
    .collection(`users/${userId}/bookmarks`)
    .orderBy("createdAt", "desc");
  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });
      dispatch(setBookmarks(newbookmarks));
    });
  };
};
