//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { createBookmark } from "../actions/bookmarks";
import { fetchTags } from "../actions/tags";
import styled from "styled-components";

const StyledForm = styled.form`
  padding: 1.5rem;
  max-width: 600px;
  box-shadow: 0px 5px 5px lightgrey;
  margin: 0 auto 0 auto;
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
  @media (min-width: 579px) {
    margin-top: 10px;
  }
`;

type State = {
  title: string,
  url: string,
  tag: string,
  userId: string,
  errors: Object
};

type Props = {
  createBookmark: Function,
  tagOptions: Array<Object>,
  auth: Object,
  fetchTags: Function
};

class NewBookmarkForm extends Component<Props, State> {
  state = {
    title: "",
    url: "",
    tag: "",
    userId: this.props.auth.uid,
    errors: {}
  };

  componentDidMount() {
    this.props.fetchTags(this.props.auth.uid);
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let errors = {};
    if (this.state.title === "") errors.title = "can't be empty";
    if (this.state.url === "") errors.url = "can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { title, url, tag, userId } = this.state;
      const createdAt = Math.floor(Date.now() / 1000);
      this.props.createBookmark(
        { title, url, tag, userId, createdAt },
        this.props.auth
      );
      this.setState({ title: "", url: "", tag: "" });
    }
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h3>Add new Bookmark</h3>
        <ul>
          {Object.entries(this.state.errors).map(item => {
            return <li key={item[0]}>{`${item[0]} ${item[1]}`}</li>;
          })}
        </ul>

        <div>
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
        <div>
          <label htmlFor="tag">tag</label>
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
