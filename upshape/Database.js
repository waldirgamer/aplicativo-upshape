import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "test.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

let db = null;

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    console.log("Attempting to open database with params:", {
      database_name,
      database_version,
      database_displayname,
      database_size
    });

    SQLite.openDatabase(
      {
        name: database_name,
        location: 'default', // Para Android
        createFromLocation: 1
      },
      (DB) => {
        db = DB;
        console.log("Database opened successfully:", db);
        resolve(DB);
      },
      (error) => {
        console.log("Error opening database:", error);
        reject(error);
      }
    );
  });
};

const _Database = {
  insertUser: function(user) {
    if (!db) {
      console.error("Database is not open");
      return;
    }

    const { name, age } = user;
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (name, age) VALUES (?, ?)',
        [name, age],
        (tx, results) => {
          console.log("User inserted successfully:", results);
        },
        (error) => {
          console.log("Error inserting user:", error);
        }
      );
    });
  }
};

export default _Database;
