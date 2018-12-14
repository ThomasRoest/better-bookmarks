//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/auth";
import { searchQuery, fetchBookmarks } from "../actions/bookmarks";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderTop = styled.div`
  background-color: #5755d9;
  display: flex;
  padding: 10px;
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
  searchTerm: string,
  handleSearchTermChange: Function
};

type State = {
  searchTerm: string
};

class MainHeader extends Component<Props, State> {
  state = {
    searchTerm: ""
  };

  handleSearchTermChange = event => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    this.props.searchQuery(this.props.auth.uid, this.state.searchTerm);
  };

  render() {
    const { signOut, searchTerm } = this.props;
    return (
      <header>
        <HeaderTop>
          <div className="title-section">
            <Link to="/">Better Bookmarks</Link>
          </div>
          <div className="search-controls">
            <form onSubmit={this.handleSearchSubmit}>
              <div className="flex-container">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => this.handleSearchTermChange(e)}
                />
                <input type="submit" value="search" />
              </div>
            </form>
          </div>
          <div className="userinfo">
            <button className="btn btn-sm btn-link" onClick={signOut}>
              signout
            </button>
          </div>
        </HeaderTop>

        <HeaderNav>
          <Link to="/">Bookmarks</Link>
          <Link to="/bookmarks/new">New bookmark</Link>
          <Link to="/tags">tags</Link>
        </HeaderNav>
      </header>
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
  { signIn, signOut, searchQuery }
)(MainHeader);
