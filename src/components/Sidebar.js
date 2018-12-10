//@flow

import React from "react";
import styled, { css } from "styled-components";
import ExportFile from "./ExportFile";
import { connect } from "react-redux";
import { fetchTags } from "../actions/tags";
import { queryByTag, fetchBookmarks } from "../actions/bookmarks";
import { setFilter } from "../actions/filters";
import { Link } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: #f8f9fa;
  flex: 1 1 15%;
  min-height: 100vh;
  ul {
    list-style-type: none;
    padding: 0;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;

const StyledTagsList = styled.ul`
  list-style-type: none;
  padding: 0;
  button {
    display: block;
    margin-top: 5px;
  }
`;

const SidebarButton = styled.button`
  background-color: white;
  border-radius: 3px;
  border: 1px solid hsla(191, 76%, 37%, 1);
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
  color: #5755d9;
  font-size: 0.7rem;

  transition: 0.2s all;
  &:hover {
    background-color: #5755d9;
    color: white;
    cursor: pointer;
  }
  &:active {
    background-color: hsla(191, 76%, 42%, 1);
    border-color: hsla(191, 76%, 32%, 1);
    box-shadow: inset 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
    transform: translate(1px, 1px);
  }
  ${props =>
    props.isActive &&
    css`
      background: #5755d9;
      color: white;
    `};
`;

type Props = {
  auth: Object,
  fetchTags: Function,
  setFilter: Function,
  tags: Array<Object>,
  filters: Object,
  queryByTag: Function,
  fetchBookmarks: Function
};

class Sidebar extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTags(this.props.auth.uid);
  }

  handleTagQuery = query => {
    this.props.queryByTag(this.props.auth.uid, query);
    this.props.setFilter(query);
  };

  getAllBookmarks = () => {
    this.props.fetchBookmarks(this.props.auth.uid);
    this.props.setFilter("default");
  };

  render() {
    return (
      <StyledSidebar>
        <ul>
          <li>
            <Link to="/">All bookmarks</Link>
          </li>
          <li>
            <Link to="/bookmarks/new">New bookmark +</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
          <li>
            <ExportFile />
          </li>
        </ul>

        <StyledTagsList>
          <b>tags</b>
          <li>
            <SidebarButton
              onClick={this.getAllBookmarks}
              isActive={
                this.props.filters.tagFilter === "default" ? true : false
              }
            >
              All
            </SidebarButton>
          </li>
          {this.props.tags.map(item => (
            <SidebarButton
              key={item.id}
              title={item.title}
              onClick={e => this.handleTagQuery(item.title)}
              isActive={
                this.props.filters.tagFilter === item.title ? true : false
              }
            >
              {item.title}
            </SidebarButton>
          ))}
        </StyledTagsList>
      </StyledSidebar>
    );
  }
}

const mapStateToProps = ({ tags, auth, filters }) => {
  return { tags, auth, filters };
};

export default connect(
  mapStateToProps,
  { fetchTags, fetchBookmarks, setFilter, queryByTag }
)(Sidebar);
