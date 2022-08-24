const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref:'Movie'}]
});
//hashing password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
//validating password
userSchema.methods.validatePassword = function(password) {
//    console.log(password, this.password);
    return bcrypt.compareSync(password, this.Password);
}
//Creating models Movie and User
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
//exporting Movies and Users
module.exports.Movie = Movie;
module.exports.User = User;
    