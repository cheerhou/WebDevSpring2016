(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $routeParams, UserService) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.error = null;
        $scope.message = null;
        var userId = $routeParams.id;

        $scope.update = update;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            if (user) {
                console.log("user: " + userId + " " + user.username + " " + user.firstName);
                UserService
                    .updateUser($routeParams.id, user)
                    .then(function (respond) {
                        if (respond.data) {
                            $scope.message = "User updated successfully";
                            UserService.setCurrentUser($scope.currentUser);
                        } else {
                            $scope.error = "Fail to update.";
                        }
                    });


            } else {
                $scope.error = "Unable to update the user";
            }
        }
    }
})();