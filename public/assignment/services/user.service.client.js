(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }
    }
})();