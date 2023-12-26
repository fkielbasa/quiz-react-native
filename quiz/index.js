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
import fetchTests from './api/fetchTests';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'quiz.db',
    location: 'default',
  },
  () => {
    console.log('Connected to database');
  },
  (error) => {
    console.error('Error opening database:', error);
  }
);
// const connectToDatabase = () => {
//   const db = openDatabase({ name: 'quiz.db',location:'default' });
//   console.log("xed")
//   return db;
// };
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS tests (id INTEGER PRIMARY KEY, data TEXT NOT NULL)',
    [],
    (tx, results) => {
      console.log('Tabela "tests" została utworzona.');
    },
    (error) => {
      console.error('Błąd podczas tworzenia tabeli "tests":', error);
    }
  );
});

const getAllTests = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tests', [], (tx, results) => {
        const len = results.rows.length;
        const tests = [];
        for (let i = 0; i < len; i++) {
          tests.push(results.rows.item(i));
        }
        resolve(tests);
      });
    },
    (error) => {
      reject(error);
    });
  });
};
const Drawer = createDrawerNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [tests, setTests] = useState([]);
  const [randomTestId, setRandomTestId] = useState(null);
 
  useEffect(() => {
    SplashScreen.hide();
    checkFirstLaunch();
    fetchAndShuffleTests();
    // fetchAndSaveTests();
    }, []);
  useEffect(() => {
    if (tests.length > 0) {
      const randomIndex = Math.floor(Math.random() * tests.length);
      const selectedTestId = tests[randomIndex].id;
      setRandomTestId(selectedTestId);
    }
  }, [tests]);
  
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
  // const fetchAndShuffleTests = async () => {
  //   try {
  //     const testsData = await fetchTests(); 
  //     const shuffledTests = _.shuffle(testsData); 
  //     setTests(shuffledTests);
  //   } catch (error) {
  //     console.error('Błąd podczas pobierania i tasowania testów:', error);
  //   }
  // };
  const fetchAndShuffleTests = async () => {
    try {
      const testsData = await fetchTests(); 
      const shuffledTests = _.shuffle(testsData); 
      setTests(shuffledTests);
      const allTests = await getAllTests(); // Pobierz wszystkie rekordy z tabeli tests
      console.log('Wszystkie rekordy z tabeli tests:', allTests);
    } catch (error) {
      console.error('Błąd podczas pobierania i tasowania testów:', error);
    }
  };
  const fetchAndSaveTests = async () => {
  try {
    const testsData = await fetchTests();
    const testsDataString = JSON.stringify(testsData);

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tests (data) VALUES (?)',
        [testsDataString],
        (tx, results) => {
          console.log('Dane testów zostały pomyślnie dodane do tabeli tests.');
        },
        (error) => {
          console.error('Błąd podczas dodawania danych testów:', error);
        }
      );
    });
  } catch (error) {
    console.error('Błąd podczas pobierania danych testów:', error);
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
        <Drawer.Screen
          name="Random Test"
          component={TestScreen}
          initialParams={{
            testID: randomTestId
          }}
        />
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
