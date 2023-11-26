// TestScreen.js

import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Otrzymany tytuł testu:</Text>
      <Text>{testTitle}</Text>
    </View>
  );
};

export default TestScreen;
