import SQLite from 'react-native-sqlite-storage';
import fetchTests from './api/fetchTests';

const db = SQLite.openDatabase(
  {
    name: 'quizRN.db',
    location: 'default',
  },
  () => {
    console.log('Connected to database');
  },
  (error) => {
    console.error('Error opening database:', error);
  }
);
const saveTestsToDatabase = async () => {
  try {
    const tests = await fetchTests();
    const testsString = JSON.stringify(tests);

      await db.transaction(async (tx) => {
      // await tx.executeSql('DELETE FROM testsD'); 
      await tx.executeSql('INSERT INTO testsD (data) VALUES (?)', [testsString]);
    });
    console.log('Testy zostały zapisane w bazie danych.');
  } catch (error) {
    console.error('Błąd zapisu testów do bazy danych:', error);
    throw error;
  }
};
export const saveTestsDaily = () => {
  saveTestsToDatabase();
  const interval = 24 * 60 * 60 * 1000;
  setInterval(saveTestsToDatabase, interval);
};
// db.transaction((tx) => {
//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS testsD (id INTEGER PRIMARY KEY, data TEXT)',
//     [],
//     (tx, results) => {
//       console.log('Tabela "testsD" została utworzona.');
//     },
//     (error) => {
//       console.error('Błąd podczas tworzenia tabeli "tests":', error);
//     }
//   );
// });
// db.transaction((tx) => {
//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS testsE (id_test, details TEXT)',
//     [],
//     (tx, results) => {
//       console.log('Tabela "testsE" została utworzona.');
//     },
//     (error) => {
//       console.error('Błąd podczas tworzenia tabeli "tests":', error);
//     }
//   );
// });
export const getAllTests = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM testsD', [], (tx, results) => {
        const tests = [];
        for (let i = 0; i < results.rows.length; i++) {
          const row = results.rows.item(i);
          const testData = JSON.parse(row.data);
          tests.push(...testData);
        }
        resolve(tests);
        console.log(tests);
      });
    },
    (error) => {
      reject(error);
    });
  });
};
export const getTestDetailsById = async (idTest) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT details FROM testsE WHERE id_test = ?',
        [idTest],
        (tx, results) => {
          if (results.rows.length > 0) {
            const row = results.rows.item(0);
            const testDetails = JSON.parse(row.details);
            resolve(testDetails);
            console.log(testDetails);
          } else {
            resolve(null);
            console.log('Brak danych dla id');
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
export const saveTestDetailsToDatabase = async (apiTestId, testData) => {
  try {
    const detailsString = JSON.stringify(testData);
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO testsE (id_test, details) VALUES (?, ?)',
        [apiTestId, detailsString]
      );
    });
    console.log('Rekord został dodany.');
  } catch (error) {
    console.error('Błąd dodawania rekordu.:', error);
    throw error;
  }
};
export const displayRecords = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM testsE',
      [],
      (tx, results) => {
        const len = results.rows.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            console.log('Rekord:', row);
          }
        } else {
          console.log('Brak rekordów w tabeli "tests"');
        }
      },
      error => {
        console.error('Błąd wykonania zapytania SQL:', error);
      }
    );
  });
};
export const getTestDetailsFromDatabase = async (apiTestId) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT details FROM tests WHERE idTest = ?',
          [apiTestId],
          (tx, results) => {
            if (results.rows.length > 0) {
              const row = results.rows.item(0);
              const detailsString = row.details;
              const parsedDetails = JSON.parse(detailsString);
              resolve(parsedDetails);
            } else {
              resolve(null); //
            }
          },
          error => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error('Błąd odczytu szczegółów testu z bazy danych:', error);
    throw error;
  }
};