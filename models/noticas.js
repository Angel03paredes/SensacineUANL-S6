const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const noticias = new Schema({
    title : String,
    description : String
});

module.exports = mongoose.model('noticias',noticias);