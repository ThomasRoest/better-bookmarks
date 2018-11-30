## Better Bookmarks

A self-hosted, browser independent bookmark manager made with React, Redux, Firebase (Cloud Firestore/ authentication) and Netlify Functions.

<img src="https://s3-eu-west-1.amazonaws.com/github-images123/Screen+Recording+2018-10-23+at+02.43+PM.gif" />

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

8. That's it for the Firebase setup. You can now run `yarn start` to run the application locally.

## Netlify Functions & Deploying

Run `yarn build` to create a production build for this project.

This projects uses netlify functions, see [src/lambda/get-title.js](https://github.com/ThomasRoest/better-bookmarks/blob/master/src/lambda/get-title.js) to get page titles from url's.

It's not required, but to use this functionality, the only thing you have to do is to deploy your project with Netlify. Netlify will then create the build from src/lambda, as configured in `netlify.toml`. The package netlify-lambda allows you to run the function locally with: `yarn start:lambda`.

This project uses the netlify-lambda package to run lambda in development with `yarn start:lambda`

Make sure you update the authorized domains for authentication in the firebase console (authentication tab)

## Screenshots

![HOME](/public/screenshot_home.png)

> bookmarks
