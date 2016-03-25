module.exports = function(app, db) {

    //models
    var userModel    = require("./models/user.model.js")(app);
    var salaryModel    = require("./models/salary.model.js")(app);
    var reservationModel    = require("./models/reservation.model.js")(app);
    var orderModel    = require("./models/order.model.js")(app);
    var menuModel    = require("./models/menu.model.js")(app);
    var dishModel    = require("./models/dish.model.js")(app);


    //services
    var userService = require("./services/user.service.server.js") (app, userModel, db);
    


}