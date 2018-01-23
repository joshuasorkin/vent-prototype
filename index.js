const express = require('express');
const app=express();
const VoiceResponse=require('twilio').twiml.VoiceResponse;
//const MessagingResponse=require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const client=require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

//require('build-schema.js');

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

//creates a url from an array of key-value pairs
function buildGetUrl(baseUrl,paramArray){
	url=baseUrl+"?";
	Object.keys(paramArray).forEach(function(key){
		url+=key+"="+encodeURIComponent(paramArray[key])+"&";
	});
	url=url.slice(0,-1);
	return url;
	
}		

app.post('/voice',(req,res)=>{
	console.log("reached voice endpoint");
	
	
	
	
	/*
	sid=req.body.CallSid;
	conferenceName="test conference room";
	params={'conferenceName':conferenceName};
	url=buildGetUrl(process.env.VENT_URL+'addToConference',params);
	console.log("url: "+url);
	console.log('now updating inbound call sid '+sid);
	client.calls(sid).update({
		url:url,
		method:'GET'
	});
	*/
	
	
	
	baseUrl=process.env.VENT_URL+"callHost";
	url=buildGetUrl(baseUrl,params);	
	var call=client.calls.create({
		url:url,
		to: '+15105753138',
		from: process.env.TWILIO_PHONE_NUMBER,
		method: 'GET'
	});
	
	
	const response = new VoiceResponse();
	const dial = response.dial();
	dial.conference('Room 1234');
	twimlOutput=response.toString();
	console.log(twimlOutput);
	res.send(twimlOutput);
		
});

		
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



//used for handling host's response to being offered the choice to accept or reject a guest's Vent
app.get('/handleHostResponseToOfferedGuest',(req,res)=>{
	var digits=req.query.Digits;
	var inboundSid=req.query.inboundSid;
	var outboundSid=req.query.outboundSid;
	const response=new VoiceResponse();
	if (digits=="1"){
		response.say("Thank you, now connecting you to guest.");
		dial=response.dial();
		dial.conference('Room 1234');
	}
	else{
		response.say("You didn't press 1.");
	}
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
});

app.get('/addToConferencePOST',(req,res)=>{
	console.log("reached addToConferencePOST");
	const response=new VoiceResponse();
	response.say("Now connecting you to conference test");
	dial=response.dial();
	dial.conference("test");
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
});



app.get('/addToConference',(req,res)=>{
	console.log("reached addToConference");
	var conferenceName=req.query.conferenceName;
	const response=new VoiceResponse();
	response.say("Now connecting you to conference "+conferenceName);
	dial=response.dial();
	dial.conference(conferenceName);
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
});

app.get('/callHost',(req,res)=>{
	const response=new VoiceResponse();
	inboundSid=req.query.inboundSid;
	outboundSid=req.query.CallSid;
	console.log("outbound sid: "+outboundSid);
	params={'inboundSid':inboundSid,
			'outboundSid':outboundSid};
	
	baseUrl=process.env.VENT_URL+'/handleHostResponseToOfferedGuest';
	url=buildGetUrl(baseUrl,params);
	
	gather=response.gather({
		action:url,
		method:'GET'
	});
	gather.say("You have a call from Vent.  Press 1 to accept, press any other key to refuse.");
	response.say("We didn't receive input.  Goodbye!");
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
});

