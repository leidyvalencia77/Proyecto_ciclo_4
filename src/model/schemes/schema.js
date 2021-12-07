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
        student: ID,
        accepted: Boolean
    }

    type Progress {
        id: ID,
        description: String,
        student: ID,
        observation: String
    }

    type Objective {
        id: ID,
        title: String,
        accomplished: Boolean
    }

    type Project {
        id: ID
        title: String
        generalObjective: Objective
        specificObjectives: [Objective]
        stage: String
        startDate: String,
        finishDate: String,
        budget: Float,
        detailsBudget: [DetailsBudget],
        leaderInChange: ID,
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

    input ObjectiveInput {
        title: String!
    }

    input ProjectInput{
        title: String!
        generalObjective: ObjectiveInput!
        specificObjectives: [ObjectiveInput]!
        startDate: String!
        finishDate: String!
        budget: Float!
    }

    input RegisterProgressInput{
        description: String!
        observation: String!
        student:ID
    }

    type Mutation{
        # Usuarios
        registerUser(input:UserInput): User
        authenticateUser(input:AuthenticateInput): Token
        updateUser(id:ID!, input:UpdateUserInput): User
        activateUser(id:ID!, input:ActivateUserInput): User

        # Proyectos
        registerProject(input:ProjectInput): Project
        registerProgressInProject(id:ID!, input:RegisterProgressInput): Project
    }

    type Query{
        # Usuarios
        getUsers: [User]
        getUser(id:ID!): User

        # Proyectos
        getProjects: [Project]
        getProject(id:ID!): Project
    }
`;

module.exports = typeDefs;