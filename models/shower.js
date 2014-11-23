var mongoose = require('mongoose')

// create a user model
var Shower = mongoose.model('Shower', {
    wristbandID: Number,
    timeStamp: Date,
    duration: Number,
    volume: Number
});


module.exports = Shower;