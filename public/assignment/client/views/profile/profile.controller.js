(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $location, $routeParams, UserService) {
        var vm = this;
        //var userId = $routeParams.id;
        //console.log("userId " + userId);

        vm.update = update;

        function init () {
            UserService.getProfile()
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
                        if(response.data) {
                            vm.message = "update successfully"
                        }

                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
    }
})();