"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

    //home page redirects here
    router.get('/', (req, res) => {
        knex
            .select('*')
            .from('maps')
            .orderBy('id', 'asc')
            .then((map_info) => {
                console.log('New visitor.');
                res.json(map_info);
            })
    });
    //routes get requests to render map via map_id and all associated markers
    router.get('/search/:id', (req, res) => {
        console.log(req.params.id);
        if(!req.params.id) {
            throw new Error();
        } else {
        knex
            .select('*')
            .from('maps')
            .where('id', req.params.id)
            .then((map_info) => {
                return map_info;
            })
            .then((map_info) => {
                knex
                    .select('*')
                    .from('markers')
                    .where('map_id', req.params.id)
                    .then((marker_info) => {
                        map_info[0].markers = marker_info;
                        console.log(marker_info);
                        console.log(req.session.user_key);
                        res.json(map_info[0]);
                    })
            });
        }
    });

    //routes post requests for new map creations
    router.post('/new', (req, res) => {
        if(req.session.user_key) {
            if(loginState(req.session.user_key)) {
                knex
                    .insert({
                        title: req.body.title,
                        lat: req.body.lat,
                        lng: req.body.lng,
                        zoom: req.body.zoom,
                        user_key: req.session.user_key, //swap to session.id when ready
                        date_created: new Date()
                    }, ['*'])
                    .into('maps')
                    .then((newMap) => {
                        console.log(newMap);
                        res.status(200).send("NICE");
                    });
                }
            }
    });

    //routes to post markers on a map
    router.post('/marker', (req, res) => {
        console.log(req.body);
        if(req.session.user_key) {
            if(loginState(req.session.user_key)) {
                knex
                    .insert({
                        label: req.body.label,
                        map_id: req.body.map_id,
                        lat: req.body.lat,
                        lng: req.body.lng,
                        user_key: req.session.user_key, //swap to session.id when ready
                        date_created: new Date(),
                        description: req.body.description
                    }, ['*'])
                    .into('markers')
                    .then((added) => {
                        console.log(added);
                        res.status(200).json(added);
                    })
            } else {
                res.status(404).send('User not found.');
            }
        } else {
            res.status(400).send('Not logged in.');
        }
    });
    //adding map to user's favourites
    router.post('/favourite', (req, res) => {
        console.log(req.body);
        if (req.session.user_key) {
            if (loginState(req.session.user_key)) {
                knex
                    .select('*')
                    .from('favourites')
                    .where('map_id', req.body.map_id)
                    .andWhere('user_key', req.session.user_key)
                    .then((match) => {
                        if(match[0]) {
                            console.log('Map was already favourited by this user.');
                            res.status(400).send();
                        } else {
                            knex
                                .insert({
                                    map_id: req.body.map_id,
                                    user_key: req.session.user_key
                                })
                                .into('favourites')
                                .then( () => {
                                    console.log('Favourite added.');
                                })
                        }
                    })
            } else {
                res.status(404).send('User not found.');
            }
        } else {
            res.status(400).send('Not logged in.');
        }
    });


    return router;
}

//check if current cookie session is associated with an existing user
function loginState(key) {
    knex
        .select('*')
        .from('users')
        .where('user_key', key)
        .then((user) => {
            if(user[0]) {
                return true;
            }
            return false;
        })
}