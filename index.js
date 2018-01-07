const express = require('express');
const app=express();
//const MessagingResponse=require('twilio').twiml.MessagingResponse;
//const bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({extended: false}));

/*
const port=8000;
app.listen(port,()=>{
	console.log('live on port '+port);
});
*/



app.get('/',function(req,res){
	console.log("got here at least");
	res.send('this is the main homepage GET response');
});

/*
app.post('/sms',(req,res)=>{
	console.log(req.body);
	response.send("<Response><Message>Testing SMS twiml</Message></Response>");
});
*/

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