/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const Car = require("../models/car.model.js");
const mongoose = require("mongoose");

exports.create = function (req, res) {
  // get the variables from the req here and replace them in the new Car
  // Create and Save a new car
  let carModel = new Car({
    model: req.query.model,
    make: req.query.make,
    owner: req.query.owner,
    registration: req.query.registration,
    address: req.query.address,
  });
  carModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the car." });
    } else {
      console.log(data);
      res.send("The car has been added");
    }
  });
};

exports.findAll = function (req, res) {
  Car.find(function (err, cars) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving Cars." });
    } else {
      // send it in json format
      res.send({ carsArray: cars });
    }
  });
};

exports.updateByCar = function (req, res) {
  // get the id that we want to update or if we want to update many if more than one in query parameter
  // will have to do a for loop and update one at a time with the ids I think
  //  I think we can use findmany and update and change thequery to say in [list of id's]
  // console.log(typeof req.query.isChecked);
  // res.send(typeof req.query.isChecked);
  // check to see if it is the update many or just update one, by seeing if the ischecked array is in the query
  if (req.query.isChecked !== undefined) {
    // res.send(req.query.isChecked);
    let checkedList = req.query.isChecked.split(",");
    // res.send(checkedList);
    let query = { _id: { $in: checkedList } };
    Car.updateMany(
      query,
      {
        model: req.query.model,
        make: req.query.make,
        owner: req.query.owner,
        registration: req.query.registration,
        address: req.query.address,
      },
      { new: true },
      function (err, doc) {
        if (err) {
          console.log("Something wrong when updating data!");
          res.send("ERROR: Not Updated. " + err);
        }
        res.send("Updated");
      }
    );
  } else {
    let query = { _id: req.query.id };
    Car.findOneAndUpdate(
      query,
      {
        model: req.query.model,
        make: req.query.make,
        owner: req.query.owner,
        registration: req.query.registration,
        address: req.query.address,
      },
      { new: true },
      function (err, doc) {
        if (err) {
          console.log("Something wrong when updating data!");
          res.send("ERROR: Not Updated. " + err);
        }
        res.send("Updated");
      }
    );
  }
};

exports.deleteCarsById = function (req, res) {
  // res.send(req.query);
  Car.findOneAndRemove({ _id: req.query.id }, function (err) {
    if (err) {
      console.log("ERROR: Car NOT removed. " + err);
      res.send("ERROR: Car NOT removed. " + err);
    }
    res.send("Car removed");
  });
};
