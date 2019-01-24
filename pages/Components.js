
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MainPage from './MainPage'
import Archived from './Archived';

const Components = createBottomTabNavigator(
  {
    MainPage: {
      screen: MainPage,
      path: '/main',
      navigationOptions: {
        tabBarLabel: 'Active',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='list'
            size={30}
            type="entypo"
            color={tintColor}
          />
        ),
      },
    },
    Archived: {
        screen: Archived,
        path: '/Archived',
        navigationOptions: {
          tabBarLabel: 'Archived',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name="wpforms"
              size={30}
              type="font-awesome"
              color={tintColor}
            />
          ),
        },
      },
  },
  {
    initialRouteName: 'MainPage',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
    },
  }
);

Components.navigationOptions ={
    header:null
}

export default createStackNavigator(
  {
    ComponentsTabs: { screen: Components },
  },
  {
    navigationOptions: {
       header: null
 },
}
);
