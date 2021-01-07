const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const carrito = new Schema({
    idusuario :  String,
    idarticulo : String,
});


module.exports = mongoose.model('carrito',carrito);