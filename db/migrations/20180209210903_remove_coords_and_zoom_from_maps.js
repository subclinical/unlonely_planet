
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function (table) {
      table.dropColumn('lat');
      table.dropColumn('lng');
      table.dropColumn('zoom');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function (table) {
      table.float('lng');
      table.float('lat');
      table.integer('zoom');
    })
  ])
};
