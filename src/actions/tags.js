import { firestore } from "../firebase";

export const addTag = (id, tag) => {
  return {
    type: "ADD_TAG",
    tag: { id, ...tag }
  };
};

export const setTags = tags => {
  console.log(tags);
  return {
    type: "SET_TAGS",
    tags
  };
};

export const tagDeleted = id => {
  return {
    type: "REMOVE_TAG",
    id
  };
};

export const fetchTags = userId => {
  const tagsRef = firestore.collection(`users/${userId}/tags`).orderBy("title");
  return dispatch => {
    tagsRef.get().then(querySnapshot => {
      const newTags = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch(setTags(newTags));
    });
  };
};

export const createTag = tag => {
  const tagsRef = firestore.collection(`users/${tag.userId}/tags`);
  return dispatch => {
    tagsRef.add(tag).then(docRef => {
      dispatch(addTag(docRef.id, tag));
    });
  };
};

export const deleteTag = (id, userId) => {
  const tagsRef = firestore.collection(`users/${userId}/tags`);
  return dispatch => {
    tagsRef
      .doc(id)
      .delete()
      .then(() => {
        dispatch(tagDeleted(id));
      });
  };
};
