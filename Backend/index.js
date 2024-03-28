const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

async function connectToDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB Connected');
  } catch (error) {
    console.log('DB Connection Error');
  }
}

connectToDB();

// mongoose.connect(process.env.MONGO_URL);
// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });
// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
