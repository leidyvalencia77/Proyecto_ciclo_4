const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//Definicion de esquemas de base de datos
const User = require(path.join('../entities', 'user.entity'))(mongoose);
const Project = require(path.join('../entities', 'project.entity'))(mongoose);

const createToken = (user) => {
    const { id, fullname, email, role } = user;

    return jwt.sign(
        {
            id,
            fullname,
            email,
            role,
        },
        process.env.SECRET_JWT,
        {
            expiresIn: Number(process.env.EXPIRATION_JWT),
        },
    );
};

const resolvers = {
    Query: {
        // Operaciones de la entidad User
        getUsers: async () => {
            const result = await User.find({});
            return result;
        },
        getUser: async (_, { id }) => {
            //Validar si el proyecto existe
            const result = await User.findById({ _id: id });
            if (!result) {
                throw new Error('El usuario no existe');
            }
            return result;
        }, // Operaciones de la entidad Project
        getProjects: async () => {
            const result = await Project.find({});
            return result;
        },
        getProject: async (_, { id }) => {
            //Validar si el proyecto existe
            const result = await Project.findById({ _id: id }).populate('progress');
            if (!result) {
                throw new Error('El proyecto no existe');
            }
            return result;
        },
        getProjectsByLeader: async (root, { leaderId }) => {
            const result = await Project.find({ leaderInChange: leaderId });
            return result;
        },
    },

    Mutation: {
        registerUser: async (_, { input }) => {
            const { email, password } = input;

            //Validar si el usuario esta registrado
            const isUser = await User.findOne({ email });
            if (isUser) {
                throw new Error('El usuario ya está registrado');
            }

            // Encriptar password
            input.password = bcrypt.hashSync(password, 10);

            // Registrar usuario
            try {
                const record = new User(input);
                record.save();
                return record;
            } catch (err) {
                console.log('¡No se logró registrar el usuario!', err);
            }
        },
        authenticateUser: async (_, { input }) => {
            const { email, password } = input;

            //Validar si el usuario esta registrado
            const isUser = await User.findOne({ email });
            if (!isUser) {
                throw new Error('El usuario no está registrado');
            }

            //Validar si el password del usuario es correcto
            const isPassword = await bcrypt.compare(password, isUser.password);
            if (!isPassword) {
                throw new Error('El password no es correcto');
            }

            //Crear token para el usuario
            return {
                token: createToken(isUser),
            };
        },
        updateUser: async (_, { id, input }) => {
            //Validar si el usuario esta registrado
            let isUser = await User.findById({ _id: id });
            if (!isUser) {
                throw new Error('El usuario no está registrado');
            }

            //Actualizar datos
            isUser = await User.findOneAndUpdate({ _id: id }, input, { new: true });

            return isUser;
        },
        activateUser: async (_, { id, input }) => {
            //Validar si el usuario esta registrado
            let isUser = await User.findById({ _id: id });
            if (!isUser) {
                throw new Error('El usuario no está registrado');
            }

            //Actualizar datos
            isUser = await User.findOneAndUpdate({ _id: id }, input, { new: true });

            return isUser;
        },
        registerProject: async (_, { input }, ctx) => {
            if (ctx.user.role != process.env.ROLE_LEADER) {
                throw new Error('El usuario no es Líder');
            }

            // Registrar proyecto
            const record = new Project(input);
            //Asignar lider de proyecto
            record.leaderInChange = ctx.user.id;
            try {
                const result = await record.save();
                return result;
            } catch (err) {
                console.log('¡No se logró registrar el proyecto!', err);
            }
        },
        registerProgressInProject: async (_, { id, input }, ctx) => {
            console.log(ctx);

            // if (ctx.user.role != process.env.ROLE_STUDENT) {
            //     throw new Error('El usuario no es Estudiante');
            // }

            //Validar si el proyecto esta registrado
            let result = await Project.findById({ _id: id });
            if (!result) {
                throw new Error('El proyecto no está registrado');
            }
            // input.student = ctx.user.id;
            //Actualizar datos
            result = await Project.findOneAndUpdate(
                { _id: id },
                { $push: { progress: input } },
                { new: true },
            ).populate('progress');

            return result;
        },

        updateDataOfProject: async (root, { projectId, input }) => {
            const projectExist = await Project.find({ _id: projectId });

            if (!projectExist) {
                throw new Error('El Proyecto consultado no existe');
            }

            const result = await Project.findOneAndUpdate({ _id: projectId }, { $set: input }, { new: true });

            return result;
        },
    },
};

module.exports = resolvers;
