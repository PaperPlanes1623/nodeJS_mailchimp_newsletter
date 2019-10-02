const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
})

app.listen(3000, function () {
  console.log("Server runing on port 3000");
})

//api key
// 16c239a23e4e56615ba6172c4f250bad-us20
//list id
// 69faa91ebb