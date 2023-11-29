import * as Progress from 'react-native-progress';
import React, { useLayoutEffect,useState,useEffect } from 'react';
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';

const TestScreen = ({ navigation }) => {
  const route = useRoute();
  const { testTitle } = route.params || {};

  useLayoutEffect(() => {
    if (testTitle) {
      navigation.setOptions({
        title: testTitle
      });
    }
  }, [navigation, testTitle]);
  

  const [time, setTime] = useState(15); 
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
        setProgress((prevProgress) => prevProgress - 1 / 15);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <View style={styles.header}>
        <Text style={styles.question}>Question 1 of 10</Text>
      </View>
      <View style={styles.timer}>
        <Text>Czas: {time}s</Text>
      </View>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress}
          color="#FFD700"
          height={12}
          width={330}
          backgroundColor="#505148"
        />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>This is some example of a long question to fill the content?</Text>
        <View style={styles.answerContainer}>
          <View style={styles.answerRow}>
            <TouchableOpacity style={styles.answerButton}>
              <Text style={styles.answerButtonText}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerButton}>
              <Text style={styles.answerButtonText}>B</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.answerRow}>
            <TouchableOpacity style={styles.answerButton}>
              <Text style={styles.answerButtonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerButton}>
              <Text style={styles.answerButtonText}>D</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row:{
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    flex: 0,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    flex: 0,
  },
  progressBar: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  answerContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  answerButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
  },
  answerButtonText: {
    textAlign: 'center',
  },
});


export default TestScreen;
