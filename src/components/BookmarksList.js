//@flow

import React from "react";
import BookmarkListItem from "./BookmarkListItem";
import styled from "styled-components";
import { loadMore } from "../actions/bookmarks";
import { connect } from "react-redux";

const Button = styled.button`
  background-color: #5755d9;
  border-radius: 3px;
  border: #5755d9;
  color: white;
  transition: 0.2s all;
  padding: 0.4rem;

  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
  &:active {
    background-color: hsla(191, 76%, 42%, 1);
    border-color: hsla(191, 76%, 32%, 1);
    box-shadow: inset 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
    transform: translate(1px, 1px);
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  .button-container {
    padding: 1rem;
    text-align: center;
  }
`;

type Props = {
  bookmarks: Array<Object>,
  deleteBookmark: Function,
  loadMore: Function,
  searchTerm: string,
  tagFilter: string,
  auth: Object,
  lastBookmark: Number
};

class BookmarksList extends React.Component<Props> {
  handleLoadMore = e => {
    const { auth, lastBookmark } = this.props;
    this.props.loadMore(auth.uid, lastBookmark);
  };

  render() {
    const { bookmarks, deleteBookmark } = this.props;
    const filteredList = bookmarks.sort((a, b) => {
      return b.pinned - a.pinned;
    });

    return (
      <StyledList>
        {filteredList.map(item => (
          <BookmarkListItem
            key={item.id}
            {...item}
            deleteBookmark={deleteBookmark}
          />
        ))}
        {this.props.tagFilter === "default" && (
          <div className="button-container">
            <Button onClick={this.handleLoadMore}>load more</Button>
          </div>
        )}
      </StyledList>
    );
  }
}

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
