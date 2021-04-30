const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Student = require('./models/student');
const Login = require('./models/login');

const app = express();



mongoose.connect("mongodb+srv://aneesh:aneesh@cluster0.9mm3n.mongodb.net/vitasoft?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection Successful');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/form/savedetails", (req, res, next) => {
  const student = new Student({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    MiddleName: req.body.MiddleName,
    DoorNo: req.body.DoorNo,
    Country: req.body.Country,
    State: req.body.State,
    Zipcode: req.body.Zipcode,
    Height: req.body.Height,
    Weight: req.body.Weight,
    EmailId: req.body.EmailId,
    Phone: req.body.Phone
  });
  student.save().then(createdStudent => {
    res.status(201).json({
      message: 'Post added successfully',
      studentId: createdStudent._id
      //students: student
    });
  });

});

app.post("/auth/login", (req, res, next) => {
  const login = new Login({
    Username: req.body.Username,
    Password: req.body.Password,
  });
  login.save().then(createdLogin => {
    res.status(201).json({
      message: 'Post added successfully',
      LoginId: createdLogin._id
      //students: student
    });
  });

});

app.get("/form/savedetails", (req, res, next) => {
  Student.find()
    .then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        students: documents
      });
    });
  //res.json(students);
});

app.get("/auth/login", (req, res, next) => {
  Login.find()
    .then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        logins: documents
      });
    });
  //res.json(logins);
});

app.delete("/form/savedetails/:id",(req, res, next) => {
  Student.deleteOne( { _id:req.params.id }).then(result => {
    console.log(result);
    res.status(200).json( {message: "record deleted"} );
  });
});

module.exports = app;
