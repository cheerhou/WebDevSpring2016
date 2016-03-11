(function() {
    angular
        .module("ResManageApp")
        .controller("MenuSearchController", MenuSearchController);

    function MenuSearchController($scope, $location, $routeParams, MenuService) {
        $scope.search = search;
        $scope.title = $routeParams.title;

        if($scope.title) {
            search($scope.title);

            console.log($scope.title);
        }

        function search(title) {
            $location.url("/search?title="+$scope.title);

            MenuService.findMenuByTitle(
                title,
                function(response){
                    console.log(response);
                    $scope.data = response.recipes;
                });
        }


    }

}) ();