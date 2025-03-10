require("dotenv").config();
console.log("🔍 Variables de entorno:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

// Importations
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const sequelize = require("./config/database"); // Import the connection to the database

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 5000;

// Test connection to the database
sequelize
  .authenticate()
  .then(() => console.log("Database connected to Sequelize"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Synchronize models with the database
sequelize
  .sync({ force: false }) // `force: false` prevents deletion of existing data
  .then(() => console.log("Database synchronized with Sequelize"))
  .catch((err) =>
    console.error("Error while synchronizing the database:", err)
  );

// Test route
app.get("/", (req, res) => {
  res.send("Server running correctly");
});

const authRoutes = require("./routes/auth"); // Import the routes from the file
app.use("/auth", authRoutes); //  We use the routes on the server
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
