module.exports = mongoose => {
  var schema = mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    actived: {
      type: Boolean,
      required: true
    },
    role: {
      type: String,
      enum: ['ESTUDIANTE', 'LÍDER', 'ADMINISTRADOR'],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
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

  const User = mongoose.model("user", schema);
  return User;
};