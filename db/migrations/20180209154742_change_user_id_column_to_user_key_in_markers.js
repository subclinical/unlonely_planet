
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('markers', function (table) {
      table.dropColumn('user_id');
      table.string('user_key');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('markers', function (table) {
      table.dropColumn('user_key');
      table.integer('user_id');
    })
  ])
};
