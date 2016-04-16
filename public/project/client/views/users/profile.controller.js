(function () {
    angular
        .module("ResManageApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            //get current user profile by username
            var username = $routeParams.username;
            console.log("profile username " + username);

            UserService.findUserProfileByUsername(username)
                .then(
                    function (response) {
                        console.log("findUserProfileByUsername");
                        vm.user = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        init();

        function update(user) {
            UserService.updateUser(user._id, user)
                .then(
                    function (response) {
                        if (response.data) {
                            vm.message = "update successfully"
                            init();
                        }

                    },
                    function (error) {
                        vm.error = "fail to update profile. " + error;
                    }
                );
        }
    }

})();