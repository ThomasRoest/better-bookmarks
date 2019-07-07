//@flow

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateBookmark, fetchBookmark } from "../actions/bookmarks";
import { fetchTags } from "../actions/tags";

const StyledForm = styled.form`
  padding: 1rem;
  .form-group.form-group-checkbox {
    margin: 20px 0 20px 0 !important;
  }
  padding: 1.5rem;
  max-width: 600px;
  background-color: white;
  border-radius: 3px;
  margin: 0 auto 0 auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15);
  .form-input,
  select {
    border-radius: 0px;
    padding-left: 0px;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    border-bottom: 1px solid blue;
    margin-bottom: 20px;
  }
`;

type State = {
  id: string,
  title: string,
  url: string,
  tag: string,
  userId: string,
  errors: Object,
  pinned: boolean
};

type Props = {
  bookmark: Object,
  updateBookmark: Function,
  fetchBookmark: Function,
  fetchTags: Function,
  tagOptions: Array<Object>,
  auth: Object,
  match: Object
};

class EditBookmarkForm extends Component<Props, State> {
  state = {
    id: this.props.bookmark ? this.props.bookmark.id : "",
    title: this.props.bookmark ? this.props.bookmark.title : "",
    url: this.props.bookmark ? this.props.bookmark.url : "",
    tag: this.props.bookmark ? this.props.bookmark.tag : "",
    userId: this.props.bookmark ? this.props.bookmark.userId : "",
    pinned:
      this.props.bookmark && Object.keys(this.props.bookmark).includes("pinned")
        ? this.props.bookmark.pinned
        : false,
    errors: {}
  };

  componentDidMount() {
    this.props.fetchBookmark(this.props.match.params.id, this.props.auth.uid);
    this.props.fetchTags(this.props.auth.uid);
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let errors = {};
    if (this.state.title === "") errors.title = "Can't be empty";
    if (this.state.url === "") errors.url = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { id, title, url, tag, userId, pinned } = this.state;
      this.props.updateBookmark({ id, title, url, tag, userId, pinned });
      this.setState({ title: "", url: "", tag: "", pinned: false });
    }
  };

  render() {
    // let errors = Object.values(this.state.errors);
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h3>Edit bookmark</h3>
        {/* <div>{errors}</div> */}
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input
            className="form-input"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            id="title"
            placeholder="add title.."
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">url</label>
          <input
            className="form-input"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            type="text"
            id="url"
            placeholder="add url.."
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <select
            className="form-select"
            name="tag"
            value={this.state.tag}
            onChange={this.handleChange}
          >
            <option value="" />
            {this.props.tagOptions.map(tag => (
              <option key={tag.id} value={tag.title}>
                {tag.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group form-group-checkbox">
          <label className="form-checkbox">
            <input
              name="pinned"
              type="checkbox"
              checked={this.state.pinned}
              onChange={this.handleChange}
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
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    return {
      bookmark: state.bookmarks.find(item => item.id === props.match.params.id),
      tagOptions: state.tags,
      auth: state.auth
    };
  }
  return { bookmark: null };
};

export default connect(
  mapStateToProps,
  { updateBookmark, fetchBookmark, fetchTags }
)(EditBookmarkForm);
