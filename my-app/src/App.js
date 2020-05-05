import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => {
        //console.log(res.data);
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, [userList.length]);

  const handleDelete = (id) => {
    //console.log(id);
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      {userList.map((user) => (
        <div key={user.id} className="user-container">
          <h3>{user.name}</h3>
          <h4>{user.bio}</h4>
          <button onClick={() => handleDelete(user.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
