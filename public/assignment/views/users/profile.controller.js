(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $location, UserService) {
        $scope.error = null;
        $scope.message = null;
        $scope.id = $routeParams.id;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        function update(user) {
            UserService.updateUser($routeParams.id, user)

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

        console.log(UserService.findAllUsers());
    }
})();