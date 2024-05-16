const { initialiseDatabase } = require("./db/db.connect");

// Importing libraries
const bcrypt = require("bcryptjs")
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Import Router
const products = require("./routes/product.routes");
const users = require("./routes/user.routes");

// Using middlewares

app.use(cors());

app.use(helmet());

app.use(express.json());

// Connecting to database
initialiseDatabase();

// App

app.get("/", (req, res) => {
  res.send("Gadget lo app");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Route paths

app.use("/products", products);
app.use("/users", users);

// For errors

app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// If route does not exists

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
