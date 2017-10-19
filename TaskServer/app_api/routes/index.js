var express = require('express');
var router = express.Router();
var ctrlProdutos = require('../controllers/produtos');
var ctrlTarefas = require('../controllers/tarefa');

router.get('/produtos', ctrlProdutos.buscaTodos);
router.post('/produtos', ctrlProdutos.salvarProduto);
router.delete('/produtos/:id', ctrlProdutos.remove);

router.get('/tarefas', ctrlTarefas.buscaTodos);
router.post('/tarefas', ctrlTarefas.salvarTarefa);

module.exports = router;