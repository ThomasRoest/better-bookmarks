import React from "react";
import styled from "styled-components";

const StyledDebugComponent = styled.pre`
  code {
    background-color: none;
  }
`;

const DebugComponent = data => (
  <StyledDebugComponent>
    <code>{JSON.stringify(data, null, 2)}</code>
  </StyledDebugComponent>
);

export default DebugComponent;
