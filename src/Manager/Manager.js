import React, { useEffect, useState } from "react";
import "./Manager.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

let baseURL = 'http://localhost:8080';


function Manager() {
  const [selectedDelete, setselectedDelete] = useState("");
  const [inputId, setinputId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const closeAllCounter = () => {
    // dialog box for password;
    alert("Delete all Api Call Start");
    // axios.get(baseURL + '/emptyAllCounter').then((response) => {
    //   alert("!!!!... All Tokens Deleted ...!!!!")
    // });
  };

  
  const navigate = useNavigate();
  useEffect(() => { navigate("/manager/managerProfile"); }, []);


  let hanndleRemove = () => {
    let removeURL = "";
    switch (selectedDelete) {
      case "Service":
        removeURL = "/removeService";
        break;
      case "Counter":
        removeURL = "/removeCounter";
        break;
      case "Executive":
        removeURL = "/removeExecutive";
        break;
      default:
        alert("Select Remove Option first");
        return;
    }

    axios.get(baseURL + removeURL + "?id=" + inputId).then((response) => {
      alert(response.data.message);
      setRefresh(!refresh);
    });

  };


  
  const deleteJSX = (
    <div className="input-group mb-3 deleteBtn">
      <div className="input-group-prepend">
        <button type="button" className="btn btn-outline-secondary p-1">{selectedDelete || "Select Remove"}</button>
        <button type="button" className="btn btn-outline-secondary p-1 pr-2 pl-2 dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <option className="dropdown-item" onClick={() => setselectedDelete("Service")}>Remove Service</option>
          <option className="dropdown-item" onClick={() => setselectedDelete("Counter")}>Remove Counter</option>
          <option className="dropdown-item" onClick={() => setselectedDelete("Executive")}>Remove Executive</option>
        </div>
      </div>
      <input type="text" id="inputId" onChange={(e) => { setinputId(e.target.value) }} className="form-control text-center " placeholder={`Enter ${selectedDelete} ID To Remove ${selectedDelete}`} aria-label="Text input with segmented dropdown button" />
      <button type="button" className="btn btn-outline-secondary p-1" onClick={hanndleRemove}> REMOVE &gt;&gt; </button>
    </div>
  )

  return (
    <div className="manager">
      <div className="topButton">
        <button id="bt1" onClick={() => closeAllCounter()}>Close All Counters</button>
        <Link to="/manager/managerProfile"><button>HOME</button></Link>
        <button id="bt2" onClick={() => navigate('/manager/updatecounter')} disabled>Update Counter</button>
      </div>
      <h2>Manager-DashBoard </h2>
      {deleteJSX}
      <div className="manager-actions">
        <Link className="link" to="/manager/service">Add Service</Link>
        <Link className="link" to="/manager/counter">Add Counter</Link>
        <Link className="link" to="/manager/addExecutive">Add Executive</Link>
      </div>
      <Outlet key={refresh ? "refreshed" : "not-refreshed"} />
    </div>
  );
}

export default Manager;



