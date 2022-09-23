# CRUD & BEAR APP

## Features

-   Login with form validation + check if user exists. Error message popup if user doesn't exist. To log in, enter "achji.remi@gmail.com" as email address.
-   Persisted Logged User Info in Redux store. Also, refreshing the page won't logout (persisted with redux-persist)
-   Restricted Routes: can't access /users if not logged in, can't access /login is already logged in.
-   List existing users with pagination
-   Add new user (with form validation)
-   Edit existing user (with form validation)
-   Delete single or multiple users
-   Warning modal when deleting user(s)
-   Access single user info
-   Access single user info via path /users/:userId (e.g. /users/1 to access my profile info).
    Note: accessing user info via URL will regenerate users via Faker as the fake database is not persisted. Only my profile (id: 1) is hard-coded in fakeDatabase.js for login purposes.
-   Search for user. Will only work on the current users page. Improvement: add a searchUser endpoint to search through all pages.
-   Logout will redirect to login page and erase persisted data.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
