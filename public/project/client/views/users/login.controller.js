(function () {
    angular
        .module("ResManageApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(user) {
            if (!user) {
                vm.error = "No user exist!"
                return;
            }
            UserService
                .findUserByCredentials({username: user.username, password: user.password})
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.user = respond.data;
                            UserService.setCurrentUser(respond.data);
                            $location.url("/profile/" + user.username);
                        }
                    }, function(err) {
                        vm.error = "Please verify your user name or password." + err;
                    }
                );

        }
    }

})();