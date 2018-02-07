
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('maps', function (table) {
            table.increments('id');
            table.string('title');
            table.float('lat');
            table.float('lng');
            table.integer('zoom');
            table.integer('creator_id');
            table.date('date_created');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('maps')
    ])
};
