import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
            source={require('../img/HelloKittyBombada.png')}
            style={{ width: 400, height: 400 }}
        />

        <View style={[styles.rectangle, styles.shadowProp]}> </View>

        <Text style={styles.title}>
          Cansado de ser FRACO? Registre todos os seus treinos AGORA!
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MeusTreinos")}>
              <Text>MEUS TREINOS</Text>
        </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0cfdd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '10%',
  },

  rectangle: {
    height: '45%',
    width: '100%',
    backgroundColor: '#2A2B2A',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  shadowProp: {
    shadowColor: '#6b6869',
    shadowOffset: {width: 2, height: -2},
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 0,
  },

  title: {
    color: '#dedede',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: '30%',
    fontSize: 18,
    margin: 30,
  },

  button: {
    backgroundColor: '#f0cfdd',
    textAlign: 'center',
    width: '92%',
    height: 40,
    position: 'absolute',
    bottom: 70,
    justifyContent: 'center',
    borderRadius: 8,
  },
});
