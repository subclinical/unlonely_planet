"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  //return all from users
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  //register new user
  router.post('/register', (req, res) => {
    if(!req.body.name) {
      res.status(400).send();
      return;
    }
    knex
      .select('*')
      .from('users')
      .where('name', req.body.name)
      .then((user) => {
        console.log(user);
        if(user[0]) {
          console.log('Username is taken.');
          res.status(400).send('Username already exists.');
        } else {
          let key = generateRandomString();
          knex
            .insert({
              user_key: key,
              name: req.body.name,
              password: req.body.password
            }, ['*'])
            .into('users')
            .then((info) => {
              req.session.user_key = key;
              console.log(info);
              console.log(req.session.user_key);
              res.status(200).send("");
            });
        }
      })
  });

  //login post route
  router.post('/login', (req, res) => {
    if(!req.body.name || !req.body.password) {
      res.status(400).send();
      return;
    }
    knex
      .select('*')
      .from('users')
      .where('name', req.body.name)
      .andWhere('password', req.body.password)
      .then((match) => {
        if(match[0]) {
          req.session.user_key = match[0].user_key;
          let profile = {};
          profile.user = match[0].name;
          knex
            .select('*')
            .from('maps')
            .where('user_key', match[0].user_key)
            .then((maps) => {
              profile.maps = maps;
              return profile;
            })
            .then((profile) => {
              knex
                .select('map_id')
                .from('favourites')
                .where('user_key', req.session.user_key)
                .then((map_ids) => {
                  let ids = [];
                  for(let map of map_ids) {
                    for(let id in map) {
                      ids.push(map[id]);
                    }
                  }
                  console.log(map_ids);
                  knex
                    .select('*')
                    .from('maps')
                    .whereIn('id', ids)
                    .then((faves) => {
                      profile.favourites = faves;
                      console.log(profile);
                      res.json(profile);
                    })
                })
            })
        } else {
          res.status(404).send('User not found.');
        }
      })
  });

  //logout route + deletes session
  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(200).send();
  });


  return router;
}

function generateRandomString() {
  var str = "";
  while (str.length < 8) {

    var candidate = Math.floor(Math.random() * 74 + 48);
    if (candidate >= 48 && candidate <= 57 || candidate >= 65 && candidate <= 90 || candidate >= 97 && candidate <= 122) {
      str += String.fromCharCode(candidate);
    }
  }
  return str;
}