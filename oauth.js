var callBack;
if (process.env.ENVIRONMENT == 'deploy') {
	callBack = 'http://showersense.herokuapp.com/auth/facebook/callback'
} 
else {
	callBack = 'http://localhost:5000/auth/facebook/callback'
}

var ids = {
    facebook: {
        clientID: process.env.FACEBOOKCLIENT,
        clientSecret: process.env.FACEBOOKSECRET,
        callbackURL: callBack
}}
module.exports = ids