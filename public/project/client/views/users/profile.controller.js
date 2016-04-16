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

            UserService.findUserProfileByUsername(username)
                .then(
                    function (response) {
                        vm.user = response.data;
                        //console.log("user id "+ vm.user._id);
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