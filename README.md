# Spell Swords [work in progress!]

[![Build Status](https://travis-ci.org/awwong1/react-redux-firebase-boilerplate.svg?branch=master)](https://travis-ci.org/awwong1/react-redux-firebase-boilerplate)

### Introduction
Spell Swords is a spelling game prototype that uses a bunch of awesome new front-end technologies including React, a webpack build system, and hot reloading. The game itself is a loose hybrid between Word Streak and Puzzle Quest.

## STACK
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [firebase](https://www.npmjs.com/package/firebase)
* [react-router](https://github.com/rackt/react-router)
* [redux-promise](https://github.com/acdlite/redux-promise)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)

## FEATURES
* Single-page
* Always live
* Multiplayer
* Game Lobby
* Chat System
* Animations

Quick Start
-----------

```shell
$ git clone https://github.com/mattwilliams85/spellswords.git
$ cd sellswords
$ npm install
$ bower install
$ npm run dev
```

Firebase settings
--------
First you need to create your firebase application to fetch settings for boilerplate. For more information how to add your web app check this [resource](https://firebase.google.com/docs/web/setup). After it copy your settings from firebase and fill config.js

```javascript
module.exports = {

    FIREBASE_CONFIG: {

      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",

    }
}
```

Commands
--------

|Script|Description|
|---|---|
|`npm run dev`| Run development server with webpack-dev-server @ `localhost:3000`|
|`npm run build`| Test, and build the application to `./dist`|
|`npm start`| Start production ready app with pm2 from `./dist` @ `localhost:8080`|
|`npm run lint`| Run ESLint on `./app`|


What it looks like

### DEMO 
[https://spellswords.herokuapp.com/](Heroku Spell Swords Demo)
