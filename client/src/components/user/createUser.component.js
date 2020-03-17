import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const user = {username};
    axios
      .post("/users/add", user)
      .then(res => console.log(res.data));
    
    setUsername("");
  }

  return (
    <div className="container">
      <form className="white" onSubmit={onSubmit}>
          <h5 className="grey-text text-darken-3"> Create User</h5>
          <div className="input-field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" required onChange={event => setUsername(event.target.value)}/>
          </div>
          <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
      </form>
    </div>
  );
}

export default CreateUser;