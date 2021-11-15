const mongoose = require('mongoose');
const path = require('path');

const dbconfig = require('./dbconfig');

const schemes = '../schemes';

const database = {};

database.mongoose = mongoose;

//Esquemas de la base de datos
database.user = require(path.join(schemes, 'user.model.js'))(mongoose);
database.project = require(path.join(schemes, 'project.model.js'))(mongoose);

// Creacion de conexión a la base de datos 
mongoose
    .connect(dbconfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("¡Se logró la conexión con la base de datos!");
        populateBD();
    })
    .catch(err => {
        console.log("¡No se logró la conexión con la base de datos!", err);
        process.exit();
    });

function populateBD() {

}
module.exports = database;