module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js") (app, userModel);

    var formModel = require("./models/form/form.model.server.js")(db, mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldModel = require("./models/field/field.model.server.js")(db, mongoose, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel, formModel);
};