const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

function isAuthenticated(req, res) {
  let authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    res.send("badtoken");
  }
}

module.exports = {
  deleteTodoById: function (req, res) {
    // here we need to check the jwt then find the user and delete
    // the item from the to do array with the id given in the req.body
    let userObject = isAuthenticated(req, res);

    // find the user in the db
    User.findOne({ username: userObject.username }).exec(function (
      error,
      user
    ) {
      if (error) {
        res.send("error with the mongoose findOne function");
      } else if (!user) {
        res.send("that username was not found in the DB");
      } else {
        // find the exercise with the id given
        let indexToDelete;
        for (let i = 0; i < user.toDoArray.length; i++) {
          if (user.toDoArray[i]._id == req.body._id) {
            indexToDelete = i;
          }
        }
        if (typeof indexToDelete != "undefined") {
          user.toDoArray.splice(indexToDelete, 1);
          // // // save the user
          user.save(function (error, data) {
            if (error) {
              console.log(error);
              res.send("some error ocurred while adding the todo");
            } else {
              // maybe send back in res.json (username and the todoarray? or just the todoarray)
              res.send(data.toDoArray);
            }
          });
        } else {
          res.send("that todo item was not found");
        }
      }
    });
  },

  addTodo: function (req, res) {
    // here we will receive a string description to add to the to do list
    // authenticate the user, then add the string to the array of todos
    // and respond with the new list of todos

    // authenticate the user
    let userObject = isAuthenticated(req, res);

    // find the user in the db
    User.findOne({ username: userObject.username }).exec(function (
      error,
      user
    ) {
      if (error) {
        res.send("error with the mongoose findOne function");
      } else if (!user) {
        res.send("that username was not found in the DB");
      } else {
        user.toDoArray.push({ todoDescription: req.body.todoDescription });
        // // // save the user
        user.save(function (error, data) {
          if (error) {
            console.log(error);
            res.send("some error ocurred while adding the todo");
          } else {
            // maybe send back in res.json (username and the todoarray? or just the todoarray)
            res.send(data.toDoArray);
          }
        });
      }
    });
  },

  getTodoList: function (req, res) {
    // Here we send the todo list for the user that was requested
    // we need to receive the user id, the jwt token, veryify the token,
    // then find and send back the list of todos
    // verify the token received using the isAuthenticated method above
    let userObject = isAuthenticated(req, res);

    // find the username in the db
    User.findOne({ username: userObject.username }).exec(function (
      error,
      user
    ) {
      if (error) {
        res.send("error with the mongoose findOne function");
      } else if (!user) {
        // no username with that name was found
        res.send("no username found in the DB");
      } else {
        res.send(user.toDoArray);
      }
    });
  },

  createANewUser: function (req, res) {
    // can use a findone method here and if the username is found then respond with no you cannot create a new username with this username
    User.findOne({ username: req.body.username }).exec(function (error, user) {
      if (error) {
        //   error with the mongoose findone function
        res.send("error with the mongoose findone function");
      } else if (!user) {
        //   no username with that name found

        let userModel = new User({
          username: req.body.username,
          password: req.body.password,
          toDoArray: [],
        });

        userModel.save(function (error, user) {
          if (error) {
            res.send("error saving the user");
          } else {
            // Make the JWT Token that will be sent to the client side
            res.status(200).send({
              username: user.username,
              token: user.getSignedJwtToken(),
            });
          }
        });
      } else {
        // username found and need to respond with that username already exists
        res.status(401).send("that username already exists, try another one");
      }
    });
  },

  loginUser: function (req, res) {
    User.findOne({ username: req.body.username }).exec(function (error, user) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!user) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the username and now comparing
        user.comparePassword(req.body.password, function (matchError, isMatch) {
          if (matchError) {
            //   error with the compare function
            res.status(401).send("error with the compare function");
          } else if (!isMatch) {
            //   the password did not match, please re enter your password
            res
              .status(401)
              .send(
                "the password did not match, please re enter your password"
              );
          } else {
            //   the password did match welcom you are logged in
            // make the token and send back the user id
            res.status(200).send({
              username: user.username,
              token: user.getSignedJwtToken(),
            });
          }
        });
      }
    });
  },
};
