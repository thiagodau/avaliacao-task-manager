var express = require('express');
var router = express.Router();
var ctrlTarefas = require('../controllers/tarefa');

router.get('/tarefas', ctrlTarefas.buscaTodos);
router.get('/tarefas/:titulo', ctrlTarefas.buscarTarefa);
router.post('/tarefas', ctrlTarefas.salvarTarefa);
router.delete('/tarefas/:id', ctrlTarefas.remove);

module.exports = router;