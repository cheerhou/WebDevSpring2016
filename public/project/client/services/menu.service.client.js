(function () {
    angular
        .module("ResManageApp")
        .factory("MenuService", MenuService);

    function MenuService($http) {
        var api = {
            findMenuByTitle: findMenuByTitle,
            findRecipeById: findRecipeById,
            addDishToMenu: addDishToMenu,
            findAllDishes: findAllDishes
        };
        return api;


        function findMenuByTitle(title) {
            return $http.get("/api/project/search/" + title);
        }

        function findRecipeById(rId) {
            return $http.get("/api/project/search/recipe/" + rId);
        }

        function addDishToMenu(dish) {
            return $http.post("/api/project/menu/dish", dish);
        }

        function findAllDishes() {
           return $http.get("/api/project/menu");
        }

    }
})();