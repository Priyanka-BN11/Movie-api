const mongoose = require('mongoose');
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description:{type: String, required: true},
    Genre: {
        Name: String,
        Description : String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
    
}); 
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId,ref:'Movie'}]
});
//Creating models Movie and User
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
//exporting Movies and Users
module.exports.Movie = Movie;
module.exports.User = User;
    