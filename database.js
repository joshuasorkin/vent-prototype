/*
const {Client}=require('pg');

const pgclient=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

console.log("before connect");
pgclient.connect();
console.log("after connect");
*/

const query=require('pg-query');
query.connectionParameters=process.env.DATABASE_URL;


function getUser(phonenumber,callback){
	queryStr='SELECT * FROM users where phonenumber=\''+phonenumber+'\';';
	query.first(queryStr,callback);
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

module.exports.getUser=getUser;
module.exports.destruct=destruct;