import React from "react";
import { connect } from "react-redux";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  connectStateResults,
} from "react-instantsearch-dom";
import { StyledSearch } from "./styles";
import { algoliaSearchClient } from "../../algolia";

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
      indexName={`bookmarks-${uid}`}
      searchClient={algoliaSearchClient}
    >
      <SearchBox />
      <Content />
    </InstantSearch>
  </StyledSearch>
);

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.uid,
  };
};

export default connect(mapStateToProps)(Search);
