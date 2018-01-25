const {Client}=require('pg');

const pgclient=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

pgclient.connect();
	
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

getUser('+19991112222', function(err, user) {
    if (err) throw err;
    if (user==null){
        console.log("user not found");
    }
    else {
        console.log(user["phonenumber"]);
    }
});








var db=require('./database');

db.getUser('+19991112222', function(err, user) {
    if (err) throw err;
    if (user==null){
        console.log("user not found");
    }
    else {
        console.log(user["phonenumber"]);
    }
});


testGetUser('+15105753138');
testGetUser('+12348290823');
db.destruct();

function testGetUser(phonenumber){
	db.getUser(phonenumber,function(err,user){
		if (err) throw err;
		if (user==null){
			console.log("user not found");
		}
		else{
			console.log(user["phonenumber"]);
		}
	});
}

/*
const {Client}=require('pg');

const client=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

client.connect();
client.query("insert into users (phonenumber) values ('+19991112222');");

client.query('SELECT phonenumber FROM users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/