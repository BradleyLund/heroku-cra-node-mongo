const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// I used a tutorial at this website to implement saving the password as a hash and implementing comparison function
// https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt

// create a subschema for the todo list array, this will allow us to save the todolist item and let it have an id for deleting
let ToDoSubSchema = mongoose.Schema({
  todoDescription: String,
});

let UserSchema = mongoose.Schema({
  username: String,
  password: String,
  toDoArray: [ToDoSubSchema],
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        console.log(saltError);
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            console.log(hashError);
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    JSON.stringify({ username: this.username }),
    process.env.ACCESS_TOKEN_SECRET,
    { algorithm: "HS256" }
  );
};

module.exports = mongoose.model("Users", UserSchema);
