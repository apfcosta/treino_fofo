const express = require('express');
const app = express();
const treinoRoutes = express.Router();

let Treino = require('../model/Treino');

// api to add treino
treinoRoutes.route('/add').post(function (req, res) {
  let treino = new Treino(req.body);
  treino.save()
  .then(treino => {
    res.status(200).json({'status': 'success','mssg': 'Dados adicionados com sucesso!'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'Não foi possível salvar os dados.'});
  });
});

// api to get treinos
treinoRoutes.route('/').get(function (req, res) {
  Treino.find(function (err, treinos){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Algo deu errado'});
    }
    else {
      res.status(200).json({'status': 'success','treinos': treinos});
    }
  });
});

// api to get treino
treinoRoutes.route('/treino/:id').get(function (req, res) {
  let id = req.params.id;
  Treino.findById(id, function (err, treino){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Algo deu errado'});
    }
    else {
      res.status(200).json({'status': 'success','treino': treino});
    }
  });
});

// api to update route
treinoRoutes.route('/update/:id').put(function (req, res) {
    Treino.findById(req.params.id, function(err, treino) {
    if (!treino){
      res.status(400).send({'status': 'failure','mssg': 'Não foi possível encontrar os dados.'});
    } else {
        treino.nomeExercicio = req.body.nomeExercicio;
        treino.series = req.body.series;
        treino.repeticoes= req.body.repeticoes;
        treino.carga = req.body.carga;

        treino.save().then(treino => {
          res.status(200).json({'status': 'success','mssg': 'Dados atualizados com sucesso!'});
      })
    }
  });
});

// api for delete
treinoRoutes.route('/delete/:id').delete(function (req, res) {
  Treino.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Algo deu errado'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Dados apagados com sucesso.'});
    }
  });
});

module.exports = treinoRoutes;