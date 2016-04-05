module.exports = function (app, db) {

    var userModel = require("./models/user/user.model.server.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var salaryModel = require("./models/salary/salary.model.js")(db);
    var salaryService = require("./services/salary.service.server.js")(app, salaryModel);

    var reservationModel = require("./models/reservation/reservation.model.js")(db);
    var reservationService = require("./services/reservation.service.server.js")(app, reservationModel);


    var orderModel = require("./models/order/order.model.js")(db);
    var orderService = require("./services/order.service.server.js")(app, orderModel);


    var menuModel = require("./models/menu/menu.model.js")(db);
    var menuService = require("./services/menu.service.server.js")(app, dishModel);

    var dishModel = require("./models/dish/dish.model.js")(db);
    var dishService = require("./services/dish.service.server.js")(app, dishModel);

    var searchService = require("./services/search.service.server.js")(app);


}