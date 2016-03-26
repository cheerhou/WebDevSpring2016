module.exports = function(app, db) {
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);

    var userService = require("./services/user.service.server.js") (app, userModel, db);
    var formService = require("./services/form.service.server.js")(app, formModel, db);
    var fieldService = require("./services/field.service.server.js")(app, formModel, db);
}