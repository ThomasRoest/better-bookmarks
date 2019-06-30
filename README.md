## Better Bookmarks

A self-hosted bookmark manager made with React, Redux, Firebase (Cloud Firestore/ authentication), Netlify Functions and Algolia (search).

This project uses several PWA features, including the [share target api.](https://developers.google.com/web/updates/2018/12/web-share-target) So after you've installed the app to your homescreen, you can share urls from your browser like you would with any other app (only tested on Android).

## Screenshots

<!-- ![HOME](/public/screenshot_home2.png) -->

![HOME](/public/screenshot3.png)

## Setup

1. Clone the repository

2. yarn install

3. Go to [firebase console](https://console.firebase.google.com/) and create a new project.

4. Click on the "web / add to webapp" icon to get the config keys for you project. Add them to your firebase.js config file.

> Note: these are client-side keys and are not for security, but more for project identification. Make sure you add the proper security rules to secure your data.

```js
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID
};
```

5. The next step is to create a Firestore database. You can do this by going to the database tab and create a database (Firestore)

6. When you have created the database, copy the following security rules into the rules section to secure your data.

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create: if isSignedIn() && emailVerified();
      allow update: if isSignedIn() && isOwner(userId);
    }

    match /users/{userId}/bookmarks/{bookmarkId} {
      allow write: if isSignedIn() && isOwner(userId);
      allow read: if isSignedIn() && isOwner(userId)
    }

    match /users/{userId}/tags/{tagId} {
      allow write: if isSignedIn() && isOwner(userId);
      allow read: if isSignedIn() && isOwner(userId)
    }

    function isSignedIn() {
      return request.auth != null;
    }
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    function emailVerified() {
      return request.auth.token.email_verified;
    }
  }
}
```

7. To enable authentication with Google, go to the navigation tab to add a login method --> select google option from the providers and switch the toggle to enable. If you scroll down, you can see the authorized domains for which this login method will work. This is important to update when you deploy your project.

8. You can now run `yarn start` to run the application locally.

9. The default query for fetching all bookmarks requires an index in firestore, so you might see this error in the console:

`Uncaught (in promise) Error: The query requires an index. You can create it here:`

follow the link to create the index.

## Netlify Functions & Deploying

This project uses Netlify functions for additional functionality ( search indexing, getting titles from pages). See [src/lambda/](https://github.com/ThomasRoest/better-bookmarks/blob/master/src/lambda/).

To deploy:

- deploy your project with [Netlify](https://www.netlify.com)
- Set your build environment variables
- Update the authorized domains for authentication in the firebase console (authentication tab)

## Search with Algolia

To configure search with [Algolia](https://www.algolia.com/)

- signup for a free account on [Algolia.com](https://www.algolia.com/)
- go to your dashboard and create a new app.
- Go to api keys and create a new key with the following permissions: `search, addObject, deleteObject`. This will be the key for use with lambda functions. The other keys that you will need are the app ID to identify your app, and the search only key which will be used client-side to search your index.
