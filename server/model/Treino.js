const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Treino = new Schema({
  nomeExercicio: {
    type: String
  },
  series: {
    type: String
  },
  repeticoes: {
    type: String
  },
  carga: {
    type: String
  }
},{
    collection: 'treino'
});

module.exports = mongoose.model('Treino', Treino);