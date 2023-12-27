const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URL;
console.log(url);

console.log("connecting to ", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MONGO DB");
  })
  .catch((error) => {
    console.log("Error connecting to mongo db", error.message);
  });

const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
        return false;
      }
      return true;
    },
    msg: "must be at least 8 digits",
  },
  {
    // Regex validator to allow only numbers
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    msg: "invalid phone number",
  },
];

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: numberValidators,
    required: true,
  },

  // } String,
  // number: String,
});

PersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", PersonSchema);
