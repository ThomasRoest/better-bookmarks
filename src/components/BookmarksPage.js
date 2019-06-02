//@flow

import React, { useEffect } from "react";
import { connect } from "react-redux";
import BookmarksList from "./BookmarksList";
import LoadingSpinner from "./LoadingSpinner";
import { fetchBookmarks, deleteBookmark } from "../actions/bookmarks";
import { loadingStart, loadingFinished } from "../actions/loading";
import styled from "styled-components";

const StyledBookmarksPage = styled.div`
  flex-basis: 80%;
`;

type Props = {
  bookmarks: Array<Object>,
  fetchBookmarks: Function,
  deleteBookmark: Function,
  auth: Object,
  isLoading: string
};

const BookmarksPage = ({
  fetchBookmarks,
  auth,
  isLoading,
  deleteBookmark
}: Props) => {
  useEffect(() => {
    fetchBookmarks(auth.uid);
  }, []);

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
