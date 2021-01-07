const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const ventas = new Schema({
    idproducto : String,
    producto : String,
    cantidad : Number,
    venta : Number,
    fecha : String,
  
});


module.exports = mongoose.model('ventas',ventas);