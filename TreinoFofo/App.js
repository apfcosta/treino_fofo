import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from './src/screens/Inicio';
import Cadastro from './src/screens/Cadastro';
import MeusTreinos from "./src/screens/MeusTreinos";
import EditarExercicio from './src/screens/EditarExercicio';
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import api from './src/services/api';

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      exercicios: []
    }
  }

  async componentDidMount(){
    const response = await api.get('/treino');
    this.setState({
      exercicios: response.data
    });
  }

  render(){
    const Stack = createStackNavigator();
    return(
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Inicio" component={Inicio} />
            <Stack.Screen options={{headerStyle: {backgroundColor: '#f0cfdd'}, headerTitle: 'Meus Treinos'}} name="MeusTreinos" component={MeusTreinos} />
            <Stack.Screen options={{headerStyle: {backgroundColor: '#f0cfdd'}, headerTitle: 'Novo exercício'}} name="Cadastro" component={Cadastro} />
            <Stack.Screen options={{headerStyle: {backgroundColor: '#f0cfdd'}, headerTitle: 'Editar exercício'}} name="EditarExercicio" component={EditarExercicio} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});
