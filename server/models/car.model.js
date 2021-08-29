const mongoose = require("mongoose");

// building a schema for the Cars database model, make, owner, registraition, address

let CarSchema = mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: false,
    default: "anonymous",
  },
  registration: {
    type: String,
    required: true,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
});

// create the model and put it in the exports object so that other files can use it
module.exports = mongoose.model("Cars", CarSchema);
