//@flow

import React, { useEffect } from "react";
import { connect } from "react-redux";
import BookmarksList from "../BookmarksList";
import LoadingSpinner from "../LoadingSpinner";
import { fetchBookmarks, deleteBookmark } from "../../actions/bookmarks";
import { loadingStart, loadingFinished } from "../../actions/loading";
import { StyledBookmarksPage } from "./styles";
import { IBookmark, IAuth } from "../../types";

interface IProps {
  bookmarks: IBookmark[];
  fetchBookmarks: (uid: string) => void;
  deleteBookmark: () => void;
  auth: IAuth;
  isLoading: string;
}

const BookmarksPage = ({
  fetchBookmarks,
  auth,
  isLoading,
  deleteBookmark
}: IProps) => {
  useEffect(() => {
    fetchBookmarks(auth.uid);
  }, [auth.uid, fetchBookmarks]);

  return (
    <StyledBookmarksPage>
      {isLoading && <LoadingSpinner />}
      <BookmarksList deleteBookmark={deleteBookmark} />
    </StyledBookmarksPage>
  );
};

const mapStateToProps = ({ auth, isLoading }) => {
  return { auth, isLoading };
};

export default connect(
  mapStateToProps,
  { fetchBookmarks, deleteBookmark, loadingStart, loadingFinished }
)(BookmarksPage);
