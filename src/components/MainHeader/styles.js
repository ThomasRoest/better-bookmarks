import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: #5755d9;
`;

export const HeaderTop = styled.div`
  background-color: #5755d9;
  display: flex;
  padding: 10px;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  .title-section {
    flex: 0 1 15%;
    a {
      color: white;
      font-weight: 700;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  .search-controls {
    flex: 1 1 auto;
    .flex-container {
      display: flex;
    }
    input[type="search"] {
      flex: 1;
      border: 0px;
      outline: none;
      padding: 0.3rem;
    }
    input[type="submit"] {
      background-color: white;
      border: 1px solid white;
      border-left: 1px solid purple;
      box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
      color: #5755d9;
      font-size: 0.7rem;
    }
  }
  .userinfo {
    text-align: center;
    flex: 0 1 10%;
    .btn.btn-link {
      color: #fff;
      &:hover {
        color: lightblue;
      }
    }
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #5755d9;
  padding: 5px;
  align-items: center;
  a {
    font-weight: 500;
    color: white !important;
    &:active,
    &:visited,
    &:hover {
      text-decoration: none;
    }
  }

  @media (min-width: 576px) {
    display: none;
  }
`;
