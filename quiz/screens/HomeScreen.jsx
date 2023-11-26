import React from 'react';
import { View, Button, Text,ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ResultScreen from './ResultScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
  const tests = [
    { id: 1, title: 'Test 1', tag: '#TAG', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi justo erat, tempor quis interdum sed...' },
    { id: 2, title: 'Test 2', tag: '#TAG', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi justo erat, tempor quis interdum sed...' },
    { id: 3, title: 'Test 3', tag: '#TAG', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi justo erat, tempor quis interdum sed...' },
    { id: 4, title: 'Test 4', tag: '#TAG', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi justo erat, tempor quis interdum sed...' },
    { id: 5, title: 'Test 5', tag: '#TAG', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi justo erat, tempor quis interdum sed...' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={styles.item}
            onPress={() => {
              navigation.navigate('Test', { testTitle: test.title });
            }}
          >
            <Text style={styles.title}>{test.title}</Text>
            <Text style={styles.tag}>{test.tag}</Text>
            <Text style={styles.content}>{test.content}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomContainer}>
        <TouchableOpacity
  style={styles.resultButton}
  onPress={() => {
    navigation.navigate('Results');
  }}
>
  <Text style={styles.buttonText}>Check your results!</Text>
</TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
  },
  tag:{
    fontSize: 12,
    paddingBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  bottomContainer: {
    width: '100%',
    marginVertical: 10,
    paddingBottom: 10,
  },
  resultButton: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000', 
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default HomeScreen;