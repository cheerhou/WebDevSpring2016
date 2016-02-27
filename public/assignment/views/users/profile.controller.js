(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, UserService) {
        $scope.id = $routeParams.id;
        //$scope.user = UserService.findUserById($routeParams.id);
    }
})();