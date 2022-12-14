const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    firstName: String, 
    lastName: String,
    gender:String,
    email: {type: String, unique: true},
    password: String,
    cin: Number,
    tel: Number,
    img:String,
    role:String,


});
userSchema.plugin(uniqueValidator);
const user = mongoose.model('user', userSchema);
module.exports = user;