const express = require("express");
const path = require("path");
require("dotenv").config();

// needed to add this so that the frontend could make a request and see the response
var cors = require("cors");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

// using cors so that the response has the correct headers which allow the front end to read the response
app.use(cors());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

require("./routes/new.js")(app);
require("./routes/home.js")(app);
require("./routes/delete.js")(app);
require("./routes/update.js")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Answer API requests.
app.get("/api", function (req, res) {
  res.set("Content-Type", "application/json");
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, function () {
  console.error(`Node : listening on port ${PORT}`);
});

const uri = process.env.DB_URI;
console.log(uri);
mongoose.Promise = global.Promise;

// useMongoClient not working
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function () {
  console.log("Connection to Mongo established.");
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = app;
