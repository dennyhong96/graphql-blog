require("dotenv").config({ path: "./config/config.env" });
const express = require("express");

const app = express();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));
