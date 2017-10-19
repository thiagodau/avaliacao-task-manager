var Produto = require('../models/produtos');

module.exports.buscaTodos = function (req, res) {
    Produto.find().sort({dataUltimaRemessa: -1}).exec()
        .then(
        function (produtos) {
            res.json(produtos);
        },
        function (error) {
            res.status(500).json(error);
        });
};

module.exports.salvarProduto = function (req, res) {
    Produto.create(req.body)
        .then(
        function (produto) {
            res.json(produto);
        },
        function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

module.exports.remove = function (id) {
    var id = req.params._id;
    Contato.remove({"_id":id}).exec()
        .then(
        function (produtos) {
            res.status(204).end();
        },
        function (erro) {
            console.error(erro);
        });
};