//to remove from commit history for all files:
//-hardcoded phone number
//-hardcoded vent prototype url


const express = require('express');
const app=express();
const VoiceResponse=require('twilio').twiml.VoiceResponse;
//const MessagingResponse=require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const client=require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);
var db=require('./database');


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

app.get('/alpha',(req,res)=>{
	const response=new VoiceResponse();
	url=process.env.VENT_URL+"beta";
	
	gather=response.gather({
		action:url,
		method:'GET'
	});
	gather.say("This is alpha.  Now transferring to beta.  Press 1 to return to alpha, press 2 to exit.");
	response.say("We didn't receive input.  Goodbye!");
	sendResponse(response,res);
});

app.get('/beta',(req,res)=>{
	var digits=req.query.Digits;
	const response=new VoiceResponse();
	var url;
	
	switch(digits){
		case "1":
			url=process.env.VENT_URL+"alpha";
			response.say("Now transferring to alpha.")
			redirect=response.redirect({
				action:url,
				method:'GET'
			});
			break;
		case "2":
			response.say("Exiting per your request.");
			response.hangup();
			break;
		default:
			response.say("Invalid input.  Exiting.");
			response.hangup();
			break;
	}
	sendResponse(response,res);
		
});




app.post('/voice',(req,res)=>{
	console.log("reached voice endpoint");
	sid=req.body.CallSid;
	
	/*
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
	
	//todo: find more secure source of unique conference ID (maybe hash of sid)
	conferenceName=sid;
	params={'conferenceName':conferenceName};
	url=buildGetUrl(baseUrl,params);	
	var call=client.calls.create({
		url:url,
		to: '+15105753138',
		from: process.env.TWILIO_PHONE_NUMBER,
		method: 'GET'
	});
	
	
	const response = new VoiceResponse();
	response.say({
		voice: 'alice',
		language: 'en-AU'
	},"Thank you for calling Vent. Please wait while we find a host.");
	const dial = response.dial();
	dial.conference(sid);
	
	sendResponse(response,res);
	//twimlOutput=response.toString();
	//console.log(twimlOutput);
	//res.send(twimlOutput);
		
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
	sendResponse(response,res);
});



//used for handling host's response to being offered the choice to accept or reject a guest's Vent
app.get('/handleHostResponseToOfferedGuest',(req,res)=>{
	var digits=req.query.Digits;
	var conferenceName=req.query.conferenceName;
	const response=new VoiceResponse();
	if (digits=="1"){
		response.say("Thank you, now connecting you to guest.");
		dial=response.dial();
		dial.conference(conferenceName);
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
	sendResponse(response,res);
});

function sendResponse(response,res){
	responseTwiml=response.toString();
	console.log("responseTwiml: "+responseTwiml);
	res.send(responseTwiml);
}


app.post('/inboundHandler',(req,res)=>{
	inboundNumber=req.body.From;
	db.getUser(inboundNumber,function(user){
		if (user==null){
			db.addUser(inboundNumber,function()
		}
	});
	const response=new VoiceResponse();
	gather=response.gather({
		action:url,
		method:'GET'
	});
	gather.say("Welcome to Vent.  ")
});



app.get('/callHost',(req,res)=>{
	const response=new VoiceResponse();
	conferenceName=req.query.conferenceName;
	
	params={'conferenceName':conferenceName};
	
	baseUrl=process.env.VENT_URL+'handleHostResponseToOfferedGuest';
	url=buildGetUrl(baseUrl,params);
	
	gather=response.gather({
		action:url,
		method:'GET'
	});
	gather.say("You have a call from Vent.  Press 1 to accept, press any other key to refuse.");
	response.say("We didn't receive input.  Goodbye!");
	sendResponse(response,res);
});

