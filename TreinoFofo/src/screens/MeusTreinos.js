import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import api from '../services/api';

class MeusTreinos extends Component {

  Cadastro = ({ navigation }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Cadastro")}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
    )
  }

  Editar = (item) => {
    this.props.navigation.navigate("EditarExercicio", { item });
  };

  state = {
    exercicios: []
  };

  componentDidMount() {
    this.fetchData();

    this.props.navigation.addListener('focus', this.fetchData);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.fetchData);
  }

  fetchData = async () => {
    try {
      const response = await api.get('/treino');
      console.log(response.data.treinos);
      this.setState({ exercicios: response.data.treinos });
    } catch (error) {
      console.error(error);
    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.Editar(item)}>
      <View style={styles.lista} >
        <Text style={styles.exercicio}>Exercício: {item.nomeExercicio}</Text>
        <Text style={styles.series}>Número de séries: {item.series}</Text>
        <Text style={styles.repeticoes}>Número de repetições: {item.repeticoes}</Text>
        <Text style={styles.carga}>Carga (kg): {item.carga}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <SafeAreaView style={styles.contentContainer}>
          <FlatList
            data={this.state.exercicios}
            keyExtractor={(item) => item._id.toString()}
            renderItem={this.renderItem}
          />
        </SafeAreaView>

        {this.Cadastro(this.props)}
      </View>
    );
  }
}

export default MeusTreinos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2B2A',
    paddingTop: 15,
  },
  add: {
    color: '#2A2B2A',
    fontSize: 35,
    alignContent: 'center',
    paddingBottom: 8,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 60,
  },
  lista: {
    alignSelf: 'center',
    backgroundColor: '#2A2B2A',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#949494',
    padding: 15,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#f0cfdd',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  exercicio: {
    color: '#dedede',
    fontSize: 17,
  },
  series: {
    color: '#dedede',
    fontSize: 15,
  },
  repeticoes: {
    color: '#dedede',
    fontSize: 15,
  },
  carga: {
    color: '#dedede',
    fontSize: 15,
  },
});