module.exports = mongoose => {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    specificObjectives: [{
      title: {
        type: String,
        required: true
      },
      accomplished: {
        type: Boolean,
        required: true
      }
    }],
    accomplishedExecution: {
      type: Boolean,
      required: true
    },
    stage: {
      type: String,
      enum: ['PENDIENTE', 'APROBADO', 'EN PROGRESO', 'CANCELADO', 'SUSPENDIDO', 'EN REVISIÓN', 'COMPLETADO'],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    finishDate: {
      type: Date,
      required: false
    },
    budget: {
      type: Number,
      required: true
    },
    detailsBudget: [{
      reason: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }],
    leaderInChange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    studentMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }],
    tasks: [{
      relatedSpecificObjective: {
        type: String,
        required: true
      },
      assignedStudentId: {
        type: String,
        required: true
      },
      assignedStudentName: {
        type: String,
        required: true
      },
      accomplished: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      progress: [{
        commentDate: {
          type: Date,
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        observation: {
          type: String,
          required: false
        }
      }],
      status: {
        type: String,
        enum: ['SIN ASIGNAR', 'ASIGNADA', 'EN PROGRESO', 'EN REVISIÓN', 'COMPLETADA'],
        required: true
      }
    }],
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("project", schema);
  return Project;
};