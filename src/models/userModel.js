const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Generar schema para los usuarios
const userSchema = new Schema({
    firstname: {type: String, required: true, maxlength:100},
    lastName: {type: String, required: true, maxlength:100},
    email: {type: String, required: true, unique: true, maxlength:100},
    password:{type: String, required: true, maxlength:255},
}, {
    //genera un createdAt y un updatedAt
    timestamps: true
});

//Create the user model from the schema
module.exports = mongoose.model('User', userSchema);;