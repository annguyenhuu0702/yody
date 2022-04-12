const passport = require("passport");
const passportFacebook = require("passport-facebook");
const passportGoogle = require("passport-google-oauth20");
require("dotenv").config();
passport.use(
  new passportFacebook.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/v1/api/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "first_name",
        "last_name",
        "picture",
        "gender",
        "emails",
        "birthday",
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);
passport.use(
  new passportGoogle.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/v1/api/auth/google/callback",
      profileFields: [
        "id",
        "displayName",
        "first_name",
        "last_name",
        "picture",
        "gender",
        "emails",
        "birthday",
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
