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
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            var user = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password
            }
            model.users.push(user);
            return user;
        }

        function findUserByUsername(username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in model.users) {
                if (model.users[u].username === username && model.users[u].password === password)
                    return model.users[u];
            }
            return null;
        }

        function findAllUsers() {
            return model.users;
        }

        function deleteUserById(userId) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
        }

        function updateUser(userId, user) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].username = user.username;
                    model.users[u].firstName = user.firstName;
                    model.users[u].lastName = user.lastName;
                    model.users[u].password = user.password;

                    return model.users[u];
                }
            }
            return null;
        }
    }
})();