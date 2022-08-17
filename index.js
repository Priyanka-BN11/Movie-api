//importing express and morgan
const express = require('express'),
app = express(),
morgan = require('morgan'),
bodyParser = require('body-parser'),
 uuid = require('uuid');
 //Mongoose and model imports
const mongoose = require('mongoose');
const Models = require('./models.js');
//importing Movie and User
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
//Database connection
mongoose.connect('mongodb://localhost:27017/test', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(bodyParser.json());
app.use(morgan('common'));
//users
app.get('/users', (req,res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});

  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
    
  });
  app.get('/movies/:Title', (req, res) => {
   Movies.findOne({Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' +err);
    });
  });
  app.get('/genre/:Name', (req, res) => {
    Genres.findOne({Name: req.params.Name})
    .then((genre) => {
      res.json(genre.Description);
    })
     .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' +err);
    });
  });
  app.get('/director/:Name', (req, res) => {
    Directors.findOne({Name: req.params.Name})
    .then ((director) => {
      res.json(director);
    })
     .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
  });
  
  //allow users to register
  app.post('/users',(req,res) =>{
    Users.findOne({Username: req.body.Username})
    .then((user) => {
      if(user) {
        return res.status(400).send(req.body.Username + 'already exists');
      }
      else{
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
        .then ((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error:' + error);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error:' + error);
    });
  });
  //create favorite movie to use
  
  app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate (
      {Username: req.params.Username},
      {
        $push: { Fav: req.params.MovieID },
      },
      { new: true},
      (err, updatedUser) => {
        if(err) {
          console.error(err);
          res.status(500).send('Error:' + err);
        }
        else {
          res.json(updatedUser);
        }
      }
  );
});
  //update user info
  app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate(
      {Username: req.params.Username},
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birth:req.body.Birth,
        },
      },
      {new: true},
      (err, updatedUser) => {
        if(err) {
          console.error(err);
          res.status(500).send('Error:' + err);
        }
        else {
          res.json(updatedUser);
        }
      }
      );
  });
  //delete
  app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({Username: req.params.Username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + 'was not found');
      } else {
        res.status(200).send(req.params.Username + 'was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
  });
  //delete fav movie
  app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
  
    let user = users.find( user => user.id == id );
  
    if (user) {
      user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
      res.status(200).send(`${movieTitle} has been removed from ${user.name}'s array`);
    } else {
      res.status(400).send('No such user found!');
    }
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
 