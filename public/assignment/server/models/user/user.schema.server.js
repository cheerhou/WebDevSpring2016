module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            emails: [String],
            phones: [String],
            roles: {type: [String], default: ["user"]}
        }, {collection: 'user'}
    );

    return UserSchema;

};