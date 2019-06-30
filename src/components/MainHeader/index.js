//@flow

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signOut } from "../../actions/auth";
import { searchQuery } from "../../actions/bookmarks";
import { toggleDrawerMenu } from "../../actions/menuState";
import Search from "../Search";
import { StyledHeader, HeaderNav, HeaderTop } from "./styles";

type Props = {
  auth: Object,
  signIn: Function,
  signOut: Function,
  toggleDrawerMenu: Function
};

const MainHeader = ({ toggleDrawerMenu }: Props) => (
  <StyledHeader>
    <HeaderTop>
      <div className="title-section">
        <Link to="/">
          Better <br /> Bookmarks
        </Link>
      </div>
      <button
        className="btn btn-action btn-primary btn-lg"
        onClick={toggleDrawerMenu}
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
