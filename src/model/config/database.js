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
                console.log("Datos insertados en colección User");
            });
        }
    });

    var Project = database.project;
    var ObjectId = require('mongodb').ObjectID;

    Project.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            const data = [{
                title: "Investigación de Sistemas operativos",
                generalObjective: "Recoletar información sobre el uso de S.O. en Colombia",
                specificObjectives: [{title:"Definir el porcentaje de uso de los S.O. en Colombia", accomplished:false},
                                     {title:"Establecer los beneficios de cada S.O utilizado Colombia", accomplished:true}],
                accomplishedExecution: true,
                stage: 'inProgress',
                startDate: new Date(),
                finishDate: new Date(),
                budget: 900000000,
                detailsBudget: [{reason:"Encuestas a las 5 empresas mas exitosas de cada ciudad primario, secundaria y terciaria", amount:100000000},
                                {reason:"Viaticos para 5 equipos que visitaran a las 5 empresas mas exitosas de cada ciudad primario, secundaria y terciaria", amount:200000000},
                                {reason:"Adquisición de software para realizar modelos estadisticos", amount:600000000}],
                leaderInChange: {userId:"6192e0bb7cbea30842c107c6", fullname:"Leydy Viviana Valencia Hidalgo"},
                studentMembers: [{userId:"6192e0bb7cbea30842c107c7", fullname:"Andres Perez Correa"},
                                 {userId:"6192e0bb7cbea30842c107c8", fullname:"Juan Jose Pineda Franco"}],
                registeredStudent: [{userId:"6192e0bb7cbea30842c107c7", fullname:"Andres Perez Correa", accepted:false},
                                    {userId:"6192e0bb7cbea30842c107c8", fullname:"Juan Jose Pineda Franco", accepted:true}],
            },
            {
                title: "Investigación de Sistemas operativos 2",
                generalObjective: "Recoletar información sobre el uso de S.O. en Colombia - Fase 2",
                specificObjectives: [{title:"Definir el porcentaje de uso de los S.O. en Colombia", accomplished:false},
                                     {title:"Establecer los beneficios de cada S.O utilizado Colombia", accomplished:true}],
                accomplishedExecution: true,
                stage: 'inProgress',
                startDate: new Date(),
                finishDate: new Date(),
                budget: 900000000,
                detailsBudget: [{reason:"Encuestas a las 5 empresas mas exitosas de cada ciudad primario, secundaria y terciaria", amount:100000000},
                                {reason:"Viaticos para 5 equipos que visitaran a las 5 empresas mas exitosas de cada ciudad primario, secundaria y terciaria", amount:200000000},
                                {reason:"Adquisición de software para realizar modelos estadisticos", amount:600000000}],
                leaderInChange: {userId:"6192e0bb7cbea30842c107c6", fullname:"Leydy Viviana Valencia Hidalgo"},
                studentMembers: [{userId:"6192e0bb7cbea30842c107c7", fullname:"Andres Perez Correa"},
                                 {userId:"6192e0bb7cbea30842c107c8", fullname:"Juan Jose Pineda Franco"}],
                registeredStudent: [{userId:"6192e0bb7cbea30842c107c7", fullname:"Andres Perez Correa", accepted:false},
                                    {userId:"6192e0bb7cbea30842c107c8", fullname:"Juan Jose Pineda Franco", accepted:true}],
            }]

            
            Project.collection.insertMany(data, function (err, res) {
                if (err) throw err;
                console.log("Datos insertados en colección Project");
            });
        }
    });
}
module.exports = database;