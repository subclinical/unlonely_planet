
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('markers', function (table) {
            table.increments('id');
            table.integer('map_id');
            table.foreign('map_id').references('maps.id');
            table.string('label');
            table.float('lat');
            table.float('lng');
            table.integer('user_id');
            table.foreign('user_id').references('users.id');
            table.date('date_created');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('markers')
    ])
};
