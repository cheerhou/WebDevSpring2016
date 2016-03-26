(function () {
    angular
        .module("ResManageApp")
        .factory("MenuService", MenuService);

    function MenuService($http) {
        var API_URL = "http://food2fork.com/api/";
        var API_KEY = "cc8d030ba4ca67ba101401778e70163e";

        var api = {
            findMenuByTitle: findMenuByTitle,
            findRecipeById: findRecipeById,
            addDishToMenu: addDishToMenu,
            findAllDishes: findAllDishes
        };
        return api;


        function findMenuByTitle(title, callback) {
            $http.get(API_URL + "search?" + "key=" + API_KEY + "&q=" + title)
                .success(callback);
        }

        function findRecipeById(rId, callback) {
            $http.get(API_URL + "get?" + "key=" + API_KEY + "&rId=" + rId)
                .success(callback);
        }

        function addDishToMenu(dish) {
            return $http.post("/api/project/menu/dish", dish);
        }

        function findAllDishes() {
           return $http.get("/api/project/menu");
        }

    }
})();