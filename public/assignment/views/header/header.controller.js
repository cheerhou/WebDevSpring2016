(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }

}) ();