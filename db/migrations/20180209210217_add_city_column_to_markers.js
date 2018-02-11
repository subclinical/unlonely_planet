
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('markers', function (table) {
      table.string('city');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('markers', function (table) {
      table.dropColumn('city');
    })
  ])
};
