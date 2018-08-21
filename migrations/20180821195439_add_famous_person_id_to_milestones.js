exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
      table.integer('person_id').unsigned().notNullable();

      table.foreign('person_id').references('id').inTable('famous_people').onDelete("cascade");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
      table.dropColumn('person_id');
    })
  ])
};