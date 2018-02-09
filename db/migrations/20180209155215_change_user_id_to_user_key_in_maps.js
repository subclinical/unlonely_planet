
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function (table) {
      table.dropColumn('creator_id');
      table.string('user_key');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function (table) {
      table.dropColumn('user_key');
      table.integer('creator_id');
    })
  ])
};
