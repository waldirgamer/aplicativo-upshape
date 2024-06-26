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
        )`
      ).then(() => {
        resolve();
      }).catch(error => {
        console.log("Error creating table", error);
        reject(error);
      });
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
        [name, age]
      ).then(([tx, results]) => {
        resolve(results);
      }).catch(error => {
        console.log("Error inserting user", error);
        reject(error);
      });
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
        `SELECT * FROM Users`
      ).then(([tx, results]) => {
        let users = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          users.push(row);
        }
        resolve(users);
      }).catch(error => {
        console.log("Error fetching users", error);
        reject(error);
      });
    });
  });
};
