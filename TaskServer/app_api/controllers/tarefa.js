var Tarefa = require('../models/tarefas');

module.exports.buscaTodos = function (req, res) {
    Tarefa.find({'concluido': {$ne : true}}).sort({prazo: 1, prioridade: -1}).exec()
        .then(
        function (tarefas) {
            res.json(tarefas);
        },
        function (error) {
            res.status(500).json(error);
        });
};

module.exports.concluirTarefa = function (req, res) {
    var conc = req.params.concluido;
    Tarefa.update({'concluido': conc},{$set:{'concluido': true}}).exec()
        .then(
            function (tarefa) {
                res.json(tarefa);
            },
            function (erro) {
                return console.error(erro);
            } 
        );
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
        }
        );
};

module.exports.atualizarTarefa = function (req, res) {
    Tarefa.update(req.body)
        .then(
            function (tarefa) {
                res.json(tarefa);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        )
};

module.exports.remove = function (req, res) {
    var _id = req.params.id;
    Tarefa.remove({ "_id": _id }).exec()
        .then(
        function () {
            res.status(204).end();
        },
        function (erro) {
            return console.error(erro);
        }
    );
};

module.exports.notificacoes = function (req, res) {
    Tarefa.find().sort({prazo: 1, prioridade: -1}).exec()
        .then(
        function (tarefas) {
            res.json(tarefas);
        },
        function (error) {
            res.status(500).json(error);
        });
};

module.exports.qtdeNotificacoes = function (req, res) {
    Tarefa.find().count()
        .then(function (response) {
            res.json(response)
        },
        function (error) {
            res.status(500).json(error);
        });
};