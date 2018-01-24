const {Client}=require('pg');

const pgclient=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

pgclient.connect();

module.exports={
	
	getUser:function(phonenumber){
		queryStr='SELECT * FROM users where phonenumber=\''+phonenumber+'\';';
		console.log(queryStr);
		pgclient.query(queryStr, (err, res) => {
			console.log("rows length "+res.rows.length);
			if (err) throw err;
			if (res.rows.length==0){
				return null;
			}
			else{
				return res.rows[0];
			}			
		});
	},
	
	destruct:function(){
		pgclient.end();
	}
}