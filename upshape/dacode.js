import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('test.db');

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    console.log("Attempting to open database with params:", {
      name: 'test.db'
    });

    // O Expo SQLite não requer uma função de callback para abrir
    resolve(db);
  });
};

export const createTable = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database is not open");
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          age INTEGER
        )`,
        [],
        () => resolve(),
        (_, error) => {
          console.log("Error creating table", error);
          reject(error);
        }
      );
    });
  });
};

export const insertUser = (name, age) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database is not open");
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO Users (name, age) VALUES (?, ?)`,
        [name, age],
        (_, results) => resolve(results),
        (_, error) => {
          console.log("Error inserting user", error);
          reject(error);
        }
      );
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database is not open");
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users`,
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => {
          console.log("Error fetching users", error);
          reject(error);
        }
      );
    });
  });
};
