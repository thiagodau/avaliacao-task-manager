var express = require('express');
var router = express.Router();
var ctrlTarefas = require('../controllers/tarefa');

router.get('/tarefas', ctrlTarefas.buscaTodos);
router.get('/tarefas/notificacoes', ctrlTarefas.notificacoes);
router.get('/tarefas/qtdeNotificacoes', ctrlTarefas.qtdeNotificacoes);
router.get('/tarefas/:titulo', ctrlTarefas.buscarTarefa);
router.post('/tarefas', ctrlTarefas.salvarTarefa);
router.delete('/tarefas/:id', ctrlTarefas.remove);
router.put('/tarefas/concluir/:concluido', ctrlTarefas.concluirTarefa);
router.put('/tarefas/:id/:titulof/:prazof/:descricaof/:prioridadef', ctrlTarefas.atualizarTarefa);

module.exports = router;