var path = require("path");

exports.index = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) { 
      console.log(err);
    } else {
      res.render("index", {user: userzz});
    }
  })
};

exports.dashboard = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
      if(err) { 
        console.log(err);
      } else if(userzz == null) {
        res.redirect("/");
      }else {
        res.render("dashboard", {user: userzz});
      }
    })
};