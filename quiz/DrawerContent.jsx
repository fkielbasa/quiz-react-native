import { View, Button, Text,ScrollView, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DrawerContent = (props) => {
  const handleDownloadTests = () => {
    alert('Testy zostały pobrane.');
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.appTitle}>QUIZ APP</Text>
        <Image
          style={styles.appLogo}
          source={require('./images/quiz.png')}
        />
        <Button title="Pobierz testy" onPress={handleDownloadTests}/>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    appTitle: {
      fontFamily: 'Pacifico-Regular',
      fontSize: 24,
      color: 'blue',
      // fontWeight: 'bold',
      marginBottom: 10,
    },
    appLogo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
  });

export default DrawerContent;