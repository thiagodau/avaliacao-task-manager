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

    $scope.salvarTarefa = function() {
        var dados = {
            titulo: $scope.titulo,
            descricao: $scope.descricao,
            prioridade: $scope.prioridade,
            prazo: $scope.prazo
        }

        $http.post("http://localhost:3000/tarefas/", JSON.stringify(dados))
        .then(function (sucesso) {
            $scope.sucesso = "Tarefa cadastrada com sucesso!";
            carregaTarefas();
        },
        function (erro) {
            $scope.erro = "Erro ao tentar cadastrar a tarefa!";
        });
    }
});