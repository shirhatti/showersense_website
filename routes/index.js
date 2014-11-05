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

exports.stacked1 = function(req, res){
    res.render("stacked1");
};

exports.dashboard = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
      if(err) { 
        console.log(err);
      } else {
        res.render("dashboard", {user: userzz});
      }
    })
};

exports.invite = function(req, res){
	User.findById(req.session.passport.user, function(err, userzz) {
      if(err) { 
        console.log(err);
      } else {
        res.render("invite", {user: userzz});
      }
    })
};

exports.friends = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
      if(err) { 
        console.log(err);
      } else {
        res.render("friends", {user: userzz});
      }
    })
};