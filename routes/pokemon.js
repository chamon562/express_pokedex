var express = require('express');
var router = express.Router();
// Make sure to require your models in the files where they will be used.
var db = require('../models');
const pokemon = require('../models/pokemon');
const axios = require('axios'); 


//add pokemon to our database and find more things about them
// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) =>{
      db.pokemon.findAll()
      .then(pokemons => {
        //once cick on pokem as favorite and render to poke fav page and send to favorties page
        res.render('../views/favorites', {pokemons} )
        // console.log('Created: ', poke.name)
       })
       
  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/',  (req, res) => {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
     
      }
  });
  res.redirect('/pokemon');
});



module.exports = router;
