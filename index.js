const express = require("express");

const server = express();
server.use(express.json()); //teaches express how to read json from the body

let userList = [
  {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];
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
    res.status(201).send(userList);
  }
  //If there's an error while saving the user:
  if (userList.hasOwnProperty(newUser)) {
    res
      .status(500)
      .send("There was an error while saving the user to the database");
  }
});

server.get("/api/users", (req, res) => {
  //If there's an error in retrieving the users from the database
  if (!req.body === userList) {
    res.status(500).send("The users information could not be retrieved.");
  } else {
    res.status(200).send(userList);
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const getUser = userList.filter((user) => user.id === id);
  //if the user with the specified id is not found:
  if (getUser.length <= 0) {
    res.status(404).send("The user information could not be retrieved.");
  } else {
    res.status(200).send(getUser);
  }
  //If there's an error in retrieving the user from the database:
  if (getUser === undefined) {
    res.status(500).send("The user information could not be retrieved.");
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const getUser = userList.filter((user) => user.id === id);
  //if the user with the specified id is not found:
  if (getUser.length <= 0) {
    res.status(404).send("The user with the specified ID does not exist.");
  } else {
    userList = userList.filter((user) => user.id !== id);
    res.status(200).send(userList);
  }
  //If there's an error in removing the user from the database:
  if (userList.hasOwnProperty(getUser)) {
    res.status(500).send("The user could not be removed");
  }
});

server.listen(8000, () => console.log("API running on port 8000"));
