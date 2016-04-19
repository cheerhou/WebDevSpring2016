module.exports = function(app, db) {
    //var userModel = require("./models/user/user.model.server.js")(db);
    //var userService = require("./services/user.service.server.js") (app, userModel);

    var formModel = require("./models/form/form.model.server.js")(db);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldModel = require("./models/field/field.model.server.js")(db, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel, formModel);
};