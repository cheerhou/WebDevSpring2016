(function () {
    angular
        .module("ResManageApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            login: login,
            logout: logout,
            register: register,
            //findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserProfileByUsername: findUserProfileByUsername,
            getSalaryByRole: getSalaryByRole
        };
        return api;


        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);

        }

        //function findUserByCredentials(credentials) {
        //    return $http.post("/api/project/user/login", credentials);
        //}

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function findUserProfileByUsername(username) {
            return $http.get("/api/project/profile/" + username);
        }

        function getSalaryByRole(role) {
            //set salary for different roles
            if (role == "Waiter") {
                return 2500;
            }
            if (role == "Receptionist") {
                return 3000;
            }
            if (role == "Cook") {
                return 4000;
            }
            if (role == "Deliveryman") {
                return 2000;
            }
        }
    }
})();