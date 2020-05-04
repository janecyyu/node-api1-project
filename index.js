const express = require("express");

const server = express();

let users = [];
// server.get('/', (req, res) => {
//   res.send('Hello World');
// });

server.post("/api/users", (req, res) => {
  //If the request body is missing the name or bio property:
  if (req.hasOwnProperty("name") || req.hasOwnProperty("bio")) {
    res.status(400).send("Please provide name and bio for the user.");
  }
  //If the information about the user is valid:
  const newUser = req.body;
  users.push(newUser);
  res.status(201).send(newUser);
  //If there's an error while saving the user:
  if(){
    res.status(500).send("There was an error while saving the user to the database");
  }
});

server.listen(8000, () => console.log("API running on port 8000"));
