const mongoose = require("mongoose");
const validator = require("validator");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    min: 1,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid Email");
    },
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});


// We will create a new Collection

const Student = new mongoose.model("Student", studentsSchema);

module.exports = Student;