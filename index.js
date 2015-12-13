require('dotenv').load()
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

var imgs = require('./images')

// Twilio Credentials
var accountSid = process.env.SID
var authToken = process.env.TOKEN

//require the Twilio module and create a REST client
var twilio = require('twilio')
var client = twilio(accountSid, authToken)

var webhook = twilio.webhook(process.env.TOKEN)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/status', function (req, res) {
  res.send('Hello World!');
})

function incomingRoute (req, res) {
    console.log(req.body)
    resp = new twilio.TwimlResponse()
    resp.say('Hey there!')
    res.type('text/xml')
    res.send(resp.toString())
}

app.post('/incoming', webhook, incomingRoute)
app.post('/incoming-fallback', webhook, incomingRoute)

app.get('/', function (req, res) {
  res.send('oldmoney!');
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});
// client.messages.create({
// 	to: process.env.TEST_NUMBER,
// 	from: process.env.TWILIO_NUMBER,
// 	body: "Look at me now!",
// 	mediaUrl: imgs.selfie1,
// }, function(err, message) {
//     if (err) return console.error(err)
//
// 	console.log(message.sid)
// })
