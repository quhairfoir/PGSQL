const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let query = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query(`SELECT * FROM famous_people WHERE first_name = $1::text
    OR last_name = $1::text;`, [query], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found " + result.rows.length + " people with the name " + query + ":");
    for (let i = 0; i < result.rows.length; i++){
      console.log((i + 1) + ": " + result.rows[i].first_name + " " + result.rows[i].last_name + ", born '" + result.rows[i].birthdate.toString().slice(0, 15) + "'")
    }
    client.end();
  });
});