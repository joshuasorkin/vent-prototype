const {Client}=require('pg');

const pgclient=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

pgclient.connect();

module.exports={
	
	getUser:function(phonenumber, callback){
        queryStr='SELECT * FROM users where phonenumber=\''+phonenumber+'\';';
        console.log(queryStr);
        pgclient.query(queryStr, (err, res) => {
            console.log("rows length "+res.rows.length);
            if (err) return callback(err);
            if (res.rows.length==0){
                return callback(null, null);
            }
            else{
                return callback(null, res.rows[0]);
            }           
        });
    },
	
	destruct:function(){
		pgclient.end();
	}
}