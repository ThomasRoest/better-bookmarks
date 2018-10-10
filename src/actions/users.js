import { firestore } from "../firebase";

const userRef = firestore.collection("users");

export const addUser = user => {
  return {
    type: "ADD_USER",
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL
  };
};

export const startListeningForUsers = () => {
  return dispatch => {
    userRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        dispatch(addUser(change.doc.data()));
      });
    });
  };
};
