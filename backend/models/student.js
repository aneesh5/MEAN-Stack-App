const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  MiddleName: {type: String, required: true},
  DoorNo: {type: String, required: true},
  Country: {type: String, required: true},
  State: {type: String, required: true},
  Zipcode: {type: Number, required: true},
  Height: {type: Number, required: true},
  Weight: {type: Number, required: true},
  EmailId: {type: String, required: true},
  Phone: {type: Number, required: true},

});

module.exports = mongoose.model('Student',studentSchema);
