// @flow

import { firestore } from "../firebase";

export const fetchTags = (uid: string) => {
  return firestore
    .collection(`users/${uid}/tags`)
    .get()
    .then(querySnapshot => {
      const tags = [];
      querySnapshot.forEach(doc => {
        tags.push({ id: doc.id, ...doc.data() });
      });
      return tags;
    });
};

export default {
  fetchTags
};
