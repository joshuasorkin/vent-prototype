const Client=require('pg');

const client=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

client.connect();
queryArray={
	"CREATE TABLE users(id SERIAL PRIMARY KEY, phonenumber VARCHAR(20), pin VARCHAR(20));",
    "CREATE TABLE call(id SERIAL PRIMARY KEY, duration INTERVAL, starttime TIMESTAMP, endtime TIMESTAMP, " +
    "endcause VARCHAR(20), guestid VARCHAR(20), hostid VARCHAR(20), rating INT); ",
    "CREATE TABLE callendcause(id SERIAL PRIMARY KEY, cause VARCHAR(20)); ",
    "CREATE TABLE cancelcause(id SERIAL PRIMARY KEY, cause VARCHAR(20)); ",
    "CREATE TABLE hostinterval(id SERIAL PRIMARY KEY, hostid VARCHAR(20), scheduledstarttime TIMESTAMP," +
    "scheduledendtime TIMESTAMP, canceltime TIMESTAMP, cancelcause VARCHAR(20));"
}
queryArray.forEach(function(str){
	clientQuery(str);
});



function clientQuery(queryString){
	client.query(queryString, (err, res) => {
		if (err) throw err;
		client.end();
	});
}