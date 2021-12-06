module.exports = mongoose => {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    objectives: [{
      id: {
      type: String,
      required: true,
      default: new mongoose.Schema.ObjectId()
      },
      title: {
        type: String,
        required: true
      },
      isMain: {
        type: Boolean,
        required: true,
        default: false
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
      type: Date,
      required: true,
      default: new Date()
    },
    finishDate: {
      type: Date,
      required: true
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
      type: mongoose.ObjectId,
      ref: 'User'
    },
    studentMembers: [{
      student: {
        type: mongoose.ObjectId,
        ref: 'User'
      },
      accepted: {
        type: Boolean,
        required: true,
        default: false
      }
    }],
    progress: [{
      id: {
        type: String,
        required: true,
        default: new mongoose.Schema.ObjectId()
      },
      student: {
        type: mongoose.ObjectId,
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
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("project", schema);
  return Project;
};