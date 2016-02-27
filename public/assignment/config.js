(function () {
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/profile:id", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/fileds", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .otherwise("/", {
                redirectTo: "/"
            })

    }
})();