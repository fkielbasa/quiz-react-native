import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text,StyleSheet,Button } from 'react-native';
import {useState,useEffect} from 'react';
import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {name as appName} from './app.json';
import { createDrawerNavigator } from '@react-navigation/drawer';
import "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import ResultScreen from "./screens/ResultScreen";
import WelcomeScreen from "./screens/WelcomeScreen"
import DrawerContent from './DrawerContent';
import tests from './data/testData';
import fetchTests from './api/fetchTests';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [tests, setTests] = useState([]);


  useEffect(() => {
    SplashScreen.hide();
    checkFirstLaunch();
    fetchTestsData();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      console.log('Wartość klucza isFirstTime:', isFirstTime);
      if (isFirstTime === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Błąd AsyncStorage:', error);
    }
  };

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem('isFirstTime', 'false');
      setIsFirstLaunch(false); 
    } catch (error) {
      console.error('Błąd AsyncStorage:', error);
    }
  };
  const fetchTestsData = async () => {
    const testsData = await fetchTests();
    setTests(testsData);
    console.log(tests.id)
  };

  if (isFirstLaunch === null) {
    return null; 
  }

  return isFirstLaunch ? (
    <WelcomeScreen handleAccept={handleAccept} />
  ) : (
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
            options={{ title: test.name }} 
            component={TestScreen}
            initialParams={{ testID: test.id,totalQuestions: test.numberOfTasks}}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
