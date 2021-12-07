module.exports = mongoose => {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    generalObjective: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      title: {
        type: String,
        required: true
      },
      accomplished: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    specificObjectives: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      title: {
        type: String,
        required: true
      },
      accomplished: {
        type: Boolean,
        required: true,
        default: false
      }
    }],
    stage: {
      type: String,
      enum: ['pendingApproval', 'approved', 'inProgress', 'cancelled', 'suspended', 'inReview', 'completed'],
      required: true,
      trim: true,
      default: 'pendingApproval'
    },
    startDate: {
      type: String,
      required: true,
      trim: true
    },
    finishDate: {
      type: String,
      required: true,
      trim: true
    },
    budget: {
      type: Number,
      required: true,
      trim: true,
      default: 0
    },
    detailsBudget: [{
      reason: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true,
        trim: true,
        default: 0
      }
    }],
    leaderInChange: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    studentMembers: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      accepted: {
        type: Boolean,
        default: false
      }
    }],
    progress: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
    object.id = _id.toHexString();
    return object;
  });

  const Project = mongoose.model("project", schema);
  return Project;
};