//@flow

import React, { useEffect } from "react";
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

interface IProps {
  auth: Object;
  fetchTags: (uid: string) => void;
  setFilter: (query: string) => void;
  tags: Array<Object>;
  filters: Object;
  queryByTag: (uid: string, query: string) => void;
  fetchBookmarks: (uid: string) => void;
}

const Sidebar = ({
  auth,
  fetchTags,
  setFilter,
  tags,
  filters,
  queryByTag,
  fetchBookmarks
}: IProps) => {
  useEffect(() => {
    fetchTags(auth.uid);
  }, [fetchTags, auth.uid]);

  const handleTagQuery = query => {
    queryByTag(auth.uid, query);
    setFilter(query);
  };

  const getAllBookmarks = () => {
    fetchBookmarks(auth.uid);
    setFilter("default");
  };

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
            onClick={getAllBookmarks}
            isActive={filters.tagFilter === "default" ? true : false}
          >
            All
          </SidebarButton>
        </li>
        {tags.map(item => (
          <SidebarButton
            key={item.id}
            title={item.title}
            onClick={e => handleTagQuery(item.title)}
            isActive={filters.tagFilter === item.title ? true : false}
          >
            {item.title}
          </SidebarButton>
        ))}
      </StyledTagsList>
    </StyledSidebar>
  );
};

const mapStateToProps = ({ tags, auth, filters }) => {
  return { tags, auth, filters };
};

export default connect(
  mapStateToProps,
  { fetchTags, fetchBookmarks, setFilter, queryByTag }
)(Sidebar);
