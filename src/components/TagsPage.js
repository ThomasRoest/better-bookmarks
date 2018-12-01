//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import NewTagForm from "./NewTagForm";
import { Link } from "react-router-dom";
import { fetchTags, deleteTag } from "../actions/tags";
import { setFilter } from "../actions/filters";
import styled from "styled-components";

const StyledTagList = styled.div`
  padding: 20px;
  max-width: 650px;
  margin: 0 auto;
  table {
    margin-top: 20px;
    box-shadow: 0px 5px 5px lightgrey;
    /* border: 1px solid magenta; */
  }
  @media (max-width: 450px) {
    padding: 0px;
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
        <NewTagForm />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="table-header">all tags</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.tags.map(tag => (
              <tr key={tag.id}>
                <td>
                  <Link to="/" onClick={() => this.props.setFilter(tag.title)}>
                    {tag.title}
                  </Link>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() =>
                      this.props.deleteTag(tag.id, this.props.auth.uid)
                    }
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
