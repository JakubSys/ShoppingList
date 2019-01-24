import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import Archived from './pages/Archived'
import Components from './pages/Components'


const RootStack = createStackNavigator(
{
  WelcomePage,
  MainPage,
  Components,
  Archived
},
{
  initialRouteName: 'WelcomePage'
},
{
  defaultNavigationOptions:{
    header:'none'
  }
}
);

const App = createAppContainer(RootStack);
export default App;

