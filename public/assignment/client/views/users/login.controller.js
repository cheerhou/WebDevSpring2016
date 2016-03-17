(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.error = null;
        $scope.login = login;

        function login(user) {
            var aUser = UserService.findUserByCredentials(user.username, user.password);
            if(aUser != null) {
                UserService.setCurrentUser(aUser);
                $location.url("/profile");
            } else {
                $scope.error = "Please verify your user name or password."
            }
        }
    }

}) ();