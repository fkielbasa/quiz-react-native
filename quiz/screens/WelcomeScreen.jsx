import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ handleAccept }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.regulationTitle}>Regulamin</Text>
        <Text style={styles.regulationText}>
          Użytkownik zobowiązany jest do przestrzegania zasad określonych w aplikacji.
          Niedozwolone jest używanie aplikacji w sposób naruszający prawo lub szkodzący innym użytkownikom.
        </Text>
        <Button title="Akceptuję" onPress={handleAccept} />
      </View>
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    content: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    regulationTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    regulationText: {
      fontSize: 16,
      marginBottom: 20,
    },
});

export default WelcomeScreen;
