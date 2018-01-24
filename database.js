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
		pgclient.query('SELECT * FROM users where phonenumber=\''+phonenumber+'\';', (err, res) => {
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