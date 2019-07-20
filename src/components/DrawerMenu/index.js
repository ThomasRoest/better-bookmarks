//@flow

import React from "react";
import { connect } from "react-redux";
import { queryByTag } from "../../actions/bookmarks";
import { setFilter } from "../../actions/filters";
import { signOut } from "../../actions/auth";
import { toggleDrawerMenu } from "../../actions/menuState";
import { Backdrop, StyledMenu, MenuHeader, FilterButton } from "./styles";
import { IAuth, ITag } from "../../types";

interface IProps {
  queryByTag: (uid: string, query: string) => void;
  setFilter: (query: string) => void;
  auth: IAuth;
  toggleDrawerMenu: () => void;
  tags: ITag[];
  signOut: () => void;
}

const DrawerMenu = ({
  tags,
  auth,
  setFilter,
  queryByTag,
  toggleDrawerMenu
}: IProps) => {
  const handleTagQuery = (query: string) => {
    queryByTag(auth.uid, query);
    setFilter(query);
    toggleDrawerMenu();
  };

  return (
    <Backdrop>
      <StyledMenu>
        <MenuHeader>
          <button className="btn btn-sm" onClick={signOut}>
            signout
          </button>
          <div className="btn btn-action btn-sm" onClick={toggleDrawerMenu}>
            <i className="icon icon-cross" />
          </div>
        </MenuHeader>
        {tags.map(item => (
          <FilterButton key={item.id} onClick={e => handleTagQuery(item.title)}>
            {item.title}
          </FilterButton>
        ))}
      </StyledMenu>
    </Backdrop>
  );
};

const mapStateToProps = ({ auth, tags }) => {
  return { auth, tags };
};

export default connect(
  mapStateToProps,
  { setFilter, queryByTag, toggleDrawerMenu, signOut }
)(DrawerMenu);
