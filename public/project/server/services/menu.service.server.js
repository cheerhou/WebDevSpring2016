module.exports = function(app, dishModel) {
    app.post("/api/project/menu/dish", createDish);
    app.get("/api/project/menu", findAllDishes);

    function createDish(req, res) {
        var dish = req.body;
        var menu = dishModel.createDish(dish);
        res.json(menu);
    }

    function findAllDishes(req, res) {
        var dishes = dishModel.findAllDishes();
        res.json(dishes);
    }
}