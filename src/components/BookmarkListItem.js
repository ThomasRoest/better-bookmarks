//@flow

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledListItem = styled.li`
  background-color: white;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 0 1px 0 #ccc;
  .icon-more-vert {
    padding: 1em;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: lightgrey;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  }
`;

const BookmarkInfo = styled.div`
  overflow: hidden;
  .label {
    font-size: 0.8em;
  }
`;

const Actions = styled.div`
  background: white;
  padding-left: 5px;
  flex: 1 1 auto;
  display: flex;
  justify-content: space-around;
`;

type Props = {
  id: string,
  title: string,
  url: string,
  tag: string,
  userId: string,
  deleteBookmark: Function
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
    const { id, title, url, tag, deleteBookmark, userId } = this.props;

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
              <br />
              <span className="label label-rounded label-default">{tag}</span>
            </BookmarkInfo>

            <i className="icon icon-more-vert" onClick={this.handleClick} />
            {/* <button className="icon icon-edit" onClick={this.handleClick}>
              Edit
            </button> */}
          </React.Fragment>
        )}
      </StyledListItem>
    );
  }
}

export default BookmarkListItem;
