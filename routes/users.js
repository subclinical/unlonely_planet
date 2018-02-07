"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  //routes get requests to render map via map_id and all associated markers
  router.get('/map', (req, res) => {
    knex
      .select('*')
      .from('maps')
      .where('id', req.body.map_id)
      .then((map_info) => {
        return map_info;
        console.log(typeof map_info);
      })
      .then((map_info) => {
        knex
          .select('*')
          .from('markers')
          .where('map_id', req.body.map_id)
          .then((marker_info) => {
            map_info[0].markers = marker_info;
            console.log(marker_info);
            res.json(map_info);
          })
      });
    // knex
    //   .select('*')
    //   .from('maps')
    //   .innerJoin('markers', 'maps.id', 'markers.map_id')
    //   .where('maps.id', req.body.map_id)
    //   .then((info) => {
    //     console.log(info);
    //   });
  });

  //routes get requests for new map showing 

  //routes post requests for new map creations
  router.post('/new', (req, res) => {
    knex
      .insert({
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng,
        zoom: req.body.zoom,
        creator_id: req.body.user_id, //swap to session.id when ready
        date: new Date()
      })
      .into('maps')
      .then(() => {
        console.log('New map added.');
      });
  });



  return router;
}
