import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { openDatabase, createTable, insertUser, getUsers } from './Database'; 
import Login from './Login';
import Register from './Register';
import Medidas from './Medidas';

const Stack = createStackNavigator();

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function initDb() {
      try {
        const dbInstance = await openDatabase();
        if (dbInstance) {
          await createTable();
          console.log("Database initialized and table created.");
        } else {
          console.error("Database instance is null.");
        }
      } catch (error) {
        console.error("Error initializing database: ", error);
      }
    }

    initDb();
  }, []);

  const handleInsertUser = async () => {
    try {
      await insertUser("John Doe", 30);
      const usersList = await getUsers();
      setUsers(usersList);
    } catch (error) {
      console.error("Error inserting user: ", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Registrar',
            headerLeft: null // Remove o botão de voltar
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Medidas" component={Medidas} />
      </Stack.Navigator>
      <View>
        <Button title="Add User" onPress={handleInsertUser} />
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>ID: {item.id}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Age: {item.age}</Text>
            </View>
          )}
        />
      </View>
    </NavigationContainer>
  );
}

export default App;
