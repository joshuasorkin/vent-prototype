const {Client}=require('pg');

const client=new Client({
	connectionString:process.env.DATABASE_URL,
	ssl:true
});

client.connect();
client.query("insert into users phonenumber values ('+15105753138');");

client.query('SELECT phonenumber FROM users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});