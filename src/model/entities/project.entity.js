module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },
            generalObjective: {
                type: String,
                required: true,
            },
            specificObjectives: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        index: true,
                        required: true,
                        auto: true,
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    accomplished: {
                        type: Boolean,
                        required: true,
                        default: false,
                    },
                },
            ],
            budget: {
                type: Number,
                required: true,
                trim: true,
                default: 0,
            },
            status: {
                type: String,
                enum: ['activo', 'inactivo'],
                required: true,
                trim: true,
                default: 'inactivo',
            },
            stage: {
                type: String,
                enum: ['iniciado', 'en desarrollo', 'terminado'],
                required: true,
                trim: true,
                default: null,
            },
            startDate: {
                type: String,
                required: true,
                trim: true,
            },
            finishDate: {
                type: String,
                required: true,
                trim: true,
            },
            leaderInCharge: {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Users',
                },
                fullName: {
                    type: String,
                    required: true,
                },
                documentId: {
                    type: String,
                    required: true,
                },
            },
            studentMembers: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Users',
                    },
                    fullName: {
                        type: String,
                        required: true,
                    },
                    inscriptionStatus: {
                        type: String,
                        enum: ['aceptada', 'rechazada'],
                        required: true,
                        trim: true,
                        default: null,
                    },
                    dateOfAdmission: {
                        type: String,
                        trim: true,
                        default: null,
                    },
                    egressDate: {
                        type: String,
                        trim: true,
                        default: null,
                    },
                },
            ],
            progress: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        index: true,
                        required: true,
                        auto: true,
                    },
                    studentId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Users',
                    },
                    fulstudentFullNamelName: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    createdDate: {
                        type: String,
                        trim: true,
                        default: new Date(),
                    },
                    observation: {
                        type: String,
                        default: null,
                    },
                },
            ],
        },
        {
            timestamps: true,
        },
    );

    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id.toHexString();
        return object;
    });

    const Project = mongoose.model('project', schema);
    return Project;
};
