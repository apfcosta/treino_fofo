import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();

  const [exercicio, setExercicio] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [carga, setCarga] = useState('');

  const enviar = async () => {
    console.log('Chegou aqui')
    try {
      const response = await axios.post('http://192.168.0.2:3000/treino/add', {
        nomeExercicio: exercicio,
        series: series,
        repeticoes: repeticoes,
        carga: carga,
      });
      console.log(response)
      Alert.alert('Exercício adicionado com sucesso!', response.data.mssg);
      setExercicio('');
      setSeries('');
      setRepeticoes('');
      setCarga('');

      navigation.navigate('MeusTreinos');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar o exercício.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        placeholder="Nome do exercício"
        style={styles.textInput}
        onChangeText={(text) => setExercicio(text)}
        value={exercicio}
      />
      <TextInput
        placeholder="Número de séries"
        style={styles.textInput}
        onChangeText={(text) => setSeries(text)}
        value={series}
      />
      <TextInput
        placeholder="Número de repetições"
        style={styles.textInput}
        onChangeText={(text) => setRepeticoes(text)}
        value={repeticoes}
      />
      <TextInput
        placeholder="Carga (kg)"
        style={styles.textInput}
        onChangeText={(text) => setCarga(text)}
        value={carga}
      />

      <TouchableOpacity style={styles.button} onPress={enviar}>
        <Text>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2B2A',
    alignItems: 'center',
    paddingTop: 50,
    padding: 15,
  },
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f0cfdd',
    textAlign: 'center',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 40,
  },
});