
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
          title: 'Places in Toronto Worth Getting on the Public Transit for',
          lat: 43.6532,
          lng: -79.3832,
          zoom: 8,
          user_key: '012345',
          date_created: new Date(),
          city: 'Toronto',
          image: 'https://intersectionsmatch.com/wp-content/uploads/2014/09/great-love-debate-toronto-2.jpg'
        }),
        knex('maps').insert({
          id: 2,
          title: 'Hot Spots in Paris',
          lat: 48.8566,
          lng: 2.3522,
          zoom: 8,
          user_key: '012345',
          date_created: new Date(),
          city: 'Paris',
          image: 'https://pictures.tripmasters.com/images/packages/france/paris-eiffeltowergrass200.jpg'
        }),
        knex('maps').insert({
          id: 3,
          title: 'Cool Places in Shanghai',
          lat: 31.230390,
          lng: 121.473702,
          zoom: 8,
          user_key: '012345',
          date_created: new Date(),
          city: 'Shanghai',
          image: 'https://pictures.tripmasters.com/images/packages/china/shanghai-citynightview200.jpg'
        }),
        knex('maps').insert({
          id: 4,
          title: 'Everybody loves Vancouver',
          lat: 49.282808,
          lng: -123.106688,
          zoom: 8,
          user_key: '012345',
          date_created: new Date(),
          city: 'Vancouver',
          image: 'https://pictures.tripmasters.com/images/packages/china/shanghai-citynightview200.jpg'
        }),
        knex('maps').insert({
          id: 5,
          title: 'Restaurants in Rio de Janeiro',
          lat: -22.906847,
          lng: -43.172896,
          zoom: 8,
          user_key: '012345',
          date_created: new Date(),
          city: 'Rio de Janeiro',
          image: 'https://pictures.tripmasters.com/images/packages/china/shanghai-citynightview200.jpg'
        }),
        knex('maps').insert({
          id: 6,
          title: 'Come Here During the Offseason, Otherwise Crowding is an Issue',
          lat: -62.940930,
          lng: -60.555375,
          zoom: 8,
          user_key: '012345',
          date_created: new Date(),
          city: 'South Pole',
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
          lat: 43.644625,
          lng: -79.395197,
          user_key: '012345',
          date_created: new Date(),
          description: 'Where productivity and soundproof flooring are mutually exclusive.',
          image: 'https://www.fillmurray.com/100/100'
        }),
        knex('markers').insert({
          id: 2,
          map_id: 2,
          label: 'Eiffel Tower',
          lat: 48.858370,
          lng: 2.294481,
          user_key: '012345',
          date_created: new Date(),
          description: 'Eiffel like a lot of people come here for sightseeing.',
          image: 'https://www.fillmurray.com/100/100'
        }),
        knex('markers').insert({
          id: 3,
          map_id: 3,
          label: 'Extra Gourmet 12-star Bistro',
          lat: 31.234816,
          lng: 121.519654,
          user_key: '012345',
          date_created: new Date(),
          description: 'New way to experience people surfing.',
          image: 'https://www.fillmurray.com/100/100'
        }),
        knex('markers').insert({
          id: 4,
          map_id: 1,
          label: 'CN Tower',
          lat: 43.642566,
          lng: -79.387057,
          user_key: '012345',
          date_created: new Date(),
          description: 'Rotating restaurant only cater to those who use the stairs',
          image: 'https://www.fillmurray.com/100/100'
        }),
        knex('markers').insert({
          id: 5,
          map_id: 1,
          label: 'Distillery District',
          lat: 43.650305,
          lng: -79.359580,
          user_key: '012345',
          date_created: new Date(),
          description: 'Cool place to loiter.',
          image: 'https://www.fillmurray.com/100/100'
        }),
        knex('markers').insert({
          id: 6,
          map_id: 1,
          label: 'O.Noir',
          lat: 43.669121,
          lng: -79.382764,
          user_key: '012345',
          date_created: new Date(),
          description: 'Let taste buds monopolize your dining experience for a night.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 7,
          map_id: 1,
          label: 'University of Toronto',
          lat: 43.662892,
          lng: -79.395656,
          user_key: '012345',
          date_created: new Date(),
          description: 'Get edumacated.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 8,
          map_id: 1,
          label: 'Ripley\'s Aquarium',
          lat: 43.642403,
          lng: -79.385971,
          user_key: '012345',
          date_created: new Date(),
          description: 'Bro, the sharks here are so t h i c c, come look.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 9,
          map_id: 1,
          label: 'Eaton Centre',
          lat: 43.654438,
          lng: -79.380699,
          user_key: '012345',
          date_created: new Date(),
          description: 'Spend your life savings here in the blink of an eye.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 10,
          map_id: 2,
          label: 'The Louvre',
          lat: 48.860611,
          lng: 2.337644,
          user_key: '012345',
          date_created: new Date(),
          description: 'Da Vinci lives here.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 11,
          map_id: 2,
          label: 'Disneyland Paris',
          lat: 48.872234,
          lng: 2.775808,
          user_key: '012345',
          date_created: new Date(),
          description: 'Because there are no Disneylands anywhere else.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 12,
          map_id: 2,
          label: 'Notre Dame de Paris',
          lat: 48.852968,
          lng: 2.349902,
          user_key: '012345',
          date_created: new Date(),
          description: 'I think this is a church with a gothic design.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 13,
          map_id: 3,
          label: 'Oriental Pearl Tower',
          lat: 31.239689,
          lng: 121.499755,
          user_key: '012345',
          date_created: new Date(),
          description: 'Hey, we got something tall too.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 14,
          map_id: 3,
          label: 'Yu Garden',
          lat: 31.227235,
          lng: 121.492094,
          user_key: '012345',
          date_created: new Date(),
          description: 'Come feed our fishes, for just 3 installments of $13.99 per fish.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 15,
          map_id: 4,
          label: 'Gastown',
          lat: 49.282808,
          lng: -123.106688,
          user_key: '012345',
          date_created: new Date(),
          description: 'Hipster gatherings, come only if hip.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 16,
          map_id: 4,
          label: 'Stanley Park',
          lat: 49.301705,
          lng: -123.141700,
          user_key: '012345',
          date_created: new Date(),
          description: 'Wow trees.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 17,
          map_id: 4,
          label: 'Grouse Mountain',
          lat: 49.372289,
          lng: -123.099487,
          user_key: '012345',
          date_created: new Date(),
          description: 'Climb me.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 18,
          map_id: 5,
          label: 'CT Boucherie',
          lat: -22.982031,
          lng: -43.224260,
          user_key: '012345',
          date_created: new Date(),
          description: 'French restaurant in Rio.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 19,
          map_id: 5,
          label: 'Giuseppe Grill Leblon',
          lat: -22.983482,
          lng: -43.223013,
          user_key: '012345',
          date_created: new Date(),
          description: 'Elegant setting.',
          image: 'https://www.fillmurray.com/110/110'
        }),
        knex('markers').insert({
          id: 20,
          map_id: 5,
          label: 'Le Bistrot Du Cuisinier',
          lat: -22.984183,
          lng: -43.213646,
          user_key: '012345',
          date_created: new Date(),
          description: 'Another French restaurant in Rio.',
          image: 'https://www.fillmurray.com/110/110'
        }),
      ])
      .then( () => {
        return Promise.all([
          knex('favourites').insert({
            map_id: 1,
            user_key: '012345'
          }),
          knex('favourites').insert({
            map_id: 1,
            user_key: '123456'
          }),
          knex('favourites').insert({
            map_id: 2,
            user_key: '234567'
          }),
          knex('favourites').insert({
            map_id: 2,
            user_key: '012345'
          }),
          knex('favourites').insert({
            map_id: 2,
            user_key: '123456'
          }),
          knex('favourites').insert({
            map_id: 4,
            user_key: '234567'
          }),
          knex('favourites').insert({
            map_id: 6,
            user_key: '012345'
          }),
          knex('favourites').insert({
            map_id: 5,
            user_key: '123456'
          }),
          knex('favourites').insert({
            map_id: 3,
            user_key: '234567'
          })
        ])
      });
    })
};
