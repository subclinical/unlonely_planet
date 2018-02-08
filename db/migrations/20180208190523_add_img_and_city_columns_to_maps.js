
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function (table) {
      table.string('city');
      table.text('image');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function (table) {
      table.dropColumn('city');
      table.dropColumn('image');
    })
  ])
};