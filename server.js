// // Dependencies
// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const path = require("path")


// const PORT = process.env.PORT || 8080;

// const app = express();

// // Middleware
// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// require("./routes/HTMLroutes.js")(app, path)
// require("./routes/APIroutes.js")(app)

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Listen 
// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}!`);
// });

const http = require("http")
const chalk = require("chalk")
const app = require("./app")

const PORT = process.env["PORT"] ?? 8080
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Get your routine on!")
  )
})