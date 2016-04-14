module.exports = function (app, dishModel) {
    app.post("/api/project/menu/dish", createDish);
    app.get("/api/project/menu", findAllDishes);
    app.put("/api/project/menu/dish/:id", updateDish);
    app.delete("/api/project/menu/dish/:id", deleteDish);

    function createDish(req, res) {
        var dish = req.body;
        dishModel.createDish(dish)
            .then(
                function (menu) {
                    res.json(menu);
                }, function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllDishes(req, res) {
        dishModel.findAllDishes()
            .then(
                function (dishes) {
                    res.json(dishes);
                }, function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateDish(req, res) {
        var dishId = req.params.id;
        var newDish = req.body;
        dishModel.upDateDish(dishId, newDish)
            .then(
                function (dishes) {
                    res.json(dishes);
                }, function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteDish(req, res) {
        var dishId = req.params.id;
        console.log("delete dish " + dishId);

        dishModel.deleteDish(dishId)
            .then(
                function (dishes) {
                    res.json(dishes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


}