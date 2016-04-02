(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.username;

        vm.update = update;


        function init () {
            UserService.findUserByUsername(username)
                .then (
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
                        $location.url("/profile");
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }

        //$scope.currentUser = UserService.getCurrentUser();
        //$scope.error = null;
        //$scope.message = null;
        //$scope.update = update;

        //
        //if (!$scope.currentUser) {
        //    $location.url("/home");
        //}
        //
        //function update(user) {
        //    if (user) {
        //        console.log("user: " + userId + " " + user.username + " " + user.firstName);
        //        UserService
        //            .updateUser($routeParams.id, user)
        //            .then(function (respond) {
        //                if (respond.data) {
        //                    $scope.message = "User updated successfully";
        //                    UserService.setCurrentUser($scope.currentUser);
        //                } else {
        //                    $scope.error = "Fail to update.";
        //                }
        //            });
        //
        //
        //    } else {
        //        $scope.error = "Unable to update the user";
        //    }
        //}
    }
})();