//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import NewTagForm from "./NewTagForm";
import { Link } from "react-router-dom";
import { fetchTags, deleteTag } from "../actions/tags";
import { setFilter } from "../actions/filters";
import styled from "styled-components";

const StyledTagList = styled.ul`
  list-style-type: none;

  li {
    background-color: white;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0 1px 0 #ccc;
    border-radius: 3px;
  }
`;

type Props = {
  tags: Array<Object>,
  fetchTags: Function,
  deleteTag: Function,
  setFilter: Function,
  auth: Object
};

class TagsPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchTags(this.props.auth.uid);
  }

  render() {
    return (
      <StyledTagList>
        <h2>Tags</h2>
        <NewTagForm />
        {this.props.tags.map(tag => (
          <li key={tag.id}>
            <Link
              to="/"
              onClick={() => this.props.setFilter(tag.title)}
              className="btn btn-sm"
            >
              {tag.title}
            </Link>

            <button
              className="btn btn-sm btn-error"
              onClick={() => this.props.deleteTag(tag.id, this.props.auth.uid)}
            >
              delete
            </button>
          </li>
        ))}
        <br />
      </StyledTagList>
    );
  }
}
const mapStateToProps = ({ tags, auth }) => {
  return { tags, auth };
};

export default connect(
  mapStateToProps,
  { fetchTags, deleteTag, setFilter }
)(TagsPage);
