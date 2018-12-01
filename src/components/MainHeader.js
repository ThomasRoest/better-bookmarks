//@flow

import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/auth";
import { setSearchTerm } from "../actions/filters";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  /* background-color: #333; */
`;

const HeaderTop = styled.div`
  background-color: #5755d9;
  color: white;
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  span.title {
    flex: 0 0 15%;
    text-align: left;
    padding-left: 10px;
    a {
      color: white;
      font-weight: bold;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  input {
    padding: 0.4rem;
    flex: 1 0 70%;
    border: 0px;
    color: white;
    outline: none;
    background-color: rgba(255, 255, 255, 0.8);
    transition: background-color 100ms ease-in;
    &:focus {
      background-color: #fff;
      color: #333
      transition: background-color 100ms ease-in;
    }
  }
  span.userinfo {
    text-align: center;
    flex: 0 0 10%;
    .btn-link { 
      color: lightblue; 
      &:hover { color: blueviolet;}
      }
  }
`;

const HeaderNav = styled.nav`
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

type Props = {
  auth: Object,
  signIn: Function,
  signOut: Function,
  searchTerm: string,
  handleSearchTermChange: Function
};

const MainHeader = ({
  auth,
  signIn,
  signOut,
  searchTerm,
  match,
  handleSearchTermChange
}: Props) => {
  return (
    <StyledHeader>
      <HeaderTop>
        <span className="title">
          <Link to="/">Better Bookmarks</Link>
        </span>
        <input
          type="search"
          placeholder="Search...   Use '#' to filter by tag. e.g. !css"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <span className="userinfo">
          <button className="btn btn-sm btn-link" onClick={signOut}>
            signout
          </button>
        </span>
      </HeaderTop>
      <HeaderNav>
        <Link to="/">Bookmarks</Link>
        <Link to="/bookmarks/new">New bookmark</Link>
        <Link to="/tags">tags</Link>
      </HeaderNav>
    </StyledHeader>
  );
};

const mapStateToProps = ({ auth, searchTerm }) => {
  return {
    auth: auth,
    searchTerm: searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn() {
      dispatch(signIn());
    },
    signOut() {
      dispatch(signOut());
    },
    handleSearchTermChange(event) {
      dispatch(setSearchTerm(event.target.value));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHeader);
