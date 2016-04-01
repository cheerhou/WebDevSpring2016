module.exports = function (mongoose) {

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            emails: [String],
            phones: [String]
        },
        {collection: 'user'}
    );

    return UserSchema;

};