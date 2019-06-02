//@flow

import React from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { fetchTags } from "../actions/tags";
import { queryByTag, fetchBookmarks } from "../actions/bookmarks";
import { setFilter } from "../actions/filters";
import { Link } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: #fafafa;
  flex: 1 1 15%;
  padding: 1rem;
  min-height: 100vh;
  ul {
    list-style-type: none;
    padding: 0;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;

// &:hover {
//   color: #1665d8;
//   background-color: rgba(84, 147, 245, 0.1);
// }
// &:active {
//   transform: scale(0.99);
//   background-color: #1665d8;
//   color: white;
// }

const StyledActions = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0 0 20px 0;
`;

const StyledTagsList = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0;
  button {
    margin-bottom: 2px;
  }
`;

const SidebarButton = styled.button`
  background-color: #fafafa;
  width: 100%;
  border-radius: 3px;
  border: 0px;
  padding: 0.1rem 0.1rem 0.1rem 0.4rem;
  /* border: 1px solid hsla(191, 76%, 37%, 1); */
  /* box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2); */
  color: #5755d9;
  font-size: 0.7rem;
  text-align: left;
  transition: 0.2s all;
  &:hover {
    background-color: #1665d8;
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
        <StyledActions>
          <li>
            <Link to="/">All bookmarks</Link>
          </li>
          <li>
            <Link to="/bookmarks/new">New bookmark</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
          <li>
            <Link to="/export">Export</Link>
          </li>
        </StyledActions>

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
