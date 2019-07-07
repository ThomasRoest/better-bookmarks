//@flow

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StyledListItem, Actions, BookmarkInfo, Tag } from "./styles";

type Props = {
  id: string,
  title: string,
  url: string,
  tag: string,
  userId: string,
  deleteBookmark: (id: string, userId: string) => void,
  pinned: boolean
};

type State = {
  editView: boolean
};

class BookmarkListItem extends Component<Props, State> {
  state = {
    editView: false
  };

  handleClick = () => {
    this.setState(state => ({
      editView: !state.editView
    }));
  };

  render() {
    const { id, title, url, tag, deleteBookmark, userId, pinned } = this.props;

    return (
      <StyledListItem>
        {this.state.editView && (
          <React.Fragment>
            <Actions>
              <Link className="btn btn-sm" to={`/bookmarks/${id}`}>
                Edit
              </Link>

              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteBookmark(id, userId)}
              >
                delete
              </button>
            </Actions>
            <button className="btn btn-sm" onClick={this.handleClick}>
              X
            </button>
          </React.Fragment>
        )}
        {!this.state.editView && (
          <React.Fragment>
            <BookmarkInfo>
              <a href={url}>{title}</a>
              <Tag>
                <span className="label label-ro label-default">{tag}</span>
              </Tag>

              {pinned && (
                <span className="label label-runded label-success">pinned</span>
              )}
            </BookmarkInfo>
            <i className="icon icon-more-vert" onClick={this.handleClick} />
          </React.Fragment>
        )}
      </StyledListItem>
    );
  }
}

export default BookmarkListItem;
