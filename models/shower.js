var mongoose = require('mongoose')

// create a user model
var Shower = mongoose.model('Shower', {
    wristbandID: String,
    timeStamp: Date,
    duration: Number,
    volume: Number
});


module.exports = Shower;