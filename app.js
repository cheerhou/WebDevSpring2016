module.exports = function(app, db, mongoose) {

    var assignmentUserModel = require("./public/assignment/server/models/user/user.model.server.js")(db);
    var projectUserModel = require("./public/project/server/models/user/user.model.server.js")(db);

    var securityServer = require("./public/security/security.js")(app, assignmentUserModel, projectUserModel);
};