import React from "react";
import { connect } from "react-redux";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  connectStateResults
} from "react-instantsearch-dom";
import { StyledSearch } from "./styles";

const Bookmark = ({ hit }) => (
  <a href={hit.url}>
    <Highlight attribute="title" hit={hit} />
  </a>
);

const Content = connectStateResults(({ searchState, searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;

  return (
    <React.Fragment>
      {searchState.query && (
        <div hidden={!hasResults}>
          <Hits hitComponent={Bookmark} />
        </div>
      )}
    </React.Fragment>
  );
});

const Search = ({ uid }) => (
  <StyledSearch>
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
      indexName={`bookmarks-${uid}`}
    >
      <SearchBox />
      <Content />
    </InstantSearch>
  </StyledSearch>
);

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.uid
  };
};

export default connect(mapStateToProps)(Search);
