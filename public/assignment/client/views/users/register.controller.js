(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {
        $scope.error = null;
        $scope.message = null;
        $scope.register = register;


        function register(user) {
            if (user == null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.error = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.error = "Passwords must match";
                return;
            }


            UserService
                .createUser(user)
                .then(
                    function (response) {
                        if (response.data) {
                            console.log("response.data " + response.data);
                            $scope.message = "You have Registered successfully.";

                            var currentUser = response.data;
                            UserService.setCurrentUser(currentUser);
                            console.log("current user : " + currentUser._id + " " + currentUser.username);

                            $location.url("/profile");
                        } else {
                            $scope.error = "Register failed!";
                        }
                    }
                );

        }
    }

})();