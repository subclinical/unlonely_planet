
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('maps').insert({ 
          id: 1, 
          title: 'Toronto', 
          lat: 43.6532, 
          lng: -79.3832, 
          zoom: 8, 
          creator_id: 1, 
          date_created: new Date()
        }),
        knex('maps').insert({ 
          id: 2, 
          title: 'Paris', 
          lat: 48.8566, 
          lng: 2.3522, 
          zoom: 8, 
          creator_id: 2, 
          date_created: new Date()
        }),
        knex('maps').insert({ 
          id: 3, 
          title: 'Seoul', 
          lat: 37.5665, 
          lng: 126.9780, 
          zoom: 8, 
          creator_id: 3, 
          date_created: new Date()
        })
      ]);
    });
};
