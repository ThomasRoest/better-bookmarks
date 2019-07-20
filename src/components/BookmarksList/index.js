//@flow

import React from "react";
import BookmarkListItem from "../BookmarkListItem";
import { loadMore } from "../../actions/bookmarks";
import { connect } from "react-redux";
import { Button, StyledList } from "./styles";
import { IBookmark, IAuth } from "../../types";

interface IProps {
  bookmarks: IBookmark[];
  deleteBookmark: () => void;
  loadMore: (uid: string, lastBookmark: number) => void;
  searchTerm: string;
  tagFilter: string;
  auth: IAuth;
  lastBookmark: number;
}

const BookmarksList = ({
  bookmarks,
  deleteBookmark,
  loadMore,
  searchTerm,
  tagFilter,
  auth,
  lastBookmark
}: IProps) => {
  const handleLoadMore = e => {
    loadMore(auth.uid, lastBookmark);
  };

  return (
    <StyledList>
      {bookmarks.map(item => (
        <BookmarkListItem
          key={item.id}
          {...item}
          deleteBookmark={deleteBookmark}
        />
      ))}
      {tagFilter === "default" && (
        <div className="button-container">
          <Button onClick={handleLoadMore}>load more</Button>
        </div>
      )}
    </StyledList>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tagFilter: state.filters.tagFilter,
    searchTerm: state.filters.searchTerm,
    lastBookmark: state.lastBookmark,
    bookmarks: state.bookmarks
  };
};

export default connect(
  mapStateToProps,
  { loadMore }
)(BookmarksList);
