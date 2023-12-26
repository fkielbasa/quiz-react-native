import React, {useState,useEffect} from 'react';
import { View, Button, Text,ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import fetchTests from '../api/fetchTests';
import _ from "lodash";


const HomeScreen = ({ navigation }) => {
  const [tests, setTests] = useState([]);


  useEffect(() => {
    fetchAndShuffleTests();
    console.log(tests.id)
  }, []);
  const fetchAndShuffleTests = async () => {
    try {
      const testsData = await fetchTests(); // Pobranie testów
      const shuffledTests = _.shuffle(testsData); // Przetasowanie testów

      setTests(shuffledTests); // Ustawienie przetasowanych testów w stanie
    } catch (error) {
      console.error('Błąd podczas pobierania i tasowania testów:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {tests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={styles.item}
            onPress={() => {
              navigation.navigate(`Test_${test.id}`, {
                testID: test.id,
                testTag: test.tags[0]
              });
            }}
          >
            <Text style={styles.title}>{test.name}</Text>
            <Text style={styles.tag}>
              {test.tags.map((tag) => `#${tag}`).join(' ')}
            </Text>
            <Text style={styles.content}>{test.description}</Text>
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
    color: 'blue',
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
    fontFamily: 'NovaSquare-Regular',
    color: 'black',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});
export default HomeScreen;