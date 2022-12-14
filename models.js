const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const movieSchema = mongoose.Schema({
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
const userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref:'Movie'}]
});

//Hashing password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

//Validating password
userSchema.methods.validatePassword = function(password) {
    console.log(password, this.password,"not valid");
    return bcrypt.compareSync(password, this.Password);
}

//Creating models Movie and User
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

//Exporting Movies and Users
// module.exports.Movie = Movie;
// module.exports.User = User;

//above can be written as 
module.exports= {Movie, User};
    