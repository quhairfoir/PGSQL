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

knex('famous_people')
  .insert({first_name: `${process.argv[2]}`, last_name: `${process.argv[3]}`, birthdate: `${process.argv[4]}`})
  .asCallback(function(err, result) {
    if (err) return console.error(err);
    console.log(`Success! ${process.argv[2]} ${process.argv[3]} added to database.`);
    knex.destroy();
  });