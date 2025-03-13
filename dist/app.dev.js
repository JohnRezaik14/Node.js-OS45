"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var cars = []; //* dashboard page

app.get("/carsDash", function (req, res) {
  res.sendFile(__dirname + "/views/carDashboard.html");
}); //*------- read/show all cars
//^------- get /cars

app.get("/cars", function (req, res) {
  res.send(cars);
}); //*------- get specific car
//^------- get /car req.query.id which car to get

app.get("/car", function (req, res) {
  var id = req.query.id;
  var carIndex = cars.findIndex(function (car) {
    return car.id == id;
  });

  if (carIndex) {
    res.send(cars[carIndex]);
  } else {
    res.send({
      message: "Can not find this car"
    });
  }
}); //*------- create car
//^------- post /car req.body for car object

app.post("/car", function (req, res) {
  var car = req.body;
  cars.push(car); //console.log("added", car);

  res.send({
    message: "Car is added successfully"
  });
}); //*------- update car
//^------- put /car req.body for car properties
//?------- req.query.id for the car which will be edited

app.put("/car", function (req, res) {
  var carId = req.query.id;
  var car = req.body;
  cars = cars.map(function (el) {
    if (el.id == carId) {
      //console.log("edited", el);
      return car;
    } else {
      return el;
    }
  });
  res.send({
    message: "Car edited successfully"
  });
}); //*------- delete car
//^------- delete /car req.query.id

app["delete"]("/car", function (req, res) {
  var id = req.query.id;
  cars = cars.filter(function (car) {
    if (car.id == id) {
      res.json({
        message: "Car deleted successfully"
      }); //console.log("deleted", car);

      return false;
    } else {
      return true;
    }
  });
  res.send();
});
app.listen(8080, function () {//console.log("server is listening to local host port 8080");
});