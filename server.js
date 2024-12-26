const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const logger = require("./logger");
const cors =require("cors")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to MongoDB successfully");
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((error) => logger.error(`Database connection error: ${error.message}`));
