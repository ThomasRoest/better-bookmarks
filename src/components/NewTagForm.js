import React, { Component } from "react";
import { connect } from "react-redux";
import { createTag } from "../actions/tags";

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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">title</label>
        <div className="form-group">
          <input
            placeholder="add new Tag...."
            type="text"
            className="form-input"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="submit" className="btn" />
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
