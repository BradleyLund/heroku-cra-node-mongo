module.exports = function (app) {
  const car = require("../controllers/car.controller.js");
  app.get("/", car.findAll);
};
