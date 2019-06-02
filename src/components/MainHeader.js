//@flow

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signOut } from "../actions/auth";
import { searchQuery } from "../actions/bookmarks";
import { toggleDrawerMenu } from "../actions/menuState";
import Search from "./Search";

const StyledHeader = styled.header`
  background-color: #5755d9;
`;

const HeaderTop = styled.div`
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
  toggleDrawerMenu: Function
};

type State = {
  searchTerm: string
};

class MainHeader extends Component<Props, State> {
  render() {
    return (
      <StyledHeader>
        <HeaderTop>
          <div className="title-section">
            <Link to="/">
              Better <br /> Bookmarks
            </Link>
          </div>
          <button
            className="btn btn-action btn-primary btn-lg"
            onClick={this.props.toggleDrawerMenu}
          >
            <i className="icon icon-menu" />
          </button>

          <div className="search-controls">
            <Search />
          </div>
        </HeaderTop>

        <HeaderNav>
          <Link to="/">Bookmarks</Link>
          <Link to="/bookmarks/new">New bookmark</Link>
          <Link to="/tags">tags</Link>
        </HeaderNav>
      </StyledHeader>
    );
  }
}

const mapStateToProps = ({ auth, searchTerm }) => {
  return {
    auth: auth,
    searchTerm: searchTerm
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, searchQuery, toggleDrawerMenu }
)(MainHeader);
