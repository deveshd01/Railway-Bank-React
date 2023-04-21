import React, { useState } from "react";

import "./Login2.css";
import Header from "../../Header/Header";
import axios from "axios";
import baseURL from "../../Utils.js";


function LoginExecutive(props) {

  const [isSubmitted, setIsSubmitted] = useState(() => {
    const loginstatus = localStorage.getItem('LoginStatus');
    return loginstatus !== null ? parseInt(loginstatus) : 0;
  });



  const [id, setId] = useState("");
  const [ePassword, setePassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [counterNumber, setcounterNumber] = useState("4");
  const [counterId, setcounterId] = useState(() => {
    return localStorage.getItem("CounterID");
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const userInput = { id, ePassword, counterNumber, cPassword };

    axios.post(baseURL + "/loginExecutive", userInput).then((response) => {
      alert(response.data.message);
      if (response.data.status) {
        localStorage.setItem('LoginStatus', 1);
        localStorage.setItem("CounterID", response.data.id);
        setcounterId(response.data.id);
        setIsSubmitted(1);

      }
    });
  };

  const handleId = (e) => { setId(e.target.value) };
  const handleEPass = (e) => { setePassword(e.target.value) };
  const handleNumber = (e) => { setcounterNumber(e.target.value) };
  const handleCPass = (e) => { setcPassword(e.target.value) };

  function handleLogoutClick() {
    console.log("login executive Logout Clocked---->" + counterNumber);
    setIsSubmitted(0);
    localStorage.setItem('LoginStatus', 0);
    localStorage.setItem("CounterID", "");
    setcounterId("");
  }
  // JSX code for login form
  const renderForm = (
    <div className="form Exapp">
      <div className="Extitle">Sign In</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Executive Id </label>
          <input type="number" name="uname" onChange={handleId} required />
        </div>

        <div className="input-container">
          <label>Executive Password </label>
          <input type="password" name="upass" onChange={handleEPass} required />
        </div>

        <div className="input-container">
          <label> Counter Number </label>
          <input type="number" name="number" onChange={handleNumber} required />
        </div>

        <div className="input-container">
          <label>Counter Password </label>
          <input type="password" name="cpass" onChange={handleCPass} required />
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div >
      <div >
        {isSubmitted ? (
          <Header counterId={counterId} counterNumber={counterNumber} onClick={handleLogoutClick} />
        ) : (
          <div className="login-form">
            {renderForm}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginExecutive;
