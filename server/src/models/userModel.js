const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImagePath } = require("../secret");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User Name is required' ],
    trim: true,
    maxlength: [31, 'Name must be at most 31 characters long'],
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'please enter a valid email' 
    }
  },

   password: {
    type: String,
    required: [true, 'User password is required' ],
    minlength: [6, 'password must be at least 6 characters long'],

    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },


   image: {
    type: String,
    default: defaultImagePath,

  },

  address: {
    type: String,
    required: [true, 'User address is required' ],
  },

  phone: {
    type: String,
    required: [true, 'User phone number is required' ],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },

});
  {timestamps: true};


const User = model("User", userSchema);

module.exports = User;