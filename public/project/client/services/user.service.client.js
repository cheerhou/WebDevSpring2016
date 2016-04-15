(function () {
    angular
        .module("ResManageApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            findUserProfileByUsername: findUserProfileByUsername,
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };
        return api;


        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function findUserProfileByUsername(username) {
            return $http.get("/api/project/profile/" + username);
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(user) {
            return $http.put("/api/project/user/" + user._id, user);
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();