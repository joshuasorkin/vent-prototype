const express = require('express');
const app=express();
const VoiceResponse=require('twilio').twiml.VoiceResponse;
//const MessagingResponse=require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const client=require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

require('build-schema.js');

var https=require("https");

app.use(bodyParser.urlencoded({extended: false}));

const port=process.env.PORT;
app.listen(port,()=>{
	console.log('live on port '+port);
});

app.get('/',function(req,res){
	res.send('this is the homepage GET response');
	var url=textforspeechURL("abcde");
	https.get(url,res=>{
	  res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    //res.end();
});
	  
function textforspeechURL(textforspeech){
	return process.env.VENT_URL+"getVoiceTwiml?textforspeech="+encodeURIComponent(textforspeech);
}		

		

app.post('/voice',(req,res)=>{
	console.log("reached voice endpoint");
	url=process.env.VENT_URL+"callHost";
	const response=new VoiceResponse();
	
	var call=client.calls.create({
		url:url,
		to: '+15105753138',
		from: process.env.TWILIO_PHONE_NUMBER,
		method: 'GET'
	});
	
	console.log("call SID: "+call.sid);
	
});


/*
app.post('/voice', (req, res) => {
  // Use the Twilio Node.js SDK to build an XML response
  const response = new VoiceResponse();
  response.say('hello world!');

  // Render the response as XML in reply to the webhook request
  //res.type('text/xml');
  responseTwiml=response.toString();
  res.send(responseTwiml);
});
*/
		
app.post('/sms',(req,res)=>{
	var body=req.body.Body;
	var fromObj=req.body.From;
	var toObj=req.body.To;
	url=textforspeechURL(body);
	console.log("url to send: "+url);
	client.calls.create({
		url:url,
		to: fromObj,
		from: process.env.TWILIO_PHONE_NUMBER,
		method: 'GET'
	});
});

app.get('/getVoiceTwiml',(req,res)=>{
	const response=new VoiceResponse();
	response.say(req.query.textforspeech);
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
});


app.get('/callHost',(req,res)=>{
	const response=new VoiceResponse();
	gather=response.gather();
	gather.say("You have a call from Vent.  Press 1 to accept, press any other key to refuse.");
	response.say("We didn't receive input.  Goodbye!");
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
});

/*



client.messages.create({
	from: process.env.TWILIO_PHONE_NUMBER,
	to: process.env.CELL_PHONE_NUMBER,
	body: "evac has started!  you have twenty minutes until reset."
	
}).then((message) => console.log(message.sid));
*/