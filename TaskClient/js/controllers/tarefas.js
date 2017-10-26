var app = angular.module('myAppA', []);
app.controller('ctrlTarefas', function ($scope, $http) {
    var carregaTarefas = function () {
        $http.get("http://localhost:3000/tarefas")
            .then(function (response) {
                $scope.tarefas = response.data;
            });
    };
    
    carregaTarefas();

    $scope.qtdeNotificacoes = 0;
    $scope.notificacoes = function (){
        $scope.txtConcluidas = "concluídas";
        $http.get("http://localhost:3000/tarefas/notificacoes")
        .then(function (response) {
            $scope.tarefas = response.data;
        });
    }

    var carregaQtdeNotificacoes = function () {
        $http.get("http://localhost:3000/tarefas/qtdeNotificacoes")
            .then(function (response) {
                $scope.qtdeNotificacoes = response.data;
            });
    };
    carregaQtdeNotificacoes();

    $scope.duplicarTarefa = function(titulo, descricao, prazo, prioridade) {
        var dados = {
            titulo: titulo + " - Cópia",
            descricao,
            prioridade,
            prazo,
            concluido: false,
            expirado: false
        };

        $http.post("http://localhost:3000/tarefas/", JSON.stringify(dados))
        .then(
        function (sucesso) {
            alert("Tarefa duplicada!")
            carregaTarefas();
            carregaQtdeNotificacoes();
        },
        function (erro) {
            alert("Erro ao tentar duplicar a tarefa!");
        });
        
    }
    
    $scope.salvarTarefa = function() {
        var dados = {
            titulo: $scope.titulo,
            descricao: $scope.descricao,
            prioridade: $scope.prioridade,
            prazo: $scope.prazo,
            concluido: false,
            expirado: false
        };
        $http.post("http://localhost:3000/tarefas/", JSON.stringify(dados))
            .then(
            function (sucesso) {
                alert("Tarefa cadastrada com sucesso!");
                window.location.href = "inicio.html";
            },
            function (erro) {
                $scope.erro = "Erro ao tentar cadastrar a tarefa!";
            });
    }

    $scope.concluirTarefa = function(concluido) {
        $http.put("http://localhost:3000/tarefas/concluir/" + concluido)
        .then(function (sucesso){
            alert("Tarefa concluida com sucesso!")
            carregaTarefas();
            carregaQtdeNotificacoes();
        },
        function (erro){
            alert(concluido + " - Não foi possível concluir a tarefa!")
        });
    }

    $scope.buscarTarefa = function() {
        $http.get("http://localhost:3000/tarefas/" + $scope.campoBusca)
        .then(function(response) {
            $scope.tarefas = response.data;
        });
    }

    $scope.remove = function(id) {
        $http.delete("http://localhost:3000/tarefas/" + id)
        .then(function (sucesso){
                alert("Tarefa removida com sucesso!")
                carregaTarefas();
                carregaQtdeNotificacoes();
            },
            function (erro){
                alert(id + " - Não foi possível remover a tarefa!")
            });
    }

    $scope.listarTodas = function (){
        $scope.txtConcluidas = "";
        $http.get("http://localhost:3000/tarefas")
        .then(function (response) {
            $scope.tarefas = response.data;
        });
    }

    $scope.editarTarefa = function(id, titulo, descricao, prazo, prioridade) {
        $scope.titulof = titulo;
        $scope.descricaof = descricao;
        $scope.prazof = prazo;
        $scope.prioridadef = prioridade;
    }
    
    $scope.atualizarTarefa = function (id, titulof, prazof, descricaof, prioridadef) {
        $http.put("http://localhost:3000/tarefas/"+id+"/"+titulof+"/"+prazof+"/"+descricaof+"/"+prioridadef)
            .then(
            function (sucesso) {
                alert("Atualizado com sucesso!")
            },
            function (erro) {
                $scope.erro = "Erro ao tentar alterar a tarefa!";
            });
            carregaTarefas();
            carregaQtdeNotificacoes();
        window.location.href = "inicio.html";               
    }
});