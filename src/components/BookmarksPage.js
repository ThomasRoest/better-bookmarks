//@flow

import React, { Component } from "react";
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

class BookmarksPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchBookmarks(this.props.auth.uid);
  }
  render() {
    return (
      <StyledBookmarksPage>
        {this.props.isLoading && <LoadingSpinner />}
        {/* {this.props.bookmarks.length === 0 && (
          <div className="empty">
            <div className="empty-icon">
              <i className="icon icon-people" />
            </div>
            <p className="empty-title h5">No Bookmarks yet!</p>
            <div className="empty-action">
              <button className="btn btn-primary">Add a new bookmark</button>
            </div>
          </div>
        )} */}
        <BookmarksList deleteBookmark={this.props.deleteBookmark} />
      </StyledBookmarksPage>
    );
  }
}

const mapStateToProps = ({ auth, isLoading }) => {
  return { auth, isLoading };
};

export default connect(
  mapStateToProps,
  { fetchBookmarks, deleteBookmark, loadingStart, loadingFinished }
)(BookmarksPage);
