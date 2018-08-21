const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select().from('famous_people')
.where('first_name', `${process.argv[2]}`)
.orWhere('last_name', `${process.argv[2]}`)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log("Found " + rows.length + " people with the name " + process.argv[2] + ":");
  for (let i = 0; i < rows.length; i++){
    console.log((i + 1) + ": " + rows[i].first_name + " " + rows[i].last_name + ", born '" + rows[i].birthdate.toString().slice(0, 15) + "'")
  }
  knex.destroy();
});