import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const Database = {
  db: null,

  initializeDatabase: async () => {
    try {
      Database.db = await SQLite.openDatabase({
        name: 'quiz.db',
        location: 'default',
      });

      console.log('Database connected successfully!');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  },
  fetchTestData: async () => {
    try {
      const results = await Database.executeQuery('SELECT * FROM test'); // Wykonaj zapytanie SELECT
      return results;
    } catch (error) {
      console.error('Błąd podczas pobierania danych z tabeli test:', error);
      throw error;
    }
  },

  closeDatabase: () => {
    if (Database.db) {
      Database.db.close()
        .then(() => {
          console.log('Database closed successfully!');
        })
        .catch((error) => {
          console.error('Failed to close database:', error);
        });
    }
  },
  

  executeQuery: async (sql, params = []) => {
    return new Promise((resolve, reject) => {
      if (!Database.db) {
        reject(new Error('Database is not open.'));
      } else {
        Database.db.transaction((tx) => {
          tx.executeSql(sql, params, (tx, results) => {
            resolve(results);
          }, (error) => {
            reject(error);
          });
        });
      }
    });
  },
  
};

export default Database;
