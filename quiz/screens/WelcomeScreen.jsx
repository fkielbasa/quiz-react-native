import { View, Text,StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
const WelcomeScreen = ({navigation}) => {
    const [showWelcome, setShowWelcome] = useState(false);

    const handleAccept = async () => {
      try {
        await AsyncStorage.setItem('@app_welcome_status', 'accepted');
        // navigation.navigate("Home");
      } catch (error) {
        console.error('Error setting welcome status:', error);
      }
    };
  
    useEffect(() => {
      const checkWelcome = async () => {
        try {
          const hasShownWelcome = await AsyncStorage.getItem('@app_welcome_status');
          if (hasShownWelcome === null) {
            setShowWelcome(true);
          }
        } catch (error) {
          console.error('Error fetching welcome status:', error);
        }
      };
      checkWelcome();
    }, []);
  
    
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Text>Regulamin</Text>
          <Button title="Akceptuję" onPress={()=> navigation.navigate("Home")} />
        </View>
      </View>
    );
  

    
}
export default WelcomeScreen;   