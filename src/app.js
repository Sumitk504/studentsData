const express = require("express");
const app = express();
require("./db/conn");
const Student = require("./models/Students");

const port = process.env.PORT || 3000;

app.use(express.json());

// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);

//   user.save().then(() => {
//     res.status(201).send(user)
//   }).catch((e) => {
//     res.status(400).send(e)
//   })
// });

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read the data of registered students

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
});

// Read the data of Indivisual registered students

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    console.log(studentData);
    if (!studentData) return res.status(404).send();
    else res.send(studentData);
  } catch (e) {
    res.send(e);
  }
});

// delete the students data by id
app.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) res.status(404).send();
    res.send(deleteStudent);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update the students data by id
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudents);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Coonection is setup at ${port}`);
});

// We DO NOT NEED express.json() and express.unlencoded() for GET Request or DELETE Request.
//  We only need it for POST and PUT request
//
// express.json() is a method inbuilt in express to recognize the incoming Request object as a JSON Object.
// This method is called as a miiddleware in the application using the code: app.use(express.json());
