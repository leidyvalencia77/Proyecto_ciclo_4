module.exports = mongoose => {
  var schema = mongoose.Schema({
    fullname: {
      type: String,
      required: true,
      trim: false
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    actived: {
      type: Boolean,
      required: true,
      default: false
    },
    role: {
      type: String,
      enum: ['ESTUDIANTE', 'LÍDER', 'ADMINISTRADOR'],
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    socialMedia: [{
      red: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      }
    }],
    notifications: [{
      date: {
        type: Date,
        required: true
      },
      read: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true,
        trim: true
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

  const User = mongoose.model("user", schema);
  return User;
};