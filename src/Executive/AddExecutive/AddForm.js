import React, { useRef, useState } from "react";
import "./AddForm.css"
import axios from 'axios';
import { useNavigate, useNavigation } from "react-router-dom";

const baseURL = 'http://localhost:8080';

function AddForm(props) {
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [password, setPassword] = useState("");


  
  const handleSubmit = (event) => {
    event.preventDefault();
    let executiveData = {};
    executiveData[props.obj.one] = name;
    executiveData[props.obj.two] = email;
    executiveData[props.obj.three] = mob;
    executiveData[props.obj.four] = password;

    axios.post(baseURL + props.obj.url, executiveData)
      .then((response) => {
        alert(response.data.message);
      });
    // formRef.current.reset();
    setName('');
    setEmail('');
    setMob('');
    setPassword('');
  };


  return (
    <div className="app">
      <h2>{props.obj.heading}</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label> {props.obj.one} </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required/>
          </div>
          <div className="input-container">
            <label> {props.obj.two} </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required/>
          </div>
          <div className="input-container">
            <label> {props.obj.three} </label>
            <input
              type="tel"
              name="mob"
              value={mob}
              onChange={(event) => setMob(event.target.value)}
              required/>
          </div>
          <div className="input-container">
            <label> {props.obj.four} </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required/>
          </div>
          <div className="button-container">
            <button type="submit">Add Executive</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
