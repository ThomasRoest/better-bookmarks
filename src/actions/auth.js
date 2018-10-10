import { auth, googleAuthProvider, firestore } from "../firebase";

const userRef = firestore.collection("users");

export const signIn = () => {
  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGIN" });
    auth.signInWithPopup(googleAuthProvider);
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGIN" });
    auth.signOut();
  };
};

const signedIn = user => {
  return {
    type: "SIGN_IN",
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid
  };
};

const signedOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const startListeningToAuthChanges = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(signedIn(user));
        userRef.doc(user.uid).set({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          uid: user.uid
        });
      } else {
        dispatch(signedOut());
      }
    });
  };
};
