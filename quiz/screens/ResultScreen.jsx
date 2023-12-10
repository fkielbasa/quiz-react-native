import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, RefreshControl, FlatList } from 'react-native';
import results from '../data/resultData';
import { useRoute } from '@react-navigation/native';


const ResultScreen = () => {
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/results?last=20');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const renderResultItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>{item.nick}</Text>
      <Text style={styles.rowText}>{item.score}</Text>
      <Text style={styles.rowText}>{item.type}</Text>
      <Text style={styles.rowText}>{item.createdOn}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Nick</Text>
        <Text style={styles.headerText}>Score</Text>
        <Text style={styles.headerText}>Type</Text>
        <Text style={styles.headerText}>Date</Text>
      </View>
      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  flatList: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
});

export default ResultScreen;
