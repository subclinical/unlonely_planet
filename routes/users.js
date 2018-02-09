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
    console.log(req.body);
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
          req.session.user_key = match.user_key;
          res.json(match);
        } else {
          res.status(404).send('User not found.');
        }
      })
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