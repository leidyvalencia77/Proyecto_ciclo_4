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

    type StudentMember {
        id: ID!
        fullName: String!
        inscriptionStatus: String
        dateOfAdmission: String
        egressDate: String
    }

    type StudentsByProject {
        projectId: ID!
        students: [StudentMember]!
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
        studentsInProject: [StudentMember]!
        progress: [Progress]!
    }

    # --- --- --- ---
    # --- INPUTS ---
    # --- --- --- ---

    input UserInput {
        documentId: String!
        fullname: String!
        email: String!
        password: String!
        role: String!
        status: String!
        address: String!
        phone: String!
    }

    input UpdateUserInput {
        fullname: String
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
        registerProgressInProject(id: ID!, input: ProgressInput): Project
        updateProjectData(projectId: ID!, input: UpdateProjectDataInput): Project
        updateSpecificObjective(projectId: ID!, objectiveId: ID!, input: UpdateSpecificObjectiveInput): Project
        updateInscriptionStatus(projectId: ID!, studentId: ID!, inscriptionStatus: String!): Project
        updateProgressDescription(projectId: ID!, progressId: ID!, description: String): Project
        updateProgressObservation(projectId: ID!, progressId: ID!, observation: String): Project
    }

    # --- QUERYS ---

    type Query {
        # Usuarios
        getUsers: [User]
        getUser(id: ID!): User

        # Proyectos
        getProjects: [Project]
        getProject(id: ID!): Project
        getProjectsByLeader(leaderId: ID!): [Project]
        listInscriptions(leaderId: ID!): StudentsByProject
        myProjects: [Project]
    }
`;

module.exports = typeDefs;
