# Tasks: Your to-do app ☑️

A simple tasks/to-do app with categories. Develop with TypeScript, React Native, Expo, NativewindCSS, Zustand and Axios.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- User authentication with context
- State management with zustand
- Task management with categories
- NativewindCSS for stylization
- Axios for API requests

## Prerequisites

- Node.js
- npm
- eas
- Expo GO app

## Running with npm

1. Download and install [node.js](https://nodejs.org/en).

2. ### Set the .env variables
    - EXPO_PUBLIC_API_URL (API URL)

3. Open your terminal/cmd on the repo directory

4. Install dependencies

```bash
> npm install
```

5. Start the app

```bash
> npm start
```

## How to build

1. Install the latest eas cli as global

   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account

   ```bash
   eas login
   ```

3. Run a preview build

   ```bash
   eas build --profile preview
   ```

[WEB APP repo](https://github.com/ribborges/tasks-web)
[API repo](https://github.com/ribborges/tasks-api)