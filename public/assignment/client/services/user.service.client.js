(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;


        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);

        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/assignment/user/login", credentials);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }
})();