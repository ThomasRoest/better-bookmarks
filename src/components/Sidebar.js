//@flow

import React from "react";
import styled from "styled-components";
import ExportFile from "./ExportFile";
import { connect } from "react-redux";
import { fetchTags } from "../actions/tags";
import { setFilter } from "../actions/filters";
import { Link } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: #f8f9fa;
  flex: 1 1 15%;
  ul {
    list-style-type: none;
    padding: 0;
    li {
      margin-top: 15px;
    }
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

// refactor --> use styled component with props
const Button = ({ title, setFilter, currentFilter }) => {
  let buttonClass;
  if (title === currentFilter) {
    buttonClass = "btn btn-sm btn-primary";
  } else {
    buttonClass = "btn btn-sm";
  }

  return (
    <button className={buttonClass} onClick={() => setFilter(title)}>
      {title}
    </button>
  );
};

type Props = {
  auth: Object,
  fetchTags: Function,
  setFilter: Function,
  tags: Array<Object>,
  filters: Object // add filtertype
};

class Sidebar extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTags(this.props.auth.uid);
  }

  render() {
    return (
      <StyledSidebar>
        <ul>
          <li>
            <Link className="btn btn-primary btn-sm" to="/bookmarks/new">
              New bookmark
            </Link>
          </li>
          <li>
            <Link to="/">All Bookmarks</Link>
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
            <button
              type="button"
              className={
                this.props.filters.tagFilter === "default"
                  ? "btn btn-sm btn-primary"
                  : "btn btn-sm"
              }
              onClick={() => this.props.setFilter("default")}
            >
              all
            </button>
          </li>
          {this.props.tags.map(item => (
            <Button
              key={item.id}
              title={item.title}
              setFilter={this.props.setFilter}
              currentFilter={this.props.filters.tagFilter}
            />
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
  { fetchTags, setFilter }
)(Sidebar);
