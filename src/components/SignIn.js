//@flow

import React from "react";

type Props = {
  signIn: Function
};

const SignIn = ({ signIn }: Props) => {
  return (
    <div className="empty">
      <h1>Better bookmarks</h1>
      <p className="empty-title h5">Signed Out</p>
      <p className="empty-subtitle">Please signin to start.</p>
      <div className="empty-action">
        <button className="btn btn-primary" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
