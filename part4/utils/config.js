require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SEKRET = process.env.SEKRET;

module.exports = { PORT, MONGO_URI, SEKRET };
