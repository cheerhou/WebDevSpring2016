module.exports = function (app, db) {

    var userModel = require("./models/user/user.model.server.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var salaryModel = require("./models/salary/salary.model.server.js")(db);
    var salaryService = require("./services/salary.service.server.js")(app, salaryModel);

    var reservationModel = require("./models/reservation/reservation.model.server.js")(db);
    var reservationService = require("./services/reservation.service.server.js")(app, reservationModel);


    var orderModel = require("./models/order/order.model.server.js")(db);
    var orderService = require("./services/order.service.server.js")(app, orderModel);

    var dishModel = require("./models/dish/dish.model.server.js")(db);
    var menuModel = require("./models/menu/menu.model.server.js")(db);
    var menuService = require("./services/menu.service.server.js")(app, dishModel);
    var dishService = require("./services/dish.service.server.js")(app, dishModel);

    var searchService = require("./services/search.service.server.js")(app);


}