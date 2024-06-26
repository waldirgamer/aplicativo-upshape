import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, StatusBar, SafeAreaView } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Verifica se o usuário e senha estão corretos
    if (username === 'T' && password === '1') {
      // Redireciona para a tela de registro
      navigation.navigate('Register');
    } else {
      // Caso contrário, exibe uma mensagem de erro
      console.log('Credenciais inválidas');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#84848c" />
      <View style={styles.content}>
        <Image
          source={require("./src/assets/Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Bora Sheipar!!!</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha-"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84848c',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
});

export default Login;
