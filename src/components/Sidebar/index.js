//@flow

import React from "react";
import { connect } from "react-redux";
import { fetchTags } from "../../actions/tags";
import { queryByTag, fetchBookmarks } from "../../actions/bookmarks";
import { setFilter } from "../../actions/filters";
import { Link } from "react-router-dom";
import { IconBookmarks, IconAdd, IconExport, IconTag } from "../Icons";
import {
  StyledSidebar,
  StyledActions,
  StyledListItem,
  StyledTagsList,
  SidebarButton
} from "./styles";

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
          <StyledListItem>
            <IconBookmarks />
            <Link to="/">All</Link>
          </StyledListItem>
          <StyledListItem>
            <IconAdd />
            <Link to="/bookmarks/new">New</Link>
          </StyledListItem>
          <StyledListItem>
            <IconTag />
            <Link to="/tags">Tags</Link>
          </StyledListItem>
          <StyledListItem>
            <IconExport />
            <Link to="/export">Export</Link>
          </StyledListItem>
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
