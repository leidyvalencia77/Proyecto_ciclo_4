const {gql} = require('apollo-server');

//Schema
const typeDefs = gql `

    type User {
        id: ID
        fullname: String
        email: String
        actived: Boolean
        role: String
        address: String
        phone: String
    }

    type Token {
        token: String
    }

    type DetailsBudget {
        reason: String,
        amount: Int
    }

    type StudentMember {
        student: User,
        accepted: Boolean
    }

    type Progress {
        id: ID,
        description: String,
        student: User,
        observation: String
    }

    type Objective {
        id: ID,
        title: String,
        isMain: Boolean,
        accomplished: Boolean
    }

    type Project {
        # The user's password.
        id: ID
        title: String
        objectives: [Objective]
        stage: String
        startDate: String,
        finishDate: String,
        budget: Float,
        detailsBudget: [DetailsBudget],
        leaderInChange: User,
        studentMembers: [StudentMember],
        progress: [Progress]
    }

    input UserInput{
        fullname: String!
        email: String!
        password: String!
        role: String!
        address: String!
        phone: String!
    }

    input UpdateUserInput{
        fullname: String
        address: String
        phone: String
    }

    input ActivateUserInput{
        actived: Boolean!
    }

    input AuthenticateInput{
        email: String!
        password: String!
    }

    input ProjectInput{
        title: String!
        startDate: String!
        finishDate: String!
        budget: Float!
        leaderInChange:String!
    }

    type Mutation{
        # Usuarios
        registerUser(input:UserInput): User
        authenticateUser(input:AuthenticateInput): Token
        updateUser(id:ID!, input:UpdateUserInput): User
        activateUser(id:ID!, input:ActivateUserInput): User

        # Proyectos
        registerProject(input:ProjectInput): Project
    }

    type Query{
        # Usuarios
        getUsers(token:String!): [User]
        getUser(token:String!): User

        # Proyectos
        getProjects(token:String!): [Project]
        getProject(id:ID!): Project

    }
`;

module.exports = typeDefs;