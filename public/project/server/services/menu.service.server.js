module.exports = function (app, dishModel) {
    app.post("/api/project/menu/dish", createDish);
    app.get("/api/project/menu", findAllDishes);

    function createDish(req, res) {
        var dish = req.body;
        dishModel.createDish(dish)
            .then(function (menu) {
                    res.json(menu);
                }, function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findAllDishes(req, res) {
        dishModel.findAllDishes()
            .then(function (dishes) {
                    res.json(dishes);
                }, function (err) {
                    res.status(400).send(err);
                }
            );

    }
}