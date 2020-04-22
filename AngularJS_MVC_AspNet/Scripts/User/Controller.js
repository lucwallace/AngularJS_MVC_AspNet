myapp.controller('user-controller', function ($scope, userService) {

    exibirUsers();

    function exibirUsers() {
        var Usuario = userService.getAllUsers();
        Usuario.then(function (user) {
            $scope.Users = user.data;
        },
            function () {
                alert("Error ao carregar a Lista");
            });
    }

    $scope.create = function () {

        $scope.$broadcast('show-errors-check-validity');

        if ($scope.AddNewForm.$invalid) {
            return;
        }

        var User = {
            Id: $scope.Id,
            Nome: $scope.Nome,
            Telefone: $scope.Telefone,
            Email: $scope.Email
        };

        var salvar = userService.create(User);
        salvar.then(function (user) {
            if (user.data.success === true) {
                exibirUsers();
                alert("Usuário adicionado com sucesso");
                $scope.limpar();
            }
            else {
                alert("Usuário não adicionado");
            }
        },
            function () {
                alert("Error na lista de usuários");
            });
    }

    $scope.limpar = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.Id = '';
        $scope.Nome = '';
        $scope.Telefone = '';
        $scope.Email = '';
    }

    $scope.getUpdate = function (User) {
        $scope.UserId = User.Id;
        $scope.UserNome = User.Nome;
        $scope.UserTelefone = User.Telefone;
        $scope.UserEmail = User.Email;
    }

    $scope.getDelete = function (User) {
        $scope.UserId = User.Id;
        $scope.UserNome = User.Nome;
    }

    $scope.update = function () {

        $scope.$broadcast('show-errors-check-validity');
        if ($scope.UpdateForm.$invalid) {
            return;
        }

        var User = {
            Id: $scope.UserId,
            Nome: $scope.UserNome,
            Telefone: $scope.UserTelefone,
            Email: $scope.UserEmail
        }

        var atualizar = userService.update(User);
        atualizar.then(function (user) {
            if (user.data.success === true) {
                exibirUsers();
                alert("Usuário atualizado com sucesso");
                $scope.limparA();
            }
            else {
                alert("Usuário não atualizado");
            }
        },
            function () {
                alert("Error na atualização da lista de usuários");
            });

        $('#UpdateModal').modal('hide');
    }

    $scope.limparA = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.UserId = '';
        $scope.UserNome = '';
        $scope.UserTelefone = '';
        $scope.UserEmail = '';
    }

    $scope.delete = function (UserId) {
        var excluir = userService.delete($scope.UserId);
        excluir.then(function (user) {
            if (user.data.success) {
                exibirUsers();
                alert("Usuário deletado com sucesso");
                $scope.$broadcast('show-errors-reset');
            }
            else {
                alert("Usuário não deletado");
            }
        });
    }

});