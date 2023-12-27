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

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

PersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", PersonSchema);
