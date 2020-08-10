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
        res.render('favorites', {pokemons} )
        // console.log('Created: ', poke.name)
       })
       
  // TODO: Get all records from the DB and render to view
});
router.get('/:name', (req, res) =>{

  let name = req.params.name
  let pokeAll = `http://pokeapi.co/api/v2/pokemon/${name}`;
  axios.get(pokeAll)
  .then(function(apiResponse){
  
    let pokemon = apiResponse.data
    console.log(apiResponse.data)
    res.render('show', { pokemon: pokemon})
  })
  .catch((err) =>{
    console.log('error', err)
    res.render('error')

  })
})
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/',  (req, res) => {
  //db.pokemon is the name of the data table
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
     }
  }).then(()=>{
    //redirected to my pokemon page 
    res.redirect('/pokemon');
  })
  .catch((err) =>{
    console.log('error', err)
    res.render('error')

  })
});
//TODO create Delete route 
// router.delete('/:name', (req, res)=>{
//   console.log()
//   db.pokemon.destroy({
//     where:{name: req.params.name}
//   })
// })
router.delete('/:name', (req, res)=>{
  // what do we need to access to delete the database
  // pass in an object
  db.pokemon.destroy({
    // what are we sending req. body or 
    // req.params the params is the in the index.ejs whatever in the url is gona be the req.params.
    where: {name: req.params.name}
  })
  //want to redirect to pokemon fav page. 
  //nothing to pass through because its been deleted
  .then(()=>{
    //always want to redirect to where you want your user to be at
    res.redirect('/pokemon')
  })
  .catch((err)=>{
    console.log('ERROR', err)
    //Make error page for ejs
    res.render('error')
  })
})

module.exports = router;
