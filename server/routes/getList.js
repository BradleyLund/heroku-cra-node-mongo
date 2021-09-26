module.exports = function (app) {
  const user = require("../controllers/user.controller.js");
  app.get("/getlist", user.getTodoList);
};
