const express = require('express');
const app=express();
const https=require("https");

const port=1337;
app.listen(port,()=>{
	console.log('live on port '+port);
});



app.get('/',function(req,res){
	res.send('Homepage here');
	var url="./test?param=abcde";
	https.get(url,res=>{
	  body=JSON.stringify(res);
	  console.log(body);
	});
});
	  

app.get('/test',(req,res)=>{
	var response=req.param;
	console.log(response);
	res.send(response);
});