import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
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
import fetchTests from './api/fetchTests';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import { saveTestsDaily, getAllTests } from './DataBase';

const checkInternetConnection = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
}

const Drawer = createDrawerNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    SplashScreen.hide();
    checkFirstLaunch();
    fetchTestsData();
    setRandomTestId();
    // saveTestsDaily();
    }, []);
    useEffect(() => {
      console.log(selectedTestId);
    }, [selectedTestId]);
  
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
  const setRandomTestId = async () => {
    const isConnected = await checkInternetConnection();
    let tests;
    if(isConnected){
      tests = await fetchTests();
    }
    else {
      tests = await getAllTests();
    }
    if (tests.length > 0) {
      const randomIndex = Math.floor(Math.random() * tests.length);
      const randomTest = tests[randomIndex];
      console.log('test:', randomTest);
      setSelectedTestId([...selectedTestId, randomTest]);
    }
  };
  
  const fetchTestsData = async () => {
    try {
      const isConnected = await checkInternetConnection();
      let testsData;
      if (isConnected) {
        testsData = await fetchTests();
      } else {
        testsData = await getAllTests(); 
      }
      const shuffledTests = _.shuffle(testsData);
      setTests(shuffledTests);
    } catch (error) {
      console.error('Błąd podczas pobierania testów:', error);
    }
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
        {selectedTestId.map((randomId) => (
            <Drawer.Screen
            key={randomId.id}
            name='Random Test'
            component={TestScreen}
            initialParams={{testID: randomId.id}}
            />
        ))}
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
