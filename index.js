require('dotenv').load()
var imgs = require('./images')

// Twilio Credentials
var accountSid = process.env.SID
var authToken = process.env.TOKEN

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken)

client.messages.create({
	to: process.env.TEST_NUMBER,
	from: process.env.TWILIO_NUMBER,
	body: "Look at me now!",
	mediaUrl: imgs.selfie1,
}, function(err, message) {
    if (err) return console.error(err)

	console.log(message.sid)
})
