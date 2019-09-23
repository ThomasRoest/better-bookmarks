//@flow

import React, { useEffect, useState } from "react";
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
  const [filter, setTagFilter] = useState("");

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

  const filteredTags = tags.filter(tag => tag.title.includes(filter));

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
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            id="input-example-1"
            placeholder="filter"
            onChange={event => setTagFilter(event.target.value)}
          />
        </div>
        <li>
          <SidebarButton
            onClick={getAllBookmarks}
            isActive={filters.tagFilter === "default" ? true : false}
          >
            All
          </SidebarButton>
        </li>
        {filteredTags.map(item => (
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
