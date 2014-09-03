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

exports.dashboardToday = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
      if(err) { 
        console.log(err);
      } else {
        res.render("dashboardToday", {user: userzz});
      }
    })
};

exports.dashboardYesterday = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) { 
      console.log(err);
    } else {
      res.render("dashboardYesterday", {user: userzz});
    }
  })
};

exports.dashboardWeek = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) { 
      console.log(err);
    } else {
      res.render("dashboardWeek", {user: userzz});
    }
  })
};

exports.dashboardMonth = function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) { 
      console.log(err);
    } else {
      res.render("dashboardMonth", {user: userzz});
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