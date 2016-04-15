module.exports = function(app, orderModel) {

    app.post("/api/project/order", createOrder);

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
}