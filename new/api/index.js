const mongoose = require("mongoose");

const MONGO_URI = 'mongodb+srv://tusharthiteofficial:JnEK9MfAGppdcOyg@kfpl.rkcwv.mongodb.net/kfpl1';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});


module.exports = connectToDatabase;
