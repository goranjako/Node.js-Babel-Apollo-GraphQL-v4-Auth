import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
//connectDb
const connectDB = async () => {
  try {
    // Set `strictQuery` to `false` to prepare for the change
//mongoose.set('strictQuery', false);

// Set `strictQuery` to `true` to suppress the warning message
mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, useUnifiedTopology: true
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
    return mongoose.disconnect();
  } catch (error) {
    console.log("Database disconnection error", error);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };