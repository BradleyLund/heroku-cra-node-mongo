module.exports = function (app) {
  const user = require("../controllers/user.controller.js");
  app.post("/addtodo", user.addTodo);
};
