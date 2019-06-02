import styled from "styled-components";

export const Button = styled.button`
  background-color: #5755d9;
  border-radius: 3px;
  border: #5755d9;
  color: white;
  transition: 0.2s all;
  padding: 0.4rem;

  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
  &:active {
    background-color: hsla(191, 76%, 42%, 1);
    border-color: hsla(191, 76%, 32%, 1);
    box-shadow: inset 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
    transform: translate(1px, 1px);
  }
`;

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  .button-container {
    padding: 1rem;
    text-align: center;
  }
`;
