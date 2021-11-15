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
    var bcrypt = require("bcryptjs");
    var User = database.user;
    User.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            const data = [{
                fullname: "Leydy Viviana Valencia Hidalgo",
                email: "leidy.valencia77@gmail.com",
                password: bcrypt.hashSync("123456-", 8),
                actived: true,
                role: 'LÍDER',
                address: "Carrera 6 # 34-67",
                phone: "3113808204"
            }, {
                fullname: "Andres Perez Correa",
                email: "correa12@gmail.com",
                password: bcrypt.hashSync("123456-", 8),
                actived: false,
                role: 'ESTUDIANTE',
                address: "Calle 45 # 34-67",
                phone: "3203808204"
            }, {
                fullname: "Juan Jose Pineda Franco",
                email: "jj.2007@gmail.com",
                password: bcrypt.hashSync("123456-", 8),
                actived: false,
                role: 'ESTUDIANTE',
                address: "Calle 9 # 3-7",
                phone: "3223808204"
            }, {
                fullname: "Carlos Olaya Pulgarin",
                email: "carlo.pulgarin23@gmail.com",
                password: bcrypt.hashSync("123456-", 8),
                actived: false,
                role: 'ADMINISTRADOR',
                address: "Av, Carrera 71 # 32-7",
                phone: "3013808204"
            }]
            User.collection.insertMany(data, function (err, res) {
                if (err) throw err;
                console.log("Datos insertados");
            });
        }
    });
}
module.exports = database;