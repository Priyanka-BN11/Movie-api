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
app.use(bodyParser.urlencoded({extended: true}));
//importing cors
const cors = require('cors');
// Configure Allowed Domains for Cross-Origin Resource Sharing (CORS)
// const allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors());
//import check 
const { check, validationResult } = require('express-validator');
//importing auth.js after app.use(bodyParser)
let auth = require('./auth')(app);
//after importing auth, importing passport
const passport = require('passport');
require('./passport');

app.use(morgan('common'));
//displays users
app.get('/users', passport.authenticate('jwt', {session: false}), (req,res) => {
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
  app.get('/',  (req, res) => {
    res.send('Welcome to my movie club!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  //displays movies
  app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
  });
  //Displays movie by moviename
  app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
   Movies.findOne({Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' +err);
    });
  });
  //Displays genre description by genre name
  app.get('/movies/genre/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({'Genre.Name': req.params.Name})
    .then((movies) => {
      res.json(movies.Genre);
    })
     .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' +err);
    });
  });
  //displays director info using director name
  app.get('/movies/director/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({"Director.Name": req.params.Name})
    .then ((movies) => {
      res.json(movies.Director);
    })
     .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
  });
  
  //allow users to register
  app.post('/users', 
    //validation logic here for request
    //you can either use a chain of methods like .not().isEmpty()
    //which means "opposite of isEmpty" in plain english "is not empty"
    //or use .isLength({min: 5}) which means
    //minimum value of 5 characters are only allowed
    [
      check('Username', 'Username is required').isLength({min:5}),
      check('Username', 'Username contains non alphanumeric characters not allowed.').isAlphanumeric(),
      check('Password', 'Password is required'). not().isEmpty(),
      check('Email', 'Email does not appear to be valid').isEmail()
    ],(req,res) => {
      //check the validation object for errors
      let errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
      }
    //Hash any password entered by the user when registering before storing it in the MongoDB database
    let hashedPassword = Users.hashPassword(req.body.Password);
    //search to see if a user with the requested username already exists
    Users.findOne({Username: req.body.Username})
    
    .then((user) => {
      if(user) {
        //if the uesr is found, send a response that it already exists
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
  //create favorite movie to user
  
  app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate (
      {Username: req.params.Username},
      {
        $push: { FavoriteMovies: req.params.MovieID },
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
  app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate(
      {Username: req.params.Username},
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday:req.body.Birthday,
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
  //delete user
  app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
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
  //delete fav movie for user
  app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate(
      {Username: req.params.Username},
      {
      $pull: {FavoriteMovies: req.params.MovieID}
    },
    { new: true }, // This line makes sure that the updated document is returned
      
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      });
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
 //heroku
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});