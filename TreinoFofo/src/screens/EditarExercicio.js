import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import api from '../services/api';

class EditarExercicio extends Component {
  state = {
    nomeExercicio: '',
    series: '',
    repeticoes: '',
    carga: '',
    isModalVisible: false,
  };

  componentDidMount() {
    const { item } = this.props.route.params;
    this.setState({
      nomeExercicio: item.nomeExercicio,
      series: item.series,
      repeticoes: item.repeticoes,
      carga: item.carga,
    });
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSave = async () => {
    try {
      const { item } = this.props.route.params;
      const { nomeExercicio, series, repeticoes, carga } = this.state;

      await api.put(`/treino/update/${item._id}`, {
        nomeExercicio,
        series,
        repeticoes,
        carga,
      });

      this.props.navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  handleDelete = () => {
    this.setState({ isModalVisible: true });
  };

  handleConfirmDelete = async () => {
    try {
      const { item } = this.props.route.params;

      await api.delete(`/treino/delete/${item._id}`);

      this.props.navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  handleCancelDelete = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { nomeExercicio, series, repeticoes, carga, isModalVisible } = this.state;

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          value={nomeExercicio}
          onChangeText={(value) => this.handleInputChange('nomeExercicio', value)}
        />

        <TextInput
          style={styles.input}
          value={series}
          onChangeText={(value) => this.handleInputChange('series', value)}
        />

        <TextInput
          style={styles.input}
          value={repeticoes}
          onChangeText={(value) => this.handleInputChange('repeticoes', value)}
        />

        <TextInput
          style={styles.input}
          value={carga}
          onChangeText={(value) => this.handleInputChange('carga', value)}
        />

        <TouchableOpacity style={styles.button} onPress={this.handleSave}>
          <Text>SALVAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDelete} onPress={this.handleDelete}>
          <Text>DELETAR</Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Tem certeza de que deseja excluir este exercício?</Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={styles.modalButtonC} onPress={this.handleCancelDelete}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonE} onPress={this.handleConfirmDelete}>
                  <Text>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

export default EditarExercicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2B2A',
    paddingTop: 50,
    padding: 15,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f0cfdd',
    textAlign: 'center',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
  buttonDelete: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonE: {
    backgroundColor: '#f0cfdd',
    textAlign: 'center',
    width: 140,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#221307',
  },
  modalButtonC: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: 140,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#221307',
  },
});