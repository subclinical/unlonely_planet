
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('markers', function (table) {
      table.text('image');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('markers', function (table) {
      table.dropColumn('image');
    })
  ])
};