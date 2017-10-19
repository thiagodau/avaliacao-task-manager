var app = angular.module('myApp', []);
app.controller('ctrlProdutos', function ($scope, $http) {
    var carregaProdutos = function () {
        $http.get("http://localhost:3000/produtos")
            .then(function (response) {
                $scope.produtos = response.data;
            });
    };

    carregaProdutos();

    $scope.descricao = null;
    $scope.qtdeEstoque = null;
    $scope.precoUnitario = null;
    $scope.dataUltimaRemessa = null;

    $scope.salvarProduto = function() {
        var dados = {
            descricao: $scope.descricao,
            qtdeEstoque: $scope.qtdeEstoque,
            precoUnitario: $scope.precoUnitario,
            dataUltimaRemessa: $scope.dataUltimaRemessa
        }

        $http.post("http://localhost:3000/produtos/", JSON.stringify(dados))
        .then(function (sucesso) {
            $scope.sucesso = "Produto cadastrado com sucesso!";
            carregaProdutos();
        },
        function (erro) {
            $scope.erro = "Erro ao tentar cadastrar o produto!";
        });
    }

    $scope.remove = function (id) {
        $http.delete("http://localhost:3000/produtos/"+id)
            .then(
            function (sucesso) {
                $scope.sucesso = "Produto removido com sucesso!";
            },
            function (erro) {
                $scope.erro = "Professor, não consigui resolver esse erro: 'Method DELETE is not allowed by Access-Control-Allow-Methods in preflight response.'";
            });
    }

});