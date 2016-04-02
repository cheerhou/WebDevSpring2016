(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.error = null;
        $scope.login = login;

        function login(user) {
            if(!user) {
                $scope.error = "No user exist!"
                return;
            }
            UserService
                .findUserByCredentials({username: user.username, password: user.password})
                .then(function(respond) {
                    if(respond.data) {
                        UserService.setCurrentUser(respond.data);
                        var currentUser = UserService.getCurrentUser();
                        $location.url("/profile?id=" + currentUser._id);
                    } else {
                        $scope.error = "Please verify your user name or password."
                    }
                });

        }
    }

}) ();