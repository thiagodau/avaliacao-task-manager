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
    var carregaQtdeNotificacoes = function () {
        $http.get("http://localhost:3000/tarefas/qtdeNotificacoes")
            .then(function (response) {
                $scope.qtdeNotificacoes = response.data;
            });
    };
    carregaQtdeNotificacoes();

    $scope.salvarTarefa = function() {
        var dados = {
            titulo: $scope.titulo,
            descricao: $scope.descricao,
            prioridade: $scope.prioridade,
            prazo: $scope.prazo,
            concluido: false
        };
        $http.post("http://localhost:3000/tarefas/", JSON.stringify(dados))
            .then(
            function (sucesso) {
                $scope.sucesso = "Tarefa cadastrada com sucesso!";
                carregaTarefas();
            },
            function (erro) {
                $scope.erro = "Erro ao tentar cadastrar a tarefa!";
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
            },
            function (erro){
                alert(id + " - Não foi possível remover a tarefa!")
            });
    }

    $scope.listarTodas = function (){
        $http.get("http://localhost:3000/tarefas")
        .then(function (response) {
            $scope.tarefas = response.data;
        });
    }

    $scope.notificacoes = function (){
        $http.get("http://localhost:3000/tarefas/notificacoes")
        .then(function (response) {
            $scope.tarefas = response.data;
        });
    }

});