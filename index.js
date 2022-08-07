//importing express and morgan
const express = require('express'),
app = express(),
// morgan = require('morgan'),
bodyParser = require('body-parser'),
 uuid = require('uuid');

// app.use(morgan('common'));
app.use(bodyParser.json());
//users
let users = [
  {
    id:"1",
    name:"Joe",
    favoriteMovies:["The Shawshank Redemption"]
  },
  {
    id:"2",
    name:"Bob",
    favoriteMovies:["Joker"]
  }
];
//movies name 
let movies = [
    {
      "Title": "The Shawshank Redemption",
      "Description":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      "Genre":{
                "Name": "Drama"
              },
      "Director": { "Name":"Frank Darabont",
                    "Bio":"Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School. His first job in movies was as a production assistant on the 1981 low-budget film, Hell Night (1981), starring Linda Blair. ", 
                    "Born":"January 28, 1959"
     },
      "ImageUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1ODM2MjY3OV5BMl5BanBnXkFtZTgwMTU2MjEyMDE@._V1_UX100_CR0,0,100,100_AL_.jpg"
    },
    {
      "Title": "The Dark Knight",
      "Description":"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      "Genre":{
                "Name":"Action/Crime/Drama"
              },
      "Director":{ 
                  "Name":"Christopher Nolan",
                  "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimeter films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000.",
                  "Born":"July 30, 1970"
                  },
      "ImageUrl": "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg"
    },
    {
      "Title": "Inception",
      "Description":"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      "Genre":{
                "Name":"Action/Adventure/Sci-Fi"
              },
      "Director": { "Name":"Christopher Nolan",
                  "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimeter films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000.",
                  "Born":"July 30, 1970"
      },
      "ImageUrl": "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg"
    },
    {
      "Title": "Captain America: The First Avenger",
      "Description":"Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a 'Super-Soldier serum'. But being Captain America comes at a price as he attempts to take down a warmonger and a terrorist organization.",
      "Genre":{
                "Name":"Action/Adventure/Sci-Fi"
              },
      "Director":{"Name":"Joe Johnston",
                "Bio":"Joseph Eggleston Johnston II is an American film director from Texas who is known for directing the cult classic film The Rocketeer, Jumanji, Honey, I Shrunk the Kids, The Wolfman, October Sky, The Pagemaster, Jurassic Park III and Captain America: The First Avenger. He was an art director for Raiders of the Lost Ark and the Star Wars original trilogy.",
                "Born": "May 13, 1950" 
              },
      "ImageUrl":"https://m.media-amazon.com/images/M/MV5BNzcxNDQwNzgxNV5BMl5BanBnXkFtZTYwNTQ1MTA0._V1_UX67_CR0,0,67,98_AL_.jpg"
    },
    {
      "Title": "Interstellar",
      "Description":"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      "Genre":{
                "Name":"Adventure/Drama/Sci-Fi"
              },
      "Director": { "Name":"Christopher Nolan",
                    "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimeter films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000.",
                    "Born":"July 30, 1970"
                },
      "ImageUrl": "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg"
    },
    {
        "Title": "Joker",
        "Description": "A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.",
        "Genre":{
                  "Name":"Crime/Drama/Thriller"
                },
        "Director": { "Name":"Todd Phillips",
                      "Bio":"Todd Phillips is an American filmmaker and actor who got his start by directing the comedy films Road Trip and Old School, the earlier inspired EuroTrip. He also directed Starsky & Hutch, The Hangover trilogy, Due Date, War Dogs and School for Scoundrels. Phillips directed Joker, a Taxi Driver style film set in the universe of Batman and starring Joaquin Phoenix. Joker is the highest grossing R-rated film of all time.",
                      "Born":"December 20, 1970"
                  },
        "ImageUrl": "https://m.media-amazon.com/images/M/MV5BNGY5MWRjM2MtNDkzNC00MDcwLWE2ZjYtOWNlZmM3MWIyNGZmXkEyXkFqcGdeQXVyMTAxMjM5NTA4._V1_UY317_CR131,0,214,317_AL_.jpg"
      },
      {
        "Title": "Coco",
        "Description":"Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
        "Genre":{
                  "Name": "Animation/Drama/Comedy"
                },
        "Director": { "Name": "Lee Unkrich",
                      "Bio":"Lee Unkrich is an Academy Award-winning director at Pixar Animation Studios. He most recently directed Disney.Pixar's critically-acclaimed 'Coco', which received the Academy Award for Best Animated Feature and Best Song.As the director of Disney.Pixar's 'Toy Story 3,' Lee was also awarded an Academy Award for Best Animated Feature.",
                      "Born":"August 8, 1967"
                  },
        "ImageUrl": "https://m.media-amazon.com/images/M/MV5BMjA1ODE2NTEzN15BMl5BanBnXkFtZTYwNzUzODY2._V1_UY98_CR1,0,67,98_AL_.jpg"
      },
      {
        "Title": "Avengers",
        "Description": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        "Genre":{
                  "Name":"Action/Adventure/Sci-Fi"
                },
        "Director": { "Name": "Joss Whedon",
                      "Bio": "Joss Whedon is the middle of five brothers - his younger brothers are Jed Whedon and Zack Whedon. Both his father, Tom Whedon and his grandfather, John Whedon were successful television writers. Joss' mother, Lee Stearns, was a history teacher and she also wrote novels as Lee Whedon. Whedon was raised in New York and was educated at Riverdale Country School, where his mother also taught. He also attended Winchester College in England for two years, before graduating with a film degree from Wesleyan University.",
                      "Born": "June 23, 1964"
                  }, 
        "ImageUrl": "https://m.media-amazon.com/images/M/MV5BMTg5MzQ0MDA4MF5BMl5BanBnXkFtZTcwNzUwOTk4OQ@@._V1_UY98_CR3,0,67,98_AL_.jpg"
      },
      
      {
        "Title": "Batman Begins",
        "Description": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
        "Genre":{
                  "Name":"Action/Crime/Drama"
                },
        "Director": { "Name":"Christopher Nolan",
                      "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimeter films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000.",
                      "Born":"July 30, 1970"
                  },
        "ImageUrl": "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg"
      },
    {
        "Title": "Jurassic Park",
        "Description": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
        "Genre":{
                  "Name": "Action/Adventure/Sci-Fi"
                },
        "Director": { "Name": "Steven Spielberg",
                      "Bio":"One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
                      "Born": "December 18, 1946" 
                  },
        "ImageUrl": "https://m.media-amazon.com/images/M/MV5BMTY1NjAzNzE1MV5BMl5BanBnXkFtZTYwNTk0ODc0._V1_UX67_CR0,0,67,98_AL_.jpg"          
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
    res.status(200).json(movies);
  });
  app.get('/movies/:title', (req, res) => {
    const {title} = req.params;
    const movie = movies.find( movie => movie.Title === title );
  
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('Movie not found');
    }
  });
  app.get('/movies/genre/:genreName', (req, res) => {
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;
  
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('Genre not found');
    }
  });
  app.get('/movies/director/:directorName', (req, res) => {
    const {directorName} = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;
  
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(400).send('Director not found');
    }
  });
  //create users
  app.post('/users', (req, res) => {
    const newUser = req.body;
  
    if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
    } else {
      res.status(400).send('users need names')
    }
  })
  
  //create favorite movie
  
  app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
  
    let user = users.find( user => user.id == id ); //search user by id
  
    if (user) {
      user.favoriteMovies.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to ${user.name}'s array`);
    } else {
      res.status(400).send('No such user found!');
    }
  });
  //update user
  app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;
  
    let user = users.find(user => user.id == id);
  
    if (user) {
      user.name = updatedUser.name;
      res.status(200).json(user);
    } else {
      res.status(400).send('User not found')
    }
  })
  //delete
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
  
    let user = users.find( user => user.id == id );
  
    if (user) {
      users = users.filter(user => user.id != id);
      res.status(200).send(`user ${id} has been deleted`);
    } else {
      res.status(400).send('No such user found!');
    }
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
 