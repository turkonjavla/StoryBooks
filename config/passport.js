const GoogleStrategy = require("passport-google-oauth20").Strategy,
      mongoose       = require("mongoose"),
      keys           = require("./keys");

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecet,
            callbackURL: "/auth/google/callback",
            proxy: true
        }, (accessToken, resfreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);
        })
    )
}