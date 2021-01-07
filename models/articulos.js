const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const  Schema = mongoose.Schema;

const articulos = new Schema({
    producto :  String,
    precio : Number,
    cantidad : Number,
    color : String,
    marca : String,
    modelo : String,
    descripcion : String,
    file : String
});

articulos.plugin(mongoosePaginate);

module.exports = mongoose.model('articulos',articulos);