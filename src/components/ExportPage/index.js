//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllBookmarks } from "../../actions/bookmarks";
import ExportFile from "../ExportPage";
import LoadingSpinner from "../LoadingSpinner";

type Props = {
  bookmarks: Array<Object>,
  isLoading: boolean,
  fetchAllBookmarks: Function,
  auth: Object
};

class ExportPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchAllBookmarks(this.props.auth.uid);
  }

  render() {
    return (
      <div>
        <ul>
          <ExportFile />
          {this.props.isLoading && <LoadingSpinner />}
          {this.props.bookmarks.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, bookmarks, isLoading }) => {
  return { auth, bookmarks, isLoading };
};

export default connect(
  mapStateToProps,
  { fetchAllBookmarks }
)(ExportPage);
