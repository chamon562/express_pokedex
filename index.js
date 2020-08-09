require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const { response } = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
//look for public folder
app.use(express.static('public'))

// GET / - main index of site home route
app.get('/', (req, res) => {
  // console.log('HELLLOOO', req.body)
  //initial request url
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151>';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    //do alot of console.llog to see what returns were getting
    // console.log(response.data)
    var pokemon = apiResponse.data.results;
    // console.log(pokemon)
    //rendering all on home page
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
