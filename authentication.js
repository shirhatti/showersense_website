var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/user.js')
var config = require('./oauth.js')

// config
module.exports = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
  User.findOne({ oauthID: profile.id }, function(err, user) {
    console.log("HERE");
    if(err) {
      console.log("Error");
      console.log(err);
    } else if (user != null) {
      console.log("user already exists ...");
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.save(function(err) {
        if(err) { 
          console.log(err); 
        } else {
          console.log("saving user ...");
          done(null, user);
        };
      });
      // done(null, user);
    } else {
      console.log("creating user ...");
      user = new User({
        oauthID: profile.id,
        name: profile.displayName,
        created: Date.now(),
        accessToken: accessToken,
        refreshToken: refreshToken,
        wristbandID: null

      });
      user.save(function(err) {
        if(err) { 
          console.log(err); 
        } else {
          console.log("saving user ...2");
          done(null, user);
        };
      });
    };
  });
}
));
