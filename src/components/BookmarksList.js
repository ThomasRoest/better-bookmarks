//@flow

import React from "react";
import BookmarkListItem from "./BookmarkListItem";
import styled from "styled-components";
import { loadMore } from "../actions/bookmarks";
import { connect } from "react-redux";

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
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
  filterByTag = item => {
    return item.tag === this.props.tagFilter;
  };

  filterBySearchTerm = item => {
    if (this.props.searchTerm.startsWith("#")) {
      const searchTerm = this.props.searchTerm.substring(1);
      return `${item.tag}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;
    } else {
      return (
        `${item.title} ${item.url}`
          .toUpperCase()
          .indexOf(this.props.searchTerm.toUpperCase()) >= 0
      );
    }
  };

  handleLoadMore = e => {
    const { auth, lastBookmark } = this.props;
    this.props.loadMore(auth.uid, lastBookmark);
  };

  render() {
    const { bookmarks, deleteBookmark, searchTerm, tagFilter } = this.props;
    let filteredList = [];

    if (searchTerm.length >= 1) {
      filteredList = bookmarks.filter(this.filterBySearchTerm);
    } else if (tagFilter !== "default") {
      filteredList = bookmarks.filter(this.filterByTag);
    } else {
      filteredList = bookmarks.sort((a, b) => {
        return b.pinned - a.pinned;
      });
    }

    return (
      <StyledList>
        {filteredList.map(item => (
          <BookmarkListItem
            key={item.id}
            {...item}
            deleteBookmark={deleteBookmark}
          />
        ))}
        <button onClick={this.handleLoadMore}>load more</button>
      </StyledList>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tagFilter: state.filters.tagFilter,
    searchTerm: state.filters.searchTerm,
    lastBookmark: state.lastBookmark
  };
};

export default connect(
  mapStateToProps,
  { loadMore }
)(BookmarksList);
