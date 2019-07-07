import styled from "styled-components";

export const Tag = styled.span`
  margin-left: 10px;
`;

export const StyledListItem = styled.li`
  background-color: white;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.6rem;
  border-bottom: 1px solid lightgray;

  a {
    color: #5755d9;
    &:visited {
      color: #5755d9;
    }
  }

  .icon-more-vert {
    padding: 1em;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: lightgrey;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  }

  @media (min-width: 600px) {
    padding: 0.4rem 1rem;
  }
`;

export const BookmarkInfo = styled.div`
  overflow: hidden;
  .label {
    font-size: 0.8em;
    margin-right: 5px;
  }
`;

export const Actions = styled.div`
  background: white;
  padding-left: 5px;
  flex: 1 1 auto;
  display: flex;
  justify-content: space-around;
`;
