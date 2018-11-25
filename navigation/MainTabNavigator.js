import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DeliverScreen from '../screens/DeliverScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-basket${focused ? '' : '-outline'}`
          : 'md-basket'
      }
    />
  ),
};

const DeliverStack = createStackNavigator({
  Links: DeliverScreen,
});

DeliverStack.navigationOptions = {
  tabBarLabel: 'Deliver',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-walk${focused ? '' : '-outline'}` : 'md-walk'}
    />
  ),
};

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  HomeStack,
  DeliverStack,
});


// CHANGE THIS TO https://snack.expo.io/@react-navigation/auth-flow-v3 STYLE AUTH FLOW
// SIMPLIFY EACH PAGE - BUILD WIDE TO NARROW
