import { firestore } from "../firebase";

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
      userId: data.userId
    }
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
    .orderBy("createdAt", "desc")
    .limit(4);
  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });
      dispatch(setBookmarks(newbookmarks));
      dispatch(setLastbookmark(newbookmarks[newbookmarks.length - 1]));
    });
  };
};

export const loadMore = (userId, lastbookmark) => {
  const bookmarkRef = firestore
    .collection(`users/${userId}/bookmarks`)
    .orderBy("createdAt", "desc")
    .startAfter(lastbookmark)
    .limit(4);
  return dispatch => {
    dispatch({ type: "LOADING_START" });

    bookmarkRef.get().then(querySnapshot => {
      const newbookmarks = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "LOADING_FINISHED" });
      dispatch(paginateBookmarks(newbookmarks));
      dispatch(setLastbookmark(newbookmarks[newbookmarks.length - 1]));
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
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateBookmark = bookmark => {
  const bookmarkRef = firestore.collection(
    `users/${bookmark.userId}/bookmarks`
  );
  return dispatch => {
    bookmarkRef.doc(bookmark.id).update({
      title: bookmark.title,
      url: bookmark.url,
      tag: bookmark.tag,
      pinned: bookmark.pinned
    });
  };
};

export const fetchBookmark = (id, userId) => {
  const bookmarkRef = firestore.collection(`users/${userId}/bookmarks`);
  return dispatch => {
    bookmarkRef
      .doc(id)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          dispatch(bookmarkFetched(doc.id, doc.data()));
        } else {
          return;
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
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
  };
};
