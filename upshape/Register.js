import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'activitydb',
    location: 'default',
  },
  () => {},
  error => { console.log(error) }
);

const Register = ({ navigation }) => {
  const [activity, setActivity] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, activity TEXT, day TEXT, time TEXT)',
        [],
        () => { console.log('Table created successfully'); },
        error => { console.log('Error creating table: ', error); }
      );
    });
  }, []);

  const handleSaveAlarm = () => {
    if (activity && day && time) {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO activities (activity, day, time) VALUES (?, ?, ?)',
          [activity, day, time],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert('Sucesso', 'Alarme salvo com sucesso');
              setActivity('');
              setDay('');
              setTime('');
            } else {
              Alert.alert('Erro', 'Falha ao salvar o alarme');
            }
          },
          error => { console.log('Error inserting data: ', error); }
        );
      });
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Atividades</Text>
      <TextInput
        style={styles.input}
        placeholder="Atividade"
        onChangeText={text => setActivity(text)}
        value={activity}
      />
      <TextInput
        style={styles.input}
        placeholder="Dia"
        onChangeText={text => setDay(text)}
        value={day}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora"
        onChangeText={text => setTime(text)}
        value={time}
      />
      <Button title="Salvar Alarme" onPress={handleSaveAlarm} />
      <Button title="Meça sua massa" onPress={() => navigation.navigate('Medidas')} />
      <Button title="Sair" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Register;
