const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve static files from the "public" directory
