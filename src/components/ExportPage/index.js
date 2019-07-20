//@flow

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllBookmarks } from "../../actions/bookmarks";
import ExportFile from "../ExportFile";
import LoadingSpinner from "../LoadingSpinner";
import { IBookmark, IAuth } from "../../types";

interface IProps {
  bookmarks: IBookmark[];
  isLoading: boolean;
  fetchAllBookmarks: (uid: string) => void;
  auth: IAuth;
}

const ExportPage = ({
  bookmarks,
  fetchAllBookmarks,
  auth,
  isLoading
}: IProps) => {
  useEffect(() => {
    const fetch = () => {
      fetchAllBookmarks(auth.uid);
    };
    fetch();
  }, [auth.uid, fetchAllBookmarks]);

  return (
    <div>
      <ul>
        <ExportFile />
        {isLoading && <LoadingSpinner />}
        {bookmarks.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ auth, bookmarks, isLoading }) => {
  return { auth, bookmarks, isLoading };
};

export default connect(
  mapStateToProps,
  { fetchAllBookmarks }
)(ExportPage);
