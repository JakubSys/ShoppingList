import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import WelcomePage from './pages/WelcomePage';
import Active from './pages/Active';
import Archived from './pages/Archived';
import Components from './pages/Components';
import Details from './pages/Details';
import ArchivedDetails from './pages/ArchivedDetails';


const RootStack = createStackNavigator(
{
  WelcomePage,
  Active,
  Components,
  Archived,
  Details,
  ArchivedDetails
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

