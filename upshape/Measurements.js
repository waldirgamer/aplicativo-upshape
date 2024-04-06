import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Measurements = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    // Converta peso e altura para números
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Verifique se o peso e a altura são números válidos
    if (!isNaN(weightValue) && !isNaN(heightValue)) {
      // Calcula o índice de massa corporal (IMC)
      const bmi = weightValue / Math.pow(heightValue / 100, 2);

      // Verifica o resultado do IMC
      if (bmi < 18.5) {
        setResult('Você está abaixo do peso');
      } else if (bmi >= 18.5 && bmi < 25) {
        setResult('Seu peso está normal');
      } else if (bmi >= 25 && bmi < 30) {
        setResult('Você está com sobrepeso');
      } else {
        setResult('Você está gordo');
      }
    } else {
      // Caso contrário, exibe uma mensagem de erro
      setResult('Por favor, insira valores válidos para peso e altura');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Massa corporal</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso(KG)"
        keyboardType="numeric"
        onChangeText={text => setWeight(text)}
        value={weight}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        onChangeText={text => setHeight(text)}
        value={height}
      />
      <Button title="Calculate" onPress={calculateResult} />
      <Text style={styles.result}>{result}</Text>
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
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Measurements;
