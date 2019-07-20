//@flow

import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { fetchTags } from "../../actions/tags";
import { StyledForm } from "./styles";
import bookmarks from "../../api/bookmarks";
import { TextInput } from "../Inputs";
import { TagsInput } from "../Inputs/TagsInput";
import LoadingSpinner from "../LoadingSpinner";
import { IBookmark, ITag, IAuth } from "../../types";

interface IProps {
  bookmark: IBookmark;
  fetchTags: () => void;
  tagOptions: ITag[];
  auth: IAuth;
  match: RouteComponentProps;
  history: RouteComponentProps;
}

const EditBookmarkForm = ({ match, history, auth }: IProps) => {
  const [bookmark, setBookmark] = useState<IBookmark | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const response = await bookmarks.fetchBookmark(match.params.id, auth.uid);
      setBookmark(response);
      setLoading(false);
    };
    fetch();
  }, [auth.uid, match.params.id]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const updatedBookmark = { ...bookmark, [name]: value };
    setBookmark(updatedBookmark);
  };

  const handleCheck = event => {
    const updatedBookmark: any = {
      ...bookmark,
      pinned: event.target.checked
    };
    setBookmark(updatedBookmark);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let errors = [];
    if (bookmark && bookmark.title === "") {
      errors.push({ name: "title", msg: "cant be empty" });
    }
    if (bookmark && bookmark.url === "") {
      errors.push({ name: "url", msg: "cant be empty" });
    }
    setErrors(errors);
    const isValid = errors.length === 0;

    if (bookmark && isValid) {
      const { id, title, url, tag, userId, pinned } = bookmark;
      bookmarks.updateBookmark({ id, title, url, tag, userId, pinned });
      history.push("/");
      toast.success("updated bookmark");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {bookmark && (
        <StyledForm onSubmit={handleSubmit}>
          <h3>Edit bookmark</h3>
          {errors.map(error => (
            <p key={error.name}>
              {error.name} {error.msg}
            </p>
          ))}
          <TextInput
            value={bookmark.title}
            name="title"
            handleChange={handleChange}
            label="title"
            placeholder="title"
          />
          <TextInput
            value={bookmark.url}
            name="url"
            handleChange={handleChange}
            label="url"
            placeholder="url"
          />
          <TagsInput
            value={bookmark.tag}
            name="tag"
            handleChange={handleChange}
            label="tags"
            placeholder="tags"
            userID={auth.uid}
          />
          <div className="form-group form-group-checkbox">
            <label className="form-checkbox">
              <input
                name="pinned"
                checked={bookmark.pinned}
                type="checkbox"
                onChange={handleCheck}
              />
              <i className="form-icon" /> Pin to top
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit" id="title">
              submit
            </button>
          </div>
        </StyledForm>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    return {
      auth: state.auth
    };
  }
  return { bookmark: null };
};

export default connect(
  mapStateToProps,
  { fetchTags }
)(EditBookmarkForm);
