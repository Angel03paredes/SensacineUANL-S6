const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const cartelera = new Schema({
    pelicula : String,
    idioma : String,
    hora : String,
    estado : String,
    cine : String,
  file: String,
  link:String
});


module.exports = mongoose.model('cartelera',cartelera);