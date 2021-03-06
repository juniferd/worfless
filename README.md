A basic [anagrams game](https://en.wikipedia.org/wiki/Anagrams_(game)) with tiles

why is it called worfless? it was a typo that i found funny

![gif of worf facepalming](https://media.giphy.com/media/10p704gIAGRN7i/giphy.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# TODOs

- [x] check against scrabble dictionary
- [x] swap tiles instead of grabbing 3 and appending
- [x] monospace font
- [x] turn tiles into buttons with `aria-pressed` attr
- [ ] be able to select tiles by clicking
- [ ] add "shuffle tiles"
- [x] add modal component
- [x] add about modal
- [ ] put score in modal
- [x] update scoring to ignore dupe words
- [ ] add button component
- [ ] add more stats in GameContext (e.g., number of games played, score histogram, most recent best word)
- [ ] add stats to localStorage
- [ ] keep pruning dictionary/find another source
- [-] styling
- [ ] whoops should use useReducer for all this context
- [ ] add tests
- [ ] fix scrolling on iOS (keyboard + focused input will scroll the letters out of view :eyeroll:)
