//@flow
import React from "react";

interface IProps {
  signIn: () => void;
}

const SignIn = ({ signIn }: IProps) => {
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
