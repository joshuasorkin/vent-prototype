const express = require('express');
const app=express();
const VoiceResponse=require('twilio').twiml.VoiceResponse;
//const MessagingResponse=require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const client=require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);


app.use(bodyParser.urlencoded({extended: false}));


const port=process.env.PORT;
app.listen(port,()=>{
	console.log('live on port '+port);
});



app.get('/',function(req,res){
	res.send('this is the mhomepage GET response');
});


app.post('/sms',(req,res)=>{
	var body=req.body.Body;
	var fromObj=req.body.From;
	var toObj=req.body.To;
	url='https://vent-prototype.herokuapp.com/getVoiceTwiml?textforspeech='+encodeURIComponent(body);
	console.log("url to send: "+url);
	client.calls.create({
		url:url,
		to: toObj,
		from: fromObj,
		method: 'GET'
	});
});

app.get('/getVoiceTwiml',(req,res)=>{
	const response=new VoiceResponse();
	response.say(req.textforspeech);
	responseTwiml=response.toString();
	console.log(responseTwiml);
	res.send(responseTwiml);
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