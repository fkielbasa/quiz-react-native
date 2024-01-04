import * as Progress from 'react-native-progress';
import React, { useLayoutEffect,useState,useEffect } from 'react';
import { View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import fetchTestDetails from '../api/fetchTestDetails';
import _ from 'lodash';
import { getTestDetailsById,saveTestDetailsToDatabase,displayRecords } from '../DataBase';
import NetInfo from '@react-native-community/netinfo';

const checkInternetConnection = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
}


const TestCompleted = ({ score, totalQuestions, testTag }) => {
  useEffect(() => {
    const sendData = async () => {
      try {
        console.log(testTag)
        const result = await fetch('https://tgryl.pl/quiz/result', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nick: 'Player',
            score: score,
            total: totalQuestions,
            type: testTag,
          }),
        });

        if (result.ok) {
          console.log('Wyniki quizu zostały pomyślnie wysłane!');
        } else {
          console.error('Wystąpił błąd podczas wysyłania wyników.');
        }
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }
    };

    sendData();
  }, [score, totalQuestions]);
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>You've completed the test!</Text>
      <Text style={styles.resultText}>Total Questions: {totalQuestions}</Text>
      <Text style={styles.resultText}>Your Score: {score}</Text>
    </View>
  );
};

const TestScreen = ({ navigation, route }) => {
  const { testTitle, testID, numberOfQuestions,testTag } = route.params || {};
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testDetails, setTestDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [time, setTime] = useState(0);
  const [progress, setProgress] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  

  useEffect(() => {
    fetchTest();
    console.log(testID)
    // displayRecords();
  }, []);
  // useEffect(() => {
  //   if (testDetails !== null) {
  //     saveTestDetailsToDatabase(testID, testDetails);
  //   }
  // }, [testDetails, testID]);

  const fetchTest = async () => {
    // const details = await fetchTestDetails(testID);
    // const shuffledTasks = _.shuffle(details.tasks.map((task) => {
    //   const shuffledAnswers = _.shuffle(task.answers);
    //   return { ...task, answers: shuffledAnswers };
    // }));
    try {
      const isConnected = await checkInternetConnection();
      let details;
      if (isConnected) {
        details = await fetchTestDetails(testID);
        console.log("jest")
      } else {
        details = await getTestDetailsById(testID); 
        console.log("nie ma")
      }
      const shuffledTasks = _.shuffle(details.tasks.map((task) => {
        const shuffledAnswers = _.shuffle(task.answers);
        return { ...task, answers: shuffledAnswers };
      }));
      details.tasks = shuffledTasks;
      setTestDetails(details);
      setTotalQuestions(details.tasks.length);
      setCurrentQuestion(details.tasks[0]);
      setTime(details.tasks[0].duration);
    } catch (error) {
      console.error('Błąd podczas pobierania testów:', error);
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

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    moveToNextQuestion();
    console.log(score)
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestion(testDetails.tasks[currentQuestionIndex + 1]);
      setTime(testDetails.tasks[currentQuestionIndex + 1].duration);
      setProgress(1);
    } else {
      setTestCompleted(true);
    }
  };

  return (
    <View style={styles.container}>
      {testCompleted ? (
        <TestCompleted score={score} totalQuestions={totalQuestions} testTag={testTag}/>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.header}>
              <Text style={styles.question}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Text>
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
            <Text style={styles.questionText}>{currentQuestion?.question}</Text>
            <View style={styles.answerContainer}>
              <View style={styles.answerRow}>
                {currentQuestion?.answers.map((answer, index) => (
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
});


export default TestScreen;
