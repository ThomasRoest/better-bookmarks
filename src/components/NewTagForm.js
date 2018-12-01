import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createTag } from "../actions/tags";

const StyledForm = styled.form`
  padding: 1.5rem;
  box-shadow: 0px 5px 5px lightgrey;
  margin: 0 auto 0 auto;
  .form-input,
  select {
    border-radius: 0px;
    padding-left: 0px;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    border-bottom: 1px solid blue;
    margin-bottom: 20px;
  }
  @media (min-width: 579px) {
    margin-top: 10px;
  }
`;

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
      <StyledForm onSubmit={this.handleSubmit} className="newtag-form">
        <h3>Add new tag</h3>
        <div className="input-group">
          <input
            placeholder="add new Tag...."
            type="text"
            className="form-input"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary input-group-btn">
            Save
          </button>
        </div>
      </StyledForm>
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
