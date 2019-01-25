
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Active from './Active'
import Archived from './Archived';

const Components = createBottomTabNavigator(
  {
    Active: {
      screen: Active,
      path: '/Active',
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
    initialRouteName: 'Active',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
      style:{
        backgroundColor: '#293046',
        borderTopColor: '#fff',
      }
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
