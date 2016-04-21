(function () {
    angular
        .module("ResManageApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        vm.closeError = closeError;
        vm.closeMessage = closeMessage;

        function login(user) {
            if (!user) {
                vm.error = "No user exist!";
                return;
            }
            UserService.login(user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            //UserService.setCurrentUser(respond.data);
                            $location.url("/profile/" + user.username);
                        }
                    }, function (err) {
                        vm.error = "Please verify your user name or password.";
                    }
                );

        }

        function closeError() {
            vm.error = null;
        }

        function closeMessage() {
            vm.message = null;
        }
    }

})();