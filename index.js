//importing express and morgan
const express = require('express'),
morgan = require('morgan');
const app = express();
app.use(morgan('common'));

//movies name 
let topBooks = [
    {
      name: 'The Shawshank Redemption',
      director: 'Frank Darabont'
    },
    {
      name: 'The Dark Knight',
      director: 'Christopher Nolan'
    },
    {
      name: 'Inception',
      director: 'Christopher Nolan'
    },
    {
      name: 'The Matrix',
      director: 'Lana Wachowski, Lilly Wachowski'
    },
    {
      name: 'Interstellar',
      director: 'Christopher Nolan'
    },
    {
        name: 'Joker',
        director: 'Todd Phillips'
      },
      {
        name: 'Coco',
        director: 'Lee Unkrich'
      },
      {
        name: 'Avengers: Endgame',
        director: 'Anthony Russo, Joe Russo'
      },
      {
        name: 'Batman Begins',
        director: 'Christopher Nolan'
      },
    {
        name: 'Jurassic Park',
        director: 'Steven Spielberg'
      }

  ];
// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(movies);
  });
  app.use(express.static('public'));
  
   //error handling
   app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
 