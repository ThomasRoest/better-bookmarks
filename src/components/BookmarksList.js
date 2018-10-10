//@flow

import React from "react";
import BookmarkListItem from "./BookmarkListItem";
import styled from "styled-components";
import { connect } from "react-redux";

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;

type Props = {
  bookmarks: Array<Object>,
  deleteBookmark: Function,
  searchTerm: string,
  tagFilter: string
};

class BookmarksList extends React.Component<Props> {
  filterByTag = item => {
    return item.tag === this.props.tagFilter;
  };

  filterBySearchTerm = item => {
    return (
      `${item.title} ${item.url}`
        .toUpperCase()
        .indexOf(this.props.searchTerm.toUpperCase()) >= 0
    );
  };

  render() {
    const { bookmarks, deleteBookmark, searchTerm, tagFilter } = this.props;
    let filteredList = [];

    if (searchTerm.length > 1) {
      filteredList = bookmarks.filter(this.filterBySearchTerm);
    } else if (tagFilter !== "default") {
      filteredList = bookmarks.filter(this.filterByTag);
    } else {
      filteredList = bookmarks;
    }

    return (
      <StyledList>
        {/* {tagFilter} | {searchTerm} */}
        {filteredList.map(item => (
          <BookmarkListItem
            key={item.id}
            {...item}
            deleteBookmark={deleteBookmark}
          />
        ))}
      </StyledList>
    );
  }
}

const mapStateToProps = state => {
  return {
    tagFilter: state.filters.tagFilter,
    searchTerm: state.filters.searchTerm
  };
};

export default connect(mapStateToProps)(BookmarksList);
