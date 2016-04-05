module.exports = function (app, db) {

    //models
    var userModel = require("./models/user/user.model.js")(app);
    var salaryModel = require("./models/salary/salary.model.js")(app);
    var reservationModel = require("./models/reservation/reservation.model.js")(app);
    var orderModel = require("./models/order/order.model.js")(app);
    var menuModel = require("./models/menu/menu.model.js")(app);
    var dishModel = require("./models/dish/dish.model.js")(app);


    //services
    var userService = require("./services/user.service.server.js")(app, userModel, db);
    var salaryService = require("./services/salary.service.server.js")(app, salaryModel, db);
    var reservationService = require("./services/reservation.service.server.js")(app, reservationModel, db);
    var orderService = require("./services/order.service.server.js")(app, orderModel, db);
    var menuService = require("./services/menu.service.server.js")(app, dishModel, db);
    var dishService = require("./services/dish.service.server.js")(app, dishModel, db);
    var searchService = require("./services/search.service.server.js")(app);


}