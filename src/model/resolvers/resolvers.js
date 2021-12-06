const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({path:'variables.env'})

//Definicion de esquemas de base de datos
const User = require(path.join('../entities', 'user.entity'))(mongoose);
const Project = require(path.join('../entities', 'project.entity'))(mongoose);

const createToken = (user) => {
    const {
        id,
        fullname,
        email,
        role
    } = user;

    return jwt.sign({
        id,
        fullname,
        email,
        role
    }, process.env.SECRET_JWT, {
        expiresIn: Number(process.env.EXPIRATION_JWT)
    })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_JWT);
}

const resolvers = {

    Query: {
        // Operaciones de la entidad User
        getUsers: async (_, {token}, ctx) => {
            const userId = await verifyToken(token);
            if (!userId) {
                throw new Error("El token no es correcto");
            }
            return User.find({});
        },
        getUser: async (_, {token}) => {
            const userId = await verifyToken(token);
            return userId;
        },// Operaciones de la entidad Project
        getProjects: async (_, {token}) => {
            const userId = await verifyToken(token);
            if (!userId) {
                throw new Error("El token no es correcto");
            }
            return Project.find({});
        },
        getProject: async (_, {id}) => {
            //Validar si el proyecto existe
            const isProject = await Project.findOne({id});
            if (!isProject) {
                throw new Error("El proyecto no existe");
            }

            return isProject;
        }
    },

    Mutation: {
        registerUser: async (_, {input}) => {

            const {email, password} = input;

            //Validar si el usuario esta registrado
            const isUser = await User.findOne({email});
            if (isUser) {
                throw new Error("El usuario ya está registrado");
            }

            // Encriptar password
            input.password = bcrypt.hashSync(password, 10);


            // Registrar usuario
            try {
                const record = new User(input);
                record.save();
                return record;
            } catch (err) {
                console.log("¡No se logró registrar el usuario!", err);
            }


        },
        authenticateUser: async (_, {input}) => {
            const {email, password} = input;

            //Validar si el usuario esta registrado
            const isUser = await User.findOne({email});
            if (!isUser) {
                throw new Error("El usuario no está registrado");
            }

            //Validar si el password del usuario es correcto
            const isPassword = await bcrypt.compare(password, isUser.password);
            if (!isPassword) {
                throw new Error("El password no es correcto");
            }

            //Crear token para el usuario
            return{
                token: createToken(isUser)
            }
        },
        updateUser:  async (_, {id, input}) => {

            //Validar si el usuario esta registrado
            let isUser = await User.findOne({id});
            if (!isUser) {
                throw new Error("El usuario no está registrado");
            }

            //Actualizar datos
            isUser = await User.findOneAndUpdate({_id:id}, input, {new: true});

            return isUser;

        },
        activateUser:  async (_, {id, input}) => {

            //Validar si el usuario esta registrado
            let isUser = await User.findOne({id});
            if (!isUser) {
                throw new Error("El usuario no está registrado");
            }

            //Actualizar datos
            isUser = await User.findOneAndUpdate({_id:id}, input, {new: true});

            return isUser;

        },
        registerProject: async(_, {input}) => {

            // Registrar proyecto
            try {
                const record = new Project(input);
                record.save();
                return record;
            } catch (err) {
                console.log("¡No se logró registrar el proyecto!", err);
            }
        }
    },
}

module.exports = resolvers;