const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sahilchauksey123:sahilchauksey123@cluster0.blk9h7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DatabaseConnected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
