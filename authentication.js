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
      console.log(err);
    }
    if (!err && user != null) {
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
      done(null, user);
    } else {
      var user = new User({
        oauthID: profile.id,
        name: profile.displayName,
        created: Date.now(),
        accessToken: accessToken,
        refreshToken: refreshToken,
        wristbandId: null

      });
      user.save(function(err) {
        if(err) { 
          console.log(err); 
        } else {
          console.log("saving user ...");
          done(null, user);
        };
      });
    };
  });
}
));
