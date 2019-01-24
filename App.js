import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import ListDetails from './pages/ListDetails'


const RootStack = createStackNavigator(
{
  WelcomePage,
},
{
  initialRouteName: 'WelcomePage'
}
);

const App = createAppContainer(RootStack);
export default App;
// This might be related to https://github.com/facebook/react-native/issues/4968
// To resolve try the following:
//   1. Clear watchman watches: `watchman watch-del-all`.
//   2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
//   3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
//   4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.

