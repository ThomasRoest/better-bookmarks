// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "../actions/auth";
import SignIn from "../components/SigninPage";
import Loading from "../components/Loading";
import NewBookmarkForm from "./NewBookmarkForm";
import EditBookmarkForm from "../components/EditBookmarkForm";
import MainHeader from "../components/MainHeader";
import TagsPage from "../components/TagsPage";
import BookmarksPage from "../components/BookmarksPage";
import ExportPage from "../components/ExportPage";
import Sidebar from "./Sidebar";
import DrawerMenu from "../components/DrawerMenu";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-size: 16px;
  }
`;

const FlexContainer = styled.div`
  @media (min-width: 579px) {
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
  }
`;

const Main = styled.main`
  flex: 1 1 85%;
  background-color: #fafafa;
`;

const Application = ({ auth, signIn, menuIsOpen }) => (
  <Router>
    <React.Fragment>
      {auth.status === "ANONYMOUS" && <SignIn signIn={signIn} />}
      {auth.status === "AWAITING_AUTH_RESPONSE" && <Loading />}
      {auth.status === "SIGNED_IN" && (
        <React.Fragment>
          <MainHeader />
          {menuIsOpen && <DrawerMenu />}
          <FlexContainer>
            <Sidebar />
            <Main>
              <GlobalStyle />
              <Switch>
                <Route exact path="/" component={BookmarksPage} />
                <Route
                  exact
                  path="/bookmarks/new"
                  component={NewBookmarkForm}
                />
                <Route
                  exact
                  path="/bookmarks/:id"
                  component={EditBookmarkForm}
                />
                <Route exact path="/tags" component={TagsPage} />
                <Route exact path="/export" component={ExportPage} />
              </Switch>
            </Main>
          </FlexContainer>
        </React.Fragment>
      )}
      <ToastContainer />
    </React.Fragment>
  </Router>
);

const mapStateToProps = ({ auth, menuIsOpen }) => {
  return {
    auth: auth,
    menuIsOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn() {
      dispatch(signIn());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
