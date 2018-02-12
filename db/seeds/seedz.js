
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
          title: 'Must-See in Toronto',
          user_key: '012345',
          date_created: new Date(),
          image: 'https://intersectionsmatch.com/wp-content/uploads/2014/09/great-love-debate-toronto-2.jpg'
        }),
        knex('maps').insert({
          id: 2,
          title: 'Hot Spots in Paris',
          user_key: '012345',
          date_created: new Date(),
          image: 'https://pictures.tripmasters.com/images/packages/france/paris-eiffeltowergrass200.jpg'
        }),
        knex('maps').insert({
          id: 3,
          title: 'Cool Places in Shanghai',
          user_key: '012345',
          date_created: new Date(),
          image: 'https://pictures.tripmasters.com/images/packages/china/shanghai-citynightview200.jpg'
        }),
        knex('maps').insert({
          id: 4,
          title: 'Vancouver Pride',
          user_key: '012345',
          date_created: new Date(),
          image: 'http://centreforinquiry.ca/wp-content/uploads/2013/05/vancouver-skyline-200x200.jpg'
        }),
        knex('maps').insert({
          id: 5,
          title: 'Rio de Janeiro Eats',
          user_key: '012345',
          date_created: new Date(),
          image: 'http://masterbedroomideas.eu/wp-content/uploads/2016/08/1243848-december-26-2015-rio-de-janeiro-travel-image-galleries-200x200.jpg'
        }),
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
          image: 'https://www.bcjobs.ca/employerlogo/2DCF2E88-EBC7-B6F3-0546D8FC52B3C372.png?width=350&mode=max',
          city: 'Toronto'
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
          image: 'https://igx.4sqi.net/img/general/200x200/818134_yqfoDK7aaekqXDyiIgz4BPCND6dPvvagL1c6hOQkKVQ.jpg',
          city: 'Paris'
        }),
        knex('markers').insert({
          id: 3,
          map_id: 3,
          label: 'Extra Gourmet',
          lat: 31.234816,
          lng: 121.519654,
          user_key: '012345',
          date_created: new Date(),
          description: 'New way to experience people surfing.',
          image: 'https://files2.coloribus.com/files/companies/part_16/167505/mcdonalds-167505-1493289558_logo.png',
          city: 'Shanghai'
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
          image: 'https://c.ymcdn.com/sites/www.strategyassociation.org/resource/resmgr/2017_conference/CNtower.png',
          city: 'Toronto'
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
          image: 'https://igx.4sqi.net/img/general/200x200/48239911_1SNsnIegO_oGlMW5QkRPpqUuE8ewU2vQxYcy9L2GWT8.jpg',
          city: 'Toronto'
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
          image: 'https://b.zmtcdn.com/data/pictures/7/8910537/fa04e5856e0fdac25a6f215a05a39aa7.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          city: 'Toronto'
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
          image: 'https://igx.4sqi.net/img/general/200x200/39373183_-fnvwd-txdOWx1ED7vf88ICxxINc9pZgNHdlp3amDHw.jpg',
          city: 'Toronto'
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
          image: 'http://thesurge.com/wp-content/uploads/2016/02/Ripleys-Aquarium-Of-The-Smokies-59357-200x200.jpg',
          city: 'Toronto'
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
          image: 'https://igx.4sqi.net/img/general/200x200/348213_1oQ4lNa8TwZu617pqPPBQjgkypv7yFxSzhQMffXEue8.jpg',
          city: 'Toronto'
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
          image: 'https://igx.4sqi.net/img/general/200x200/41168100_l2WP9NmifL3JAKFmZajmmc1v3g23M5CIJIsVvTynNa0.jpg',
          city: 'Paris'
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
          image: 'https://i2.wp.com/www.dlptoday.com/images/2017/02/N024534_BD-01-1200x577.png?resize=200%2C200',
          city: 'Paris'
        }),
        knex('markers').insert({
          id: 12,
          map_id: 2,
          label: 'Notre Dame',
          lat: 48.852968,
          lng: 2.349902,
          user_key: '012345',
          date_created: new Date(),
          description: 'I think this is a church with a gothic design.',
          image: 'https://ph.olobahataahu.info/small/200/thumbnail/ANd9GcTsTwOv3ztLUufRUkz3ABz4WLNYu6wip3FCAMkuNouv9i9LFdCD0w.jpg',
          city: 'Paris'
        }),
        knex('markers').insert({
          id: 13,
          map_id: 3,
          label: 'Pearl Tower',
          lat: 31.239689,
          lng: 121.499755,
          user_key: '012345',
          date_created: new Date(),
          description: 'Hey, we got something tall too.',
          image: 'https://cache-graphicslib.viator.com/graphicslib/6139/SITours/dinner-at-the-oriental-pearl-tower-revolving-restaurant-with-transfers-in-shanghai-311976.jpg',
          city: 'Shanghai'
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
          image: 'http://www.chinafacttours.com/images/shanghai/yu-garden/yu-garden-704261.jpg.thumb.jpg',
          city: 'Shanghai'
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
          image: 'https://igx.4sqi.net/img/general/200x200/4368853_4TGv3Sz1t6oU065pNBQSaAYx_WOB2CKFk0H6b9FYBfQ.jpg',
          city: 'Vancouver'
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
          image: 'https://igx.4sqi.net/img/general/200x200/10225207_7pV2Plei-G-mSho9Xz92JkJYZa-N9K4xKU9Jnw43wrA.jpg',
          city: 'Vancouver'
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
          image: 'https://igx.4sqi.net/img/general/200x200/48613774_x3A2qnYDwzUuSnKNi5-qRx8kOHE30D-UArpdbKmuoMY.jpg',
          city: 'Vancouver'
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
          image: 'https://igx.4sqi.net/img/general/200x200/22156095_H9Tpdhd0B2Uv5-k09kVSTCB2e9Wniza9qmmj8QLxqXw.jpg',
          city: 'Rio de Janeiro'
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
          image: 'https://b.zmtcdn.com/data/pictures/2/7301112/54b1a93b6abee60d7f22a3991f593d93.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          city: 'Rio de Janeiro'
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
          image: 'https://igx.4sqi.net/img/general/200x200/72271806__PxoZiBT4nksxjwIEctRa0fDalC26oGi3C6aRn0lQLA.jpg',
          city: 'Rio de Janeiro'
        }),
      ])
      .then( () => {
        return Promise.all([
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
            user_key: '123456'
          }),
          knex('favourites').insert({
            map_id: 4,
            user_key: '234567'
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
