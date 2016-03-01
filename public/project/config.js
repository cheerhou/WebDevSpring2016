(function () {
    angular
        .module("ResManageApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/menu", {
                templateUrl: "views/menu/menu.view.html",
                controller: "MenuController"
            })
            .when("/order", {
                templateUrl: "views/order/order.view.html",
                controller: "OrderController"
            })
            .when("/reservation", {
                templateUrl: "views/reservation/reservation.view.html",
                controller: "ReservationController"
            })
            .when("/manager", {
                templateUrl: "views/manager/manager.view.html",
                controller: "ManagerController"
            })
            .when("/profile/:id", {
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
            .otherwise("/menu", {
                redirectTo: "/menu"
            })

    }
})();