(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        var username = $routeParams.username;

        vm.update = update;

        function init() {
            //get current user profile by username
            UserService.findUserProfileByUsername(username)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
        init();

        function update(user) {
            UserService.updateUser(user)
                .then(
                    function (response) {
                        if (response.data) {
                            vm.message = "update successfully"
                            init();
                        }

                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
    }
})();