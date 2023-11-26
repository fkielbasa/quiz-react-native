import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import ResultScreen from "./screens/ResultScreen";



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Results" component={ResultScreen} />
        <Drawer.Screen name="Test" component={TestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


AppRegistry.registerComponent(appName, () => App);
