const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
};

const querytext = "CREATE TABLE users(id SERIAL PRIMARY KEY, phonenumber VARCHAR(20), pin VARCHAR(20));" +
    "CREATE TABLE call(id SERIAL PRIMARY KEY, duration INTERVAL, starttime TIMESTAMP, endtime TIMESTAMP, " +
    "endcause VARCHAR(20), guestid VARCHAR(20), hostid VARCHAR(20), rating INT); " +
    "CREATE TABLE callendcause(id SERIAL PRIMARY KEY, cause VARCHAR(20)); " +
    "CREATE TABLE cancelcause(id SERIAL PRIMARY KEY, cause VARCHAR(20)); " +
    "CREATE TABLE hostinterval(id SERIAL PRIMARY KEY, hostid VARCHAR(20), scheduledstarttime TIMESTAMP," +
    "scheduledendtime TIMESTAMP, canceltime TIMESTAMP, cancelcause VARCHAR(20));";

const pool = new Pool(config);

pool.connect(function(err, client, done) {
    client.query(querytext);
    done();
});

pool.end();
