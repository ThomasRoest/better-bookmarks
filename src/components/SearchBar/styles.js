import styled from "styled-components";

export const StyledSearch = styled.div`
  padding: 1rem;
  .ais-Hits-list {
    min-width: 500px;
    max-width: 700px;
    border: 0px;
    position: absolute;
    display: block;
    margin: 0px 0px 0px 0px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    @media (max-width: 450px) {
      left: 0;
      right: 0;
    }
  }
  .ais-Hits-item {
    border: 0px;
    margin: 0;
    width: initial;
    padding: 0.5rem;
    background-color: white;
    box-shadow: none;
  }
  [class^="ais-"] {
    font-size: 0.7rem;
  }
  .ais-Highlight-highlighted,
  .ais-Snippet-highlighted {
    background-color: #ddddf7;
  }
  .ais-SearchBox-submitIcon {
    display: none;
  }
  .ais-SearchBox-input {
    border-radius: 0px;
  }
`;
