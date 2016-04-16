module.exports = function (app, orderModel) {

    app.post("/api/project/order", createOrder);
    app.get("/api/project/order/:userId", findOrdersByUser);

    function createOrder(req, res) {
        var order = req.body;

        orderModel.createOrderForUser(order)
            .then(
                function (order) {
                    res.json(order);
                }, function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findOrdersByUser(req, res) {
        var userId = req.params.userId;
        console.log("userId " + userId);
        orderModel.findOrdersByUser(userId)
            .then(
                function (orders) {
                    //console.log("server side " + orders);
                    res.json(orders);

                }, function (err) {
                    res.status(400).send(err);

                }
            );
    }


}