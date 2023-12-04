import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text,StyleSheet,Button } from 'react-native';
import {useState,useEffect} from 'react';
import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {name as appName} from './app.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import ResultScreen from "./screens/ResultScreen";
import WelcomeScreen from "./screens/WelcomeScreen"
import DrawerContent from './DrawerContent';
import tests from './data/testData';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  
  const [showWelcome, setShowWelcome] = useState(false);
  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem('@app_welcome_status', 'accepted');
      navigation.navigate('xd');
    } catch (error) {
      console.error('Error setting welcome status:', error);
    }
  };

  useEffect(() => {
    const checkWelcome = async () => {
      try {
        const hasShownWelcome = await AsyncStorage.getItem('hasShownWelcome');
        if (hasShownWelcome === null) {
          setShowWelcome(true);
        }
      } catch (error) {
        console.error('Error fetching welcome status:', error);
      }
    };    
    checkWelcome();
  }, []);

  // if(showWelcome) {
  //   return(
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen name="Welcome" component={WelcomeScreen} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

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


AppRegistry.registerComponent(appName, () => App);
