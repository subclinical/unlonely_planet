
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markers').insert({ id: 1, map_id: 1, label: 'Toronto', lat: 43.6532, lng: -79.3832, user_id: 1, date_created: new Date()}),
        knex('markers').insert({ id: 2, map_id: 2, label: 'Paris', lat: 48.8566, lng: 2.3522, user_id: 2, date_created: new Date()}),
        knex('markers').insert({ id: 3, map_id: 3, label: 'Seoul', lat: 37.5665, lng: 126.9780, user_id: 3, date_created: new Date()})
      ]);
    });
};
