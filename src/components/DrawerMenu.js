//@flow

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { queryByTag } from "../actions/bookmarks";
import { setFilter } from "../actions/filters";
import { toggleDrawerMenu } from "../actions/menuState";

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
`;

const StyledMenu = styled.div`
  background-color: white;
  height: 100%;
  width: 230px;
  overflow: scroll;
`;

const CloseButton = styled.div`
  display: inline-block;
  float: right;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 3px 0;
  text-decoration: none;
  background: white;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const FilterButton = styled.button`
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
  }
`;

type Props = {
  queryByTag: Function,
  setFilter: Function,
  auth: Object,
  toggleDrawerMenu: Function,
  tags: Array<Object>
};

class DrawerMenu extends Component<Props> {
  handleTagQuery = (query: string) => {
    this.props.queryByTag(this.props.auth.uid, query);
    this.props.setFilter(query);
    this.props.toggleDrawerMenu();
  };

  render() {
    return (
      <Backdrop>
        <StyledMenu>
          <CloseButton onClick={this.props.toggleDrawerMenu}>X</CloseButton>
          {this.props.tags.map(item => (
            <FilterButton
              key={item.id}
              onClick={e => this.handleTagQuery(item.title)}
            >
              {item.title}
            </FilterButton>
          ))}
        </StyledMenu>
      </Backdrop>
    );
  }
}

const mapStateToProps = ({ auth, tags }) => {
  return { auth, tags };
};

export default connect(
  mapStateToProps,
  { setFilter, queryByTag, toggleDrawerMenu }
)(DrawerMenu);
