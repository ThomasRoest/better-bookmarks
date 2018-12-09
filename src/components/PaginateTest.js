// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { paginateBookmarks } from "../actions/bookmarks";

// class PaginateTest extends Component {
//   componentDidMount() {
//     this.props.paginateBookmarks(this.props.auth.uid);
//   }
//   render() {
//     return (
//       <div>
//         <pre>
//           <code>{JSON.stringify(this.props.bookmarks, null, 2)}</code>
//         </pre>
//         well then
//         <button>Load more bookmarks</button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     bookmarks: state.bookmarks,
//     auth: state.auth
//   };
// };

// export default connect(
//   mapStateToProps,
//   { paginateBookmarks }
// )(PaginateTest);
