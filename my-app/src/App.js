import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      {userList.map((user) => (
        <div key={user.id} className="user-container">
          <h3>{user.name}</h3>
          <h4>{user.bio}</h4>
        </div>
      ))}
    </div>
  );
}

export default App;
