const express = require('express')
const MessagingResponse=require('twilio').twiml.MessagingResponse;
const app=express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false});



app.post('/sms',(req,res)=>{
	console.log(req.body);
	response.send("<Response><Message>Testing SMS twiml</Message></Response>");
	
	
	
	//const twiml=new MessagingResponse();
	
	//twiml.message('A Vent user desires to communicate.');
	
	//res.writeHead(200,{'Content-Type': 'text/xml'});
	//res.end(twiml.toString());
});

/*
var client=require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);



client.messages.create({
	from: process.env.TWILIO_PHONE_NUMBER,
	to: process.env.CELL_PHONE_NUMBER,
	body: "evac has started!  you have twenty minutes until reset."
	
}).then((message) => console.log(message.sid));
*/