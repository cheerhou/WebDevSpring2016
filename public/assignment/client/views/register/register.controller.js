(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location, $rootScope) {
        var vm = this;

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


            UserService
                .register(user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.user = respond.data;
                            $location.url("/profile/" + user.username);
                        }
                    },
                    function (error) {
                        vm.error = error;
                    }
                );

        }
    }

})();