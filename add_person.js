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

// knex.select().from('famous_people')
// .asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   console.log("Found " + rows.length + " people:");
//   for (let i = 0; i < rows.length; i++){
//     console.log((i + 1) + ": " + rows[i].first_name + " " + rows[i].last_name + ", born '" + rows[i].birthdate.toString().slice(0, 15) + "'")
//   }
//   knex.destroy();
// });