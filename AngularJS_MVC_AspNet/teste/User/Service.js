myapp.service('userService', function ($http) {

    this.getAllUsers = function () {
        return $http.get('/User/GetUser');
    }

    this.create = function (User) {
        var request = $http({
            method: 'post',
            url: '/User/Create',
            data: User
        });
        return request;
    }

    this.update = function (User) {
        var request = $http({
            method: 'post',
            url: '/User/Update',
            data: User
        });
        return request;
    }

    this.delete = function (UserId) {
        return $http.post('/User/Delete/' + UserId);
    }

});