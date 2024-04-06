import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Register = ({ navigation }) => {
  const [activity, setActivity] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  const handleSaveAlarm = () => {
    // Verifica se todos os campos estão preenchidos
    if (activity && day && time) {
      // Cria uma string com os detalhes do alarme
      const alarmDetails = `Atividade: ${activity}, Dia: ${day}, Hora: ${time}`;

      // Aqui você pode adicionar lógica para salvar o alarme, como armazená-lo no armazenamento local ou enviar para um servidor

      // Exibe uma mensagem de sucesso
      Alert.alert('Sucesso', 'Alarme salvo com sucesso');

      // Limpa os campos após salvar o alarme
      setActivity('');
      setDay('');
      setTime('');
    } else {
      // Caso contrário, exibe uma mensagem de erro
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
      <Button title="Meça sua massa" onPress={() => navigation.navigate('Measurements')} />
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
