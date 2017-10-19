var Tarefa = require('../models/tarefas');

module.exports.buscaTodos = function (req, res) {
    Tarefa.find().sort({prazo: -1}).exec()
        .then(
        function (tarefas) {
            res.json(tarefas);
        },
        function (error) {
            res.status(500).json(error);
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
}