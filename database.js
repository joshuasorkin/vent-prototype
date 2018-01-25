const {Client}=require('pg');
var abc;

const pgclient=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

pgclient.connect();
	
function getUser(phonenumber, callback){
	queryStr='SELECT * FROM users where phonenumber=\''+phonenumber+'\';';
	console.log("queryStr: "+queryStr);  
	abc.run().then(
		console.log("running abc")
	).catch(err=>console.error(err.stack));
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

module.exports.getUser=getUser;
module.exports.destruct=destruct;