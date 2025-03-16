const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const date = new Date();
const day = date.getUTCDate();
const month = date.getUTCMonth() + 1;
const year = date.getUTCFullYear();
const logPath = __dirname + `/logs/log-${year}-${month}-${day}.txt`;
fs.appendFileSync(logPath, `start of the server${date.toLocaleString()} \n`);
// ^ task 1------------------------------------------------------------
// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//custom middleware
app.use(function (req, res, next) {
  //   console.log(`Request URL: ${req.url}
  //                   Request body: ${JSON.stringify(req.body)}
  //                   Request headers: ${JSON.stringify(req.headers)}`);
  next();
});
// ^---------------------------------------------------------------------

// * task 2 Serving Static Files with express.static()
app.use(express.static("public"));
// ^ task 3
// const EventEmitter = require("node:events");
// const eventEmitter = new EventEmitter();
// eventEmitter.on("requestReceived", (req) => {
//   console.log("request received", req.url);
// });
// app.get("/test", function (req, res) {
//   eventEmitter.emit("requestReceived", req);
//   res.send();
// });
//? task 4

app.use(function (req, res, next) {
  const formattedTime = new Date().toLocaleString();
  fs.appendFileSync(logPath, `${req.url}  ${formattedTime} \n`);
  next();
});
app.use(function (req, res, next) {
  const content = fs.readFileSync(logPath);
  console.log(String(content));
  next();
});
app.listen(8080, function () {
  console.log("Server is listening on localhost port 8080");
});
