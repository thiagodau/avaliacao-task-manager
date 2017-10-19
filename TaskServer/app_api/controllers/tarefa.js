var Tarefa = require('../models/tarefas');

module.exports.buscaTodos = function (req, res) {
    Tarefa.find().sort({nomeTarefa: 1}).exec()
        .then(
        function (tarefas) {
            res.json(tarefas);
        },
        function (error) {
            res.status(500).json(error);
        });
};

module.exports.buscarTarefa = function (req, res) {
    var titulo = req.params.titulo;

    Tarefa.find({'titulo' : new RegExp(titulo, 'i')})
        .exec()
        .then(function (tarefas){
            res.json(tarefas);
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
};

module.exports.salvarTarefa = function (req, res) {
    Tarefa.create(req.body)
        .then(
        function (tarefa) {
            res.json(tarefa);
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
};

module.exports.removerTarefa = function (id) {
    var id = req.params._id;

    Tarefa.remove({"_id": id}).exec()
        .then(
        function (tarefas) {
            res.status(204).end();
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
};