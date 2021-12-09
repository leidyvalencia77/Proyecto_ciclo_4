const { gql } = require('apollo-server');

//Schema
const typeDefs = gql`
    # --- --- --- ---
    # --- TYPES ---
    # --- --- --- ---

    type User {
        id: ID!
        documentId: String!
        email: String!
        fullName: String!
        role: String!
        status: String
        address: String
        phone: String
    }

    type Token {
        token: String
    }

    type StudentInProject {
        studentId: ID
        fullName: String
        inscriptionStatus: String
        dateOfAdmission: String
        egressDate: String
    }

    type StudentsByProject {
        projectId: ID!
        students: [StudentInProject]!
    }

    type Progress {
        id: ID!
        studentId: ID!
        studentFullName: String!
        createdDate: String!
        description: String!
        observation: String
    }

    type LeaderInCharge {
        id: ID!
        fullName: String!
        documentId: String!
    }

    type Objective {
        id: ID
        title: String
        accomplished: Boolean
    }

    type Project {
        id: ID!
        title: String!
        generalObjective: String!
        specificObjectives: [Objective]!
        budget: Int
        startDate: String
        finishDate: String
        leaderInCharge: LeaderInCharge!
        status: String
        stage: String
        studentsInProject: [StudentInProject]!
        progress: [Progress]!
    }

    # --- --- --- ---
    # --- INPUTS ---
    # --- --- --- ---

    input UserInput {
        documentId: String!
        fullName: String!
        email: String!
        password: String!
        role: String!
        status: String!
        address: String
        phone: String
    }

    input UpdateUserInput {
        fullName: String
        email: String
        password: String
        address: String
        phone: String
    }

    input UpdateStatusUserInput {
        status: String!
    }

    input AuthenticateInput {
        email: String!
        password: String!
    }

    input ObjectiveInput {
        title: String!
    }

    input LeaderInChargeInput {
        id: ID!
        fullName: String!
        documentId: String!
    }

    input ProjectInput {
        title: String!
        generalObjective: String
        specificObjectives: [ObjectiveInput]!
        budget: Int!
        startDate: String!
        finishDate: String!
        leaderInCharge: LeaderInChargeInput!
        studentsInProject: [StudentMemberInput]!
        progress: [ProgressInput]!
    }

    input StudentMemberInput {
        id: ID!
        fullName: String!
        inscriptionStatus: String
        dateOfAdmission: String
        egressDate: String
    }

    input ProgressInput {
        studentId: ID!
        studentFullName: String!
        description: String!
    }

    input UpdateProgressDescription {
        description: String!
    }

    input UpdateProgressObservation {
        observation: String!
    }

    input UpdateProjectDataInput {
        title: String
        budget: Int
        generalObjective: String
    }

    input UpdateSpecificObjectiveInput {
        _id: ID!
        title: String
        accomplished: Boolean
    }

    # --- START - PARA REVISAR ---
    input ActivateUserInput {
        actived: Boolean!
    }
    # --- FIN - PARA REVISAR ---

    # --- --- --- ---
    # --- MUTATIONS ---
    # --- --- --- ---

    type Mutation {
        # --- Usuarios ---
        authenticateUser(input: AuthenticateInput): Token
        registerUser(input: UserInput): User
        updateUser(id: ID!, input: UpdateUserInput): User
        activateUser(id: ID!, input: UpdateStatusUserInput): User

        # --- Proyectos ---
        registerProject(input: ProjectInput): Project
        updateProjectData(projectId: ID!, input: UpdateProjectDataInput): Project
        registerProgressInProject(projectId: ID!, description: String!): Project

        # --- PENDIENTES PROBAR ---
        updateProgressObservation(projectId: ID!, progressId: ID!, observation: String!): Project
        updateProgressDescription(projectId: ID!, progressId: ID!, description: String!): Project

        # --- PENDIENTES CREAR ---
        updateSpecificObjective(projectId: ID!, objectiveId: ID!, input: UpdateSpecificObjectiveInput): Project
        updateInscriptionStatus(projectId: ID!, studentId: ID!, inscriptionStatus: String!): Project
        registerInProject(projectId: ID!): Project
    }

    # --- QUERYS ---

    type Query {
        # Usuarios
        getUsers: [User]
        getUser(id: ID!): User

        # Proyectos
        getProjects: [Project]
        getProject(id: ID!): Project
        getProjectsByLeader: [Project]
        getProjectsActives: [Project]
        myProjects: [Project]

        # --- PENDIENTES ---
        getProjectByLeader(projectId: ID): Project
        listInscriptions(leaderId: ID!): StudentsByProject
    }
`;

module.exports = typeDefs;
