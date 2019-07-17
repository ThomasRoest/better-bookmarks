// @flow

import React from "react";

interface ITextInput {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  handleChange: (event: any) => void;
}

export const TextInput = ({
  name,
  placeholder,
  label,
  value,
  handleChange
}: ITextInput) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      className="form-input"
      name={name}
      value={value}
      onChange={e => handleChange(e)}
      type="text"
      id={name}
      placeholder="add title.."
    />
  </div>
);
