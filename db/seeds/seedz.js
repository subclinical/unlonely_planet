
exports.seed = function(knex, Promise) {
  // Deletes existing tables in reverse order
  return knex('favourites').del()
    .then( () => {
      return knex('markers').del();
    })
    .then( () => {
      return knex('users').del();
    })
    .then( () => {
      return knex('maps').del();
    })
    .then( () => {
      return knex('markers').del();
    })
    .then(function () {
      return Promise.all([
        // Inserts seed maps
        knex('maps').insert({
          id: 1,
          title: 'Places to Get Delayed on the Subway in Toronto',
          lat: 43.6532,
          lng: -79.3832,
          zoom: 8,
          creator_id: 1,
          date_created: new Date(),
          city: 'Toronto',
          image: 'https://intersectionsmatch.com/wp-content/uploads/2014/09/great-love-debate-toronto-2.jpg'
        }),
        knex('maps').insert({
          id: 2,
          title: 'Best Baguettes in Paris',
          lat: 48.8566,
          lng: 2.3522,
          zoom: 8,
          creator_id: 2,
          date_created: new Date(),
          city: 'Paris',
          image: 'https://pictures.tripmasters.com/images/packages/france/paris-eiffeltowergrass200.jpg'
        }),
        knex('maps').insert({
          id: 3,
          title: 'Crowded Places in Shanghai',
          lat: 31.2304,
          lng: 121.4737,
          zoom: 8,
          creator_id: 3,
          date_created: new Date(),
          city: 'Shanghai',
          image: 'https://pictures.tripmasters.com/images/packages/china/shanghai-citynightview200.jpg'
        })
      ]);
    })
    .then( () => {
      return Promise.all([
        knex('users').insert({ id: 1, name: 'Michael', user_key:'123456', password: 'abc', avatar: 'http://roboteatspopcorn.com/wp-content/uploads/2016/12/michaeljordan.png' }),
        knex('users').insert({ id: 2, name: 'Brandon', user_key: '234567', password: 'def', avatar: 'https://www.decaljunky.com/images/Category/medium/American_Flags_Category.png' }),
        knex('users').insert({ id: 3, name: 'Danny', user_key: '012345', password: 'ghi', avatar: 'http://imados.fr/content/5/1/6/415160/59830_s200.jpg' })
      ]);
    })
    .then( () => {
      return Promise.all([
        knex('markers').insert({
          id: 1,
          map_id: 1,
          label: 'Lighthouse Labs Inc.',
          lat: 43.6532,
          lng: -79.3832,
          user_id: 1,
          date_created: new Date(),
          description: 'Where productivity and soundproof flooring are mutually exclusive.'
        }),
        knex('markers').insert({
          id: 2,
          map_id: 2,
          label: 'Eiffel Tower',
          lat: 48.8566,
          lng: 2.3522,
          user_id: 2,
          date_created: new Date(),
          description: 'Eiffel like a lot of people come here for sightseeing.'
        }),
        knex('markers').insert({
          id: 3,
          map_id: 3,
          label: 'Anywhere',
          lat: 37.5665,
          lng: 126.9780,
          user_id: 3,
          date_created: new Date(),
          description: 'New way to experience people surfing.'
        }),
        knex('markers').insert({
          id: 4,
          map_id: 1,
          label: 'Brandon\'s House',
          lat: 43.6562,
          lng: -79.3632,
          user_id: 1,
          date_created: new Date(),
          description: 'Smoking hot.'
        }),
        knex('markers').insert({
          id: 5,
          map_id: 1,
          label: 'I dont know.',
          lat: 44.6532,
          lng: -80.3832,
          user_id: 1,
          date_created: new Date(),
          description: 'UH.'
        }),
        knex('markers').insert({
          id: 6,
          map_id: 1,
          label: 'Raptors Den.',
          lat: 45.6532,
          lng: -78.3832,
          user_id: 1,
          date_created: new Date(),
          description: 'HUH.'
        }),
      ]);
    })
};
