//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBookmark, fetchBookmark } from "../actions/bookmarks";
import { fetchTags } from "../actions/tags";

type State = {
  id: string,
  title: string,
  url: string,
  tag: string,
  userId: string,
  errors: Object
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
  // use setstate, don't do this?
  state = {
    id: this.props.bookmark ? this.props.bookmark.id : "",
    title: this.props.bookmark ? this.props.bookmark.title : "",
    url: this.props.bookmark ? this.props.bookmark.url : "",
    tag: this.props.bookmark ? this.props.bookmark.tag : "",
    userId: this.props.bookmark ? this.props.bookmark.userId : "",
    errors: {}
  };

  componentDidMount() {
    this.props.fetchBookmark(this.props.match.params.id, this.props.auth.uid);
    this.props.fetchTags(this.props.auth.uid);
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let errors = {};
    if (this.state.title === "") errors.title = "Can't be empty";
    if (this.state.url === "") errors.url = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { id, title, url, tag, userId } = this.state;
      this.props.updateBookmark({ id, title, url, tag, userId });
      this.setState({ title: "", url: "", tag: "" });
    }
  };

  render() {
    // let errors = Object.values(this.state.errors);
    return (
      <form onSubmit={this.handleSubmit}>
        <b>Edit Bookmark</b>
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
        <div className="form-group">
          <button className="btn btn-primary" type="submit" id="title">
            submit
          </button>
        </div>
      </form>
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
