// @flow

import { firestore } from "../firebase";
import { IBookmark } from "../types";

export const fetchBookmark = (id: number, uid: string) => {
  return firestore
    .collection(`users/${uid}/bookmarks`)
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        return;
      }
    })
    .catch(error => {
      console.log("Error getting document:", error);
    });
};

export const updateBookmark = (bookmark: IBookmark) => {
  const bookmarkRef = firestore.collection(
    `users/${bookmark.userId}/bookmarks`
  );
  return bookmarkRef.doc(bookmark.id).update({
    title: bookmark.title,
    url: bookmark.url,
    tag: bookmark.tag,
    pinned: bookmark.pinned
  });
};

export default {
  fetchBookmark,
  updateBookmark
};
