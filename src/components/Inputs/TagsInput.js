// @flow

import React, { useEffect, useState } from "react";
import tags from "../../api/tags";

export const TagsInput = ({
  name,
  placeholder,
  label,
  value,
  handleChange,
  userID
}: any) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await tags.fetchTags(userID);
      setOptions(response);
    };
    fetch();
  }, [userID]);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map(tag => (
          <option key={tag.id} value={tag.title}>
            {tag.title}
          </option>
        ))}
      </select>
    </div>
  );
};
