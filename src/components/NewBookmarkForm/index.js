//@flow

import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LAMBDA_ENDPOINT } from "../../config";
import { connect } from "react-redux";
import { createBookmark } from "../../actions/bookmarks";
import { fetchTags } from "../../actions/tags";
import { StyledForm } from "./styles";
import { IBookmark, ITag, IAuth } from "../../types";

type State = {
  title: string,
  url: string,
  tag: string,
  pinned: boolean,
  errors: {},
  isLoading: boolean,
  params: null | {}
};

type Props = {
  createBookmark: (bookmark: IBookmark) => void,
  createAlgoliaItem: () => void,
  tagOptions: ITag[],
  auth: IAuth,
  fetchTags: (uid: string) => void
};

class NewBookmarkForm extends Component<Props, State> {
  state = {
    title: "",
    url: "",
    tag: "watch-later",
    pinned: false,
    errors: {},
    isLoading: false,
    params: null
  };

  componentDidMount() {
    this.props.fetchTags(this.props.auth.uid);
    this.getParams();
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ [event.target.name]: value });
    if (event.target.name === "url") {
      this.getTitle(value);
    }
  };

  validate = () => {
    const errors = {};
    const { title, url, tag } = this.state;
    if (title === "") errors.title = "title is required";
    if (url === "") errors.url = "url is required";
    if (tag === "") errors.tag = "tag is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    if (!errors) {
      const { title, url, tag, pinned } = this.state;
      const createdAt = Math.floor(Date.now() / 1000);
      const userId = this.props.auth.uid;
      const bookmark = { title, url, tag, pinned, createdAt, userId };
      this.props.createBookmark(bookmark);
      this.setState({ title: "", url: "", tag: "" });
      toast.success("Bookmark added!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  getTitle = async url => {
    this.setState({ isLoading: true });
    const obj = {
      url: url
    };
    try {
      let response = await axios.post(
        `${LAMBDA_ENDPOINT}get-title`,
        JSON.stringify(obj)
      );
      this.setState({ title: response.data.pageTitle, isLoading: false });
    } catch (error) {
      console.log("ERROR: " + error);
      this.setState({
        isLoading: false
      });
    }
  };

  getParams = () => {
    const parsedUrl = new URL(window.location);
    const params: any = {
      text: parsedUrl.searchParams.get("text"),
      url: parsedUrl.searchParams.get("url"),
      title: parsedUrl.searchParams.get("title")
    };
    this.setState({ params, url: params.text });
    if (params.text && params.text.length > 0) {
      this.getTitle(params.text);
    }
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        {this.state.isLoading && (
          <div>
            getting title....
            <div className="loading loading-lg" />
          </div>
        )}

        <div />
        <h3>Add new Bookmark</h3>
        <div>
          <label htmlFor="url">url</label>
          {this.state.errors.url && (
            <p className="form-error">{this.state.errors.url}</p>
          )}
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
          <label htmlFor="title">title</label>
          {this.state.errors.title && (
            <p className="form-error">{this.state.errors.title}</p>
          )}
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

        <div>
          <label htmlFor="tag">tag</label>
          {this.state.errors.tag && (
            <p className="form-error">{this.state.errors.tag}</p>
          )}
          <select
            className="form-select"
            name="tag"
            value={this.state.tag}
            onChange={this.handleChange}
          >
            {this.props.tagOptions.map(tag => (
              <option key={tag.id} value={tag.title}>
                {tag.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
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
        <div>
          <br />
          <button className="btn btn-primary" type="submit" id="title">
            submit
          </button>
        </div>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  tagOptions: state.tags,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchTags, createBookmark }
)(NewBookmarkForm);
