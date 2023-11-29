import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import ResultScreen from "./screens/ResultScreen";
import {  DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import DrawerNavigator from './DrawerNavigator';
import DrawerContent from './DrawerContent';
import tests from './data/testData';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Home"
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//       >
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Results" component={ResultScreen} />
//         <Drawer.Screen name="Test" component={TestScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Results" component={ResultScreen} />
//         {/* <Drawer.Screen name="Test" component={TestScreen} /> */}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
  drawerContent={(props) => <DrawerContent {...props} />}
  screenOptions={{ drawerStyle: { width: '60%' } }}
>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Results" component={ResultScreen} />
        {tests.map((test) => (
          <Drawer.Screen
            key={test.id}
            name={`Test_${test.id}`}
            options={{ title: test.title }}
            component={TestScreen}
            initialParams={{ testId: test.id }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

AppRegistry.registerComponent(appName, () => App);
