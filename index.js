const express = require('express');
const app=express();
const VoiceResponse=require('twilio').twiml.VoiceResponse;
//const MessagingResponse=require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));


const port=process.env.PORT;
app.listen(port,()=>{
	console.log('live on port '+port);
});



app.get('/',function(req,res){
	res.send('this is the main homepage GET response');
});


app.post('/sms',(req,res)=>{
	console.log("request body: \n"+req.body.Body);
	console.log("from: "+req.body.From);
	const response=new VoiceResponse();
	
	res.send("<Response><Message>Testing SMS twiml</Message></Response>");
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