import React, { useContext, View, ScrollView, TouchableOpacity, map,Text} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TestContext } from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const tests = useContext(TestContext);

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TestList} />
      {/* Pozostałe ekrany */}
    </Drawer.Navigator>
  );
};

const TestList = () => {
  const tests = useContext(TestContext);

  return (
    <View>
      <ScrollView>
  {tests && tests.map((test) => (
    <TouchableOpacity
      key={test.id}
      onPress={() => {
        // Nawigacja do ekranu z testem
      }}
    >
      <Text>{test.title}</Text>
      {/* Pozostała zawartość testu */}
    </TouchableOpacity>
  ))}
</ScrollView>
    </View>
  );
};

export default DrawerNavigator;