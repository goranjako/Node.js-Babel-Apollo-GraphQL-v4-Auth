"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongoose = _interopRequireDefault(require("mongoose"));
_dotenv.default.config();
//connectDb
const connectDB = async () => {
  try {
    // Set `strictQuery` to `false` to prepare for the change
    //mongoose.set('strictQuery', false);

    // Set `strictQuery` to `true` to suppress the warning message
    _mongoose.default.set('strictQuery', true);
    await _mongoose.default.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connection successfull");
  } catch (error) {
    console.error("Database Connection fail", error);
    process.exit(1);
  }
};
//disconnectDb
const disconnectDB = async () => {
  try {
    console.log("Database connection close");
    return _mongoose.default.disconnect();
  } catch (error) {
    console.log("Database disconnection error", error);
    process.exit(1);
  }
};
module.exports = {
  connectDB,
  disconnectDB
};