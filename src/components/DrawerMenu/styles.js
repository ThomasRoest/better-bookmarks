import styled from "styled-components";

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
`;

export const StyledMenu = styled.div`
  background-color: white;
  height: 100%;
  width: 230px;
  overflow: scroll;
`;

export const MenuHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

export const FilterButton = styled.button`
  display: inline-block;
  width: 100%;
  border: none;
  padding: 0.7rem;
  margin: 0 0 3px 0;
  text-decoration: none;
  background: white;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    color: #1665d8;
    background-color: rgba(84, 147, 245, 0.1);
  }
  &:active {
    transform: scale(0.99);
    background-color: #1665d8;
    color: white;
  }
`;
