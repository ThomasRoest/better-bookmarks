//@flow

import React from "react";
import BookmarkListItem from "../BookmarkListItem";
import { loadMore } from "../../actions/bookmarks";
import { connect } from "react-redux";
import { Button, StyledList } from "./styles";

type Props = {
  bookmarks: Array<Object>,
  deleteBookmark: Function,
  loadMore: Function,
  searchTerm: string,
  tagFilter: string,
  auth: Object,
  lastBookmark: Number
};

const BookmarksList = ({
  bookmarks,
  deleteBookmark,
  loadMore,
  searchTerm,
  tagFilter,
  auth,
  lastBookmark
}: Props) => {
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
