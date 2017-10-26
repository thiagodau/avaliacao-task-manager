var mongoose = require('mongoose');

var tarefa = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    prioridade: {
        type: Number,
        required: true
    },
    prazo: {
        type: Date,
        required: false
    },
    concluido: {
        type: Boolean,
        required: true
    },
    expirado: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Tarefa', tarefa);