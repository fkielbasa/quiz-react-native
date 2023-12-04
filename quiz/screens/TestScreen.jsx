import * as Progress from 'react-native-progress';
import React, { useLayoutEffect,useState,useEffect } from 'react';
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import questions from '../data/questionData';

const TestCompleted = ({ score }) => {
  return (
    <View style={styles.container}>
    <Text style={styles.resultText}>You've completed the test!</Text>
    <Text style={styles.resultText}>Total Questions: {questions.length}</Text>
    <Text style={styles.resultText}>Your Score: {score}</Text>
  </View>
  );
};

const TestScreen = ({ navigation, route }) => {
  const { testTitle } = route.params || {};
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  useLayoutEffect(() => {
    if (testTitle) {
      navigation.setOptions({
        title: testTitle
      });
    }
  }, [navigation, testTitle]);
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);
  const [time, setTime] = useState(currentQuestion.duration);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    console.log(score);
  }, [score]);
  

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    moveToNextQuestion();
  };


  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
      setTime(questions[currentQuestionIndex + 1].duration);
      setProgress(1);
    } else {
      setTestCompleted(true);
    }
  };
 

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
        setProgress((prevProgress) => prevProgress - 1 / currentQuestion.duration);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, currentQuestion]);
  return (
    <View style={styles.container}>
      {testCompleted ? (
        <TestCompleted score={score} />
      ):(
        <View style={styles.container}>
      <View style={styles.row}>
      <View style={styles.header}>
        <Text style={styles.question}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
      </View>
      <View style={styles.timer}>
        <Text>Time: {time}s</Text>
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
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <View style={styles.answerContainer}>
          <View style={styles.answerRow}>
            {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.answerButton}
              onPress={() => handleAnswerClick(answer.isCorrect)}
            >
              <Text style={styles.answerButtonText}>{answer.content}</Text>
            </TouchableOpacity>
          ))}
          </View>
        </View>
    </View>
   </View>
      )}
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
    paddingBottom: 20,
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
    paddingBottom: 30,
  },
  answerContainer: {
    flexDirection: 'column',
    width: "100%",
  },
  answerButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    width: '100%', 
    marginBottom: 10, 
    borderRadius: 5,
  },
  answerButtonText: {
    textAlign: 'center',
  },
});


export default TestScreen;
