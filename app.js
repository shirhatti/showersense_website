// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var config = require('./oauth.js');
User = require('./models/user.js');
Shower = require('./models/shower.js');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./authentication.js');
var graph = require('fbgraph');

var fb_logged_in = false;
// connect to the database
mongoose.connect(process.env.MONGO_URI);

var app = express();


app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('User', User);
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'my_precious' }));
  app.use(passport.initialize());
  //app.use(express.logger());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// seralize and deseralize
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id)
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        //console.log(user);
        if(!err) done(null, user);
        else done(err, null);
    })
});

// routes
app.get('/', routes.index);
app.get('/dashboard', routes.dashboard);
app.get('/account', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if(err) { 
      console.log(err); 
    } else {
      res.render('account', { user: user});
    }
  })
});


app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),

  function(req, res, user) {
    User.findOne(req.session.passport.user, function(err, user) {
      if(err) { 
        console.log(err);
      }
      res.redirect('/dashboard');
    });
  }
);

app.get('/logout', function(req, res){
  req.logout();
  fb_logged_in = false;
  res.redirect('/');
});

app.get('/api/friends', function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) {
      res.send('Unauthorized', 401);
      console.log(err); 
    } else {
      graph.setAccessToken(userzz.accessToken);
      fb_logged_in = true;
      query = 'SELECT uid,username,name, is_app_user FROM user WHERE uid IN(SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user=1'
      graph.fql(query, function(err, res2) {
        res.send(res2);
      });
    }
  });
});

app.get('/api/wristband', function(req,res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if (err) {
      //TODO: provide error message
      console.log(err);
      res.send('Unauthorized', 401);
    } 
    if ( !err && userzz != null ){
      res.json({wristbandID: userzz.wristbandID});
    } else {
    console.log(err);
    res.send('Unauthorized', 401);
    }

  });
});

app.get('/api/me', function(req,res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if (err) {
      //TODO: provide error message
      console.log(err);
      res.send('Unauthorized', 401);
    } 
    if ( !err && userzz != null ){

      Shower.find({wristbandID: 1})
        // .where('wristbandID').equals(1)
        .sort('-date')
        .select('wristbandID date')
        .limit(10)
        .exec(function (err, showers) {
            console.log(showers);
        });

      res.json({user: userzz});
    } else {
    console.log(err);
    res.send('Unauthorized', 401);
    }

  });
});

app.post('/api/wristband', function(req, res){
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
    if (!err && userzz!= null) {
      console.log(req.body.wristbandID);
      if (req.body.wristbandID != null) {
        userzz.wristbandID = req.body.wristbandID;
        userzz.save(function(err) {
          if(err) { 
            console.log(err); 
          } else {
            console.log("saving user ...");
          };
        });
        res.redirect('/dashboard');
      }
      else {
        res.send("Request badly formed", 400);
      }
    } else {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
  });
  
});

app.get('/api/shower/month', function(req, res) {
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
    if (!err && userzz!= null) {
      var today = new Date();
      var lastMonth = new Date();
      lastMonth.setDate(today.getDate() - 30);

      Shower.aggregate([
          { $match: { wristbandID: parseInt(userzz.wristbandID) , date: { $gte: lastMonth, $lt: today} }},
          { $group: {
              _id : { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
              total: { $sum: "$waterConsumed" },
              duration: { $sum: "$duration" },
              count: { $sum: 1}
          }},
          { $sort: { _id: 1 }}//,
          // { $limit: 30 }

        ], function (err, showers) {
        if (err) {
          console.error(err);
          return;
        }
        res.send(showers);
      });
    } else {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
  })
})

app.get('/api/shower/week', function(req, res) {
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
    if (!err && userzz!= null) {
      var today = new Date();
      var lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      Shower.aggregate([
          { $match: { wristbandID: parseInt(userzz.wristbandID) , date: { $gte: lastWeek, $lt: today} }},
          { $group: {
              _id : { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
              total: { $sum: "$waterConsumed" },
              duration: { $sum: "$duration" },
              count: { $sum: 1}
          }},
          { $sort: { _id: 1 }}//,
          // { $limit: 30 }

        ], function (err, showers) {
        if (err) {
          console.error(err);
          return;
        }
        res.send(showers);
      });
    } else {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
  })
})

app.get('/api/shower/friends/week', function(req, res) {
  User.findById(req.session.passport.user, function(err, userzz) {
    if(err) {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
    if (!err && userzz!= null) {
      var today = new Date();
      var lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      graph.setAccessToken(userzz.accessToken);
      fb_logged_in = true;
      query = 'SELECT uid,username,name, is_app_user FROM user WHERE uid IN(SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user=1'
      graph.fql(query, function(err, res2) {
        var list_uid = [];
        for (var index in res2.data) {
          list_uid.push(parseInt(res2.data[index].uid));
        }
        var list_wristband = []
        var map = new Array();
        User.find({ oauthID: {$in: list_uid}}, function (err, friends) {
          for (var index in friends) {
            var temp = parseInt(friends[index].wristbandID);
            if (!isNaN(temp)){
              map[friends[index].wristbandID] = friends[index].name;
              list_wristband.push(temp);
            }
          }
          map[parseInt(userzz.wristbandID)] = userzz.name;
          list_wristband.push(parseInt(userzz.wristbandID));
          Shower.aggregate([
              { $match: { wristbandID: {$in: list_wristband} , date: { $gte: lastWeek, $lt: today} }},
              { $group: {
                  _id : { wristbandID: "$wristbandID" },
                  total: { $sum: "$waterConsumed" },
                  duration: { $sum: "$duration" },
                  count: { $sum: 1}
              }},
              { $sort: { _id: -1 }}//,
              // { $limit: 30 }

            ], function (err, showers) {
            if (err) {
              console.error(err);
              return;
            }
            for (index in showers) {
              showers[index]._id = map[showers[index]._id.wristbandID];
              showers[index].average = showers[index].total / showers[index].count;
            }
            res.send(showers);
          });
        });

      });


    } else {
      res.send("Unauthorized", 401);
      console.log(err); 
    }
  })
})

// app.post('/api/shower', function(req, res){
//   console.log(req.query.wristband+" "+req.query.duration+" "+req.query.volume);
//   var shower = new Shower({
//     wristbandID: req.query.wristband,
//     duration: req.query.duration,
//     timeStamp: Date.now(),
//     volume: req.query.volume,
//   });
//   res.send(200);
//   shower.save(function(err) {
//     if(err) { 
//       console.log(err); 
//     } else {
//       console.log('saving shower ...');
//     };
//   });~~
// });

// port
app.listen(process.env.PORT || 5000);


// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
