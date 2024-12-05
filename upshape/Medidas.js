import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const Medidas = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateResult = () => {
    // Verifica se o peso e a altura são números válidos
    if (!isValidNumber(weight) || !isValidNumber(height)) {
      setErrorMessage('Por favor, insira valores válidos para peso e altura');
      return;
    }

    // Converta peso e altura para números
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Calcula o índice de massa corporal (IMC)
    const bmi = weightValue / Math.pow(heightValue, 2);

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

    // Limpa a mensagem de erro
    setErrorMessage('');
  };

  const isValidNumber = (value) => {
    // Verifica se o valor é um número válido
    return !isNaN(value) && !isNaN(parseFloat(value));
  };

  const handleWeightChange = (text) => {
   // Substitui todas as vírgulas por pontos
  let formattedInput = text.replace(/,/g, '.');

    // Limita o número de casas decimais a duas
    const decimalParts = formattedInput.split('.');
    if (decimalParts.length > 1) {
      formattedInput = decimalParts[0] + '.' + decimalParts[1].slice(0, 2);
    }

    setWeight(formattedInput);
  };

  const handleHeightChange = (text) => {
    // Remove caracteres inválidos do input e formata o valor
    let formattedInput = text.replace(/[^\d.]/g, ''); // Remove caracteres não numéricos e mantém apenas pontos
    if (parseFloat(formattedInput) > 2.99) {
      formattedInput = '2.99';};

    // Limita o número de casas decimais a uma à direita e duas à esquerda
    const parts = formattedInput.split('.');
    if (parts.length > 1) {
      formattedInput = parts[0].slice(0, 2) + '.' + parts[1].slice(0, 1);
    }

    setHeight(formattedInput); // Corrigido para setar a altura
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Massa corporal</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso (KG)"
        keyboardType="numeric"
        type={'custom'}
        value={weight}
        maxLength={5} // Definindo o comprimento máximo para 4 caracteres

        onChangeText={handleWeightChange}
      />
      <TextInputMask
        style={styles.input}
        placeholder="Altura (Metros)"
        keyboardType="numeric"
        type={'custom'}
        options={{
          mask: '9.99'
        }}
        value={height}
        onChangeText={handleHeightChange}
      />
      <Button title="Calcular" onPress={calculateResult} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
    marginBottom: 20,
    paddingLeft: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});

export default Medidas;
