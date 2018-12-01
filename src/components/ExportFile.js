//@flow

import React from "react";
import FileSaver from "file-saver";
import format from "date-fns/format";
import { connect } from "react-redux";

type Props = {
  bookmarks: Array<Object>
};

class ExportFile extends React.Component<Props> {
  exportData = () => {
    const { bookmarks } = this.props;
    const blob = new Blob([JSON.stringify(bookmarks)], {
      type: "application/json;charset=utf-8"
    });
    FileSaver.saveAs(
      blob,
      `better-bookmarks-export_${format(new Date(), "YYYY-MM-DD")}.json`
    );
  };
  render() {
    return (
      <button className="btn btn-default btn-sm" onClick={this.exportData}>
        Export to JSON
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks
  };
};

export default connect(mapStateToProps)(ExportFile);
