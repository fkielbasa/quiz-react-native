import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import results from '../data/resultData';

const ResultScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nick</Text>
          <Text style={styles.headerText}>Point</Text>
          <Text style={styles.headerText}>Type</Text>
          <Text style={styles.headerText}>Date</Text>
        </View>
        {results.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={styles.rowText}>{item.nick}</Text>
            <Text style={styles.rowText}>{item.point}</Text>
            <Text style={styles.rowText}>{item.type}</Text>
            <Text style={styles.rowText}>{item.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
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
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
});

export default ResultScreen;