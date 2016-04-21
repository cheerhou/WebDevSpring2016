(function () {
    angular
        .module("ResManageApp")
        .controller("ManagerController", ManagerController)
        .controller("ManagerSalaryController", ManagerSalaryController);

    function ManagerController(UserService) {
        var vm = this;

        vm.closeError = closeError;
        vm.closeMessage = closeMessage;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        function init() {
            UserService.findAllUsers()
                .then(function (respond) {
                        vm.users = respond.data;
                    }
                );
        }

        init();

        function closeError() {
            vm.error = null;
        }

        function closeMessage() {
            vm.message = null;
        }

        function updateUser(user) {
            if (!user.username) {
                vm.error = "Please enter the username.";
                return;
            }
            if (!user.role) {
                vm.error = "Please select a user role.";
                return;
            }

            //set salary for different roles
            user.salary = UserService.getSalaryByRole(user.role);
            console.log("salary " +  user.salary);

            UserService.updateUser(user._id, user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User updated successfully.";
                            vm.user = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = "Fail to update a new user. " + err;
                    }
                );

        }

        function addUser(user) {
            if (!user.username) {
                vm.error = "Please enter the username.";
                return;
            }
            if (!user.role) {
                vm.error = "Please select a  user role.";
                return;
            }

            user.salary = UserService.getSalaryByRole(user.role);

            UserService.createUser(user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User created successfully.";
                            vm.user = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = "Fail to create a new user. " + err;

                    }
                );
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "User deleted successfully.";
                            init();
                        }
                    },
                    function (err) {
                        vm.error = "Fail to delete user. " + err;
                    }
                );
        }

        function selectUser(user) {
            vm.user = user;
        }

    }

    function ManagerSalaryController(UserService) {
        var vm = this;
        vm.updateSalary = updateSalary;
        vm.selectUser = selectUser;


        function init() {
            UserService.findAllUsers()
                .then(function (respond) {
                        vm.users = respond.data;
                    }
                );
        }

        init();

        function updateSalary(user) {
            var baseSalary = UserService.getSalaryByRole(user.role);
            user.salary = baseSalary + Number(user.tips - user.penalty);

            UserService.updateUser(user._id, user)
                .then(
                    function (respond) {
                        if (respond.data) {
                            vm.message = "Salary updated successfully.";
                            vm.user = null;
                            init();
                        }
                    }, function (err) {
                        vm.error = "Fail to update salary. " + err;
                    }
                );
        }

        function selectUser(user) {
            vm.user = user;
        }

    }

})();