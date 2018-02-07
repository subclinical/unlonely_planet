
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('favourites', function(table){
          table.increments('id');
          table.integer('map_id');
          table.foreign('map_id').references('maps.id');
          table.integer('user_id');
          table.foreign('user_id').references('users.id');
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('favourites')
  ])
};
