import React, { Component } from "react";
import { connect } from "react-redux";
import { createTag } from "../actions/tags";
import "../css/custom.css";

class NewTagForm extends Component {
  state = {
    title: ""
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.title) {
      return;
    }

    const { title } = this.state;
    const uid = this.props.auth.uid;
    this.props.createTag({ title: title, userId: uid });
    this.setState({ title: "", userId: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="newtag-form">
        <div className="input-group">
          <input
            placeholder="add new Tag...."
            type="text"
            className="form-input"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary input-group-btn">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { createTag }
)(NewTagForm);
