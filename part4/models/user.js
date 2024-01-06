const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator, {
  message: "Error, expected username to be unique.",
});

userSchema.set("toJSON", {
  transform: (document, user) => {
    user.id = user._id.toString();
    delete user._id;
    delete user.__v;
    delete user.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
