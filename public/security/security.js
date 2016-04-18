var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel, developerModel) {

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), ideLogin);
    app.post  ('/api/assignment/logout',   ideLogout);
    app.get   ('/api/assignment/loggedin', ideLoggedin);
    app.post  ('/api/assignment/register', ideRegister);

    app.post  ('/api/project/login',    passport.authenticate('project'), storeLogin);
    app.post  ('/api/project/logout',   logout);
    app.get   ('/api/project/loggedin', loggedin);
    app.post  ('/api/project/register', register);

    function assignmentLocalStrategy(username, password, done) {
        developerModel
            .findDeveloperByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function projectLocalStrategy(username, password, done) {
        userModel
            .findByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type == 'developer') {
            developerModel
                .findDeveloperById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'store') {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }
};