require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(cors(process.env.CLIENT_URL));
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));
