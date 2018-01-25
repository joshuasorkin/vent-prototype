const {Client}=require('pg');

const pgclient=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

pgclient.connect();

module.exports={
	
	getUser:function(phonenumber, callback){
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
				})
			.catch(err=>console.error(err.stack);
    },
	
	destruct:function(){
		pgclient.end();
	}
}