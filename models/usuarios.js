const mongoose = require('mongoose');
const bycript = require('bcryptjs');
const  Schema = mongoose.Schema;

const usuarios = new Schema({
    nombre :  String,
    apellidos : String,
    nickname : String,
    fecha : String,
    correo : String,
    contra : String,
    edad : Number,
    admin : {
        default: false,
        type: Boolean
    }
});

usuarios.methods.encryptPassword = async contra => {
    const salt = await bycript.genSalt(10);
    return await bycript.hash(contra,salt);
};

usuarios.methods.matchPassword = async function(contra){
    return await bycript.compare(contra,this.contra);
};

module.exports = mongoose.model('usuarios',usuarios);