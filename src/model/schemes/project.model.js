module.exports = mongoose => {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    generalObjective: {
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
      enum: ['pendingApproval', 'approved', 'inProgress', 'cancelled', 'suspended', 'inReview', 'completed'],
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
      userId: {
        type: String,
        required: true
      },
      fullname: {
        type: String,
        required: true
      }
    },
    studentMembers: [{
      userId: {
        type: String,
        required: true
      },
      fullname: {
        type: String,
        required: true
      }
    }],
    registeredStudent: [{
      userId: {
        type: String,
        required: true
      },
      fullname: {
        type: String,
        required: true
      },
      accepted: {
        type: Boolean,
        required: true
      }
    }],
    progress: [{
      descriptionId: {
        type: String,
        required: true
      },
      student: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      observation: {
        type: String,
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