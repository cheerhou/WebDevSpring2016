var mongoose = require("mongoose");

module.exports = function () {

    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            role: String,
            email: String,
            phone: String,
            salary: {type: Number, default: 0},
            tips: {type: Number, default: 0},
            penalty: {type: Number, default: 0}
        }, {collection: 'project.user'}
    );

    return UserSchema;

};