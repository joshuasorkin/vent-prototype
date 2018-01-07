const express = require('express');
const app=express();
const http=require("http");

const port=8080;
app.listen(port,()=>{
    console.log('live on port '+port);
});



app.get('/',function(req,res){
    res.send('Homepage here');
    var url="http://localhost:8080/test?param=abcde";
    var req = http.request(url,res=>{
      // comment out, because in my environment this causes error
      // body=JSON.stringify(res);
      // console.log(body);
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    req.end();
});


app.get('/test',(req,res)=>{
    console.log('route /test')
    var response=req.query.param;
    console.log(response);
    res.send(response);
});
