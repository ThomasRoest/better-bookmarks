//@flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { signIn } from "../actions/auth";
import SignIn from "./SignIn";
import Loading from "./Loading";
import NewBookmarkForm from "./NewBookmarkForm";
import EditBookmarkForm from "./EditBookmarkForm";
import MainHeader from "./MainHeader";
import TagsPage from "./TagsPage";
import BookmarksPage from "./BookmarksPage";
import Sidebar from "./Sidebar";

const FlexContainer = styled.div`
  @media (min-width: 579px) {
    display: flex;
  }
`;

const Main = styled.main`
  flex: 1 1 80%;
`;

const Application = ({ auth, signIn }) => (
  <Router>
    <React.Fragment>
      {auth.status === "ANONYMOUS" && <SignIn signIn={signIn} />}
      {auth.status === "AWAITING_AUTH_RESPONSE" && <Loading />}
      {auth.status === "SIGNED_IN" && (
        <React.Fragment>
          <MainHeader />
          <FlexContainer>
            <Sidebar />

            <Main>
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
              </Switch>
            </Main>
          </FlexContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  </Router>
);

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth
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
