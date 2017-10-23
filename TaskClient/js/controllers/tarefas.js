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
        $scope.prazo = formatarData($scope.prazo);
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
        },
        function (erro){
            alert(concluido + " - Não foi possível concluir a tarefa!")
        });
    }

    function formatarData(data) {
        var d = new Date(data),
            mes = '' + (d.getMonth() + 1),
            dia = '' + d.getDate(),
            ano = d.getFullYear();
    
        if (mes.length < 2) mes = '0' + mes;
        if (dia.length < 2) dia = '0' + dia;
    
        return [ano, mes, dia].join('/');
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
/*        var horarioAtual = new Date();
        //alert(horarioAtual.getDate())
        $(function (){
            var prazo = $("#idPrazo").text();
           // alert(prazo)
        }); */
    }

    $scope.editarTarefa = function (id, titulo, prazo, descricao, prioridade) {
        $scope.cTitulo = titulo;
        //$scope.cPrazo = prazo;
        $scope.cDescricao = descricao;
        $scope.cPrioridade = prioridade;
    }

    $scope.atualizarTarefa = function () {
        var dados = {
            titulo: $scope.cTitulo,
            descricao: $scope.cDescricao,
            prioridade: $scope.cPrioridade,
            prazo: $scope.cPrazo
        };

        http.put("http://localhost:3000/tarefas", JSON.stringify(dados))
            .then(function (sucesso){
                $scope.sucesso = "Tarefa Atualizada!";
            },function (erro){
                $scope.erro = "Erro ao tentar atualizar a tarefa";
            });
    }
    
});