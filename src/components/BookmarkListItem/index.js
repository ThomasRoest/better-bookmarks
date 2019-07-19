//@flow

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StyledListItem, Actions, BookmarkInfo, Tag } from "./styles";

type IProps = {
  id: string,
  title: string,
  url: string,
  tag: string,
  userId: string,
  deleteBookmark: (id: string, userId: string) => void,
  pinned: boolean
};

const BookmarkListItem = (props: IProps) => {
  const [editView, setEditView] = useState(false);

  const handleClick = () => {
    setEditView(!editView);
  };

  const { id, title, url, tag, deleteBookmark, userId, pinned } = props;
  return (
    <StyledListItem>
      {editView && (
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
          <button className="btn btn-sm" onClick={handleClick}>
            X
          </button>
        </React.Fragment>
      )}
      {!editView && (
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
          <i className="icon icon-more-vert" onClick={handleClick} />
        </React.Fragment>
      )}
    </StyledListItem>
  );
};

export default BookmarkListItem;
