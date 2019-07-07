import React, { useState } from "react";
import { connect } from "react-redux";
import { createTag } from "../../actions/tags";
import { StyledForm } from "./styles";

interface IProps {
  createTag: () => void;
  auth: any;
}

const NewTagForm = ({ auth, createTag }: IProps) => {
  const [title, setTitle] = useState("");

  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!title) {
      return;
    }
    const uid = auth.uid;
    createTag({ title, userId: uid });
    setTitle("");
  };

  return (
    <StyledForm onSubmit={handleSubmit} className="newtag-form">
      <h3>Add new tag</h3>
      <div className="input-group">
        <input
          placeholder="add new Tag...."
          type="text"
          className="form-input"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary input-group-btn">
          Save
        </button>
      </div>
    </StyledForm>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { createTag }
)(NewTagForm);
