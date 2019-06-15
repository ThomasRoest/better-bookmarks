import styled, { css } from "styled-components";

export const StyledSidebar = styled.aside`
  background-color: #fafafa;
  flex: 1 1 15%;
  padding: 1rem;
  min-height: 100vh;
  ul {
    list-style-type: none;
    padding: 0;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;

export const StyledActions = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0 0 20px 0;
`;

export const StyledTagsList = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0;
  button {
    margin-bottom: 2px;
  }
`;

export const SidebarButton = styled.button`
  background-color: #fafafa;
  width: 100%;
  border-radius: 3px;
  border: 0px;
  padding: 0.1rem 0.1rem 0.1rem 0.4rem;
  color: #5755d9;
  font-size: 0.7rem;
  text-align: left;
  transition: 0.2s all;
  &:hover {
    background-color: #1665d8;
    color: white;
    cursor: pointer;
  }
  &:active {
    background-color: hsla(191, 76%, 42%, 1);
    border-color: hsla(191, 76%, 32%, 1);
    box-shadow: inset 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
    transform: translate(1px, 1px);
  }
  ${props =>
    props.isActive &&
    css`
      background: #5755d9;
      color: white;
    `};
`;

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
    fill: #585ad6;
  }
  a {
    color: #585ad6;
  }
`;
