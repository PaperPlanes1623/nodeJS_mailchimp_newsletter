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

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


  jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/69faa91ebb",
    method: 'POST',
    headers: {
      "Authorization": "dylan1 16c239a23e4e56615ba6172c4f250bad-us20"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      console.log(response.statusCode);
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }
    }
  });

});

app.post("/failure", function (req, res) {
  res.redirect("/");
})

app.listen(3000, function () {
  console.log("Server runing on port 3000");
})

//api key
// 16c239a23e4e56615ba6172c4f250bad-us20
//list id
// 69faa91ebb