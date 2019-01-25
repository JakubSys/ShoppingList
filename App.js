import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './pages/WelcomePage';
import Active from './pages/Active';
import Archived from './pages/Archived'
import Components from './pages/Components'


const RootStack = createStackNavigator(
{
  WelcomePage,
  Active,
  Components,
  Archived
},
{
  initialRouteName: 'Components'
},
{
  defaultNavigationOptions:{
    header:'none'
  }
}
);

const App = createAppContainer(RootStack);
export default App;

