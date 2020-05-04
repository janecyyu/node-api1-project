const express = require("express");

const server = express();
server.use(express.json()); //teaches express how to read json from the body

let userList = [];
// server.get('/', (req, res) => {
//   res.send('Hello World');
// });

server.post("/api/users", (req, res) => {
    const newUser = req.body;

  //If the request body is missing the name or bio property:
  if (newUser.name === undefined || newUser.bio === undefined) {
    res.status(400).send("Please provide name and bio for the user.");
  } else {
    //If the information about the user is valid:
    userList.push(newUser);
    res.status(201).send(newUser);
  }
  //If there's an error while saving the user:
  if (userList.hasOwnProperty(newUser)) {
    res
      .status(500)
      .send("There was an error while saving the user to the database");
  }
});

server.listen(8000, () => console.log("API running on port 8000"));
