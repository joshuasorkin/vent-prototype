
const {Pool,Client}=require('pg');

const client=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

/*
console.log("before connect");
pgclient.connect();
console.log("after connect");
*/

module.exports = {
	getUser:function(phonenumber){
		queryStr='SELECT * FROM users where phonenumber=\''+phonenumber+'\';';
		client.connect();
		client.query(queryStr,(err,res)=>{
			client.end();
			if (res.rows.length==0){
				return null;
			}
			else{
				return res.rows[0];
			}
		});
	}
	
}


/*
function getUser(phonenumber, callback){
	queryStr='SELECT * FROM users where phonenumber=\''+phonenumber+'\';';
	console.log("queryStr: "+queryStr);  
	pgclient.query(queryStr)
		.then(res => {
			console.log("query running");
			console.log("rows length "+res.rows.length);
			if (res.rows.length==0){
				return null;
			}
			else{
				return res.rows[0];
			}
		})
		.catch(err=>console.error(err.stack));
}			




function destruct(){
	pgclient.end();
}
*/

//module.exports.getUser=getUser;
//module.exports.destruct=destruct;