(function () {
    angular
        .module("ResManageApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.closeError = closeError;
        vm.closeMessage = closeMessage;

        vm.register = register;

        function register(user) {
            if (user == null) {
                vm.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.error = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                vm.error = "Passwords must match";
                return;
            }

            //
            //UserService.createUser(user)
            //    .then(
            //        function (respond) {
            //            if (respond.data) {
            //                vm.user = respond.data;
            //                UserService.setCurrentUser(respond.data);
            //                $location.url("/profile/" + user.username);
            //            }
            //        },
            //        function (error) {
            //            vm.error = error;
            //        }
            //    );

            UserService
                .register(user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.user = respond.data;
                            UserService.setCurrentUser(respond.data);
                            $location.url("/profile/" + user.username);
                        }
                    },
                    function (error) {
                        vm.error = error;
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