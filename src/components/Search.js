import React from "react";
import styled from "styled-components";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  connectStateResults
} from "react-instantsearch-dom";

const StyledSearch = styled.div`
  padding: 1rem;
  .ais-Hits-list {
    /* width: 100%; */
    border: 0px;
    position: absolute;
    display: block;
    margin: 0px 0px 0px 0px;
    box-shadow: 5px 5px 10px grey;
    width: 80%;
    z-index: 1;
  }
  .ais-Hits-item {
    border: 0px;
    margin: 0;
    width: initial;
    padding: 0.5rem;
    background-color: white;
    box-shadow: none;
  }
  [class^="ais-"] {
    font-size: 0.7rem;
  }
  .ais-Highlight-highlighted,
  .ais-Snippet-highlighted {
    background-color: #ddddf7;
  }
  .ais-SearchBox-submitIcon {
    display: none;
  }
  .ais-SearchBox-input {
    border-radius: 0px;
  }
`;

const Bookmark = ({ hit }) => {
  return (
    <a href={hit.url}>
      <Highlight attribute="title" hit={hit} />
    </a>
  );
};

const Content = connectStateResults(({ searchState, searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;

  return (
    <React.Fragment>
      {searchState.query && (
        <div hidden={!hasResults}>
          <Hits hitComponent={Bookmark} />
          {/* <div hidden={hasResults}>
            <div>No results has been found for {searchState.query}</div>
          </div> */}
        </div>
      )}
    </React.Fragment>
  );
});

const Search = () => (
  <StyledSearch>
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_APP_ID}
      apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
      indexName="bookmarks"
    >
      <SearchBox />
      <Content />
    </InstantSearch>
  </StyledSearch>
);

export default Search;
