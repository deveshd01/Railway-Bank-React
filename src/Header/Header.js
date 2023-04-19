import React, { useState, useEffect } from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import * as ReactDOM from 'react-dom';
import "./Header.css";
import axios from "axios";
import LoginExecutive from "../Executive/LoginExecutive/LoginExecutive";
import TokenCard from "../GenerateToken/TokenCard/TokenCard";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


let baseURL = 'http://localhost:8080';
var stompClient = null;

function Header(props) {

  useEffect(() => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }, []);

  
  const onError = (err) => { console.log("Error------>" + err); }
  const onConnected = () => {
    stompClient.subscribe('/detailsScreen/public');
  }
  const sendSocketValue = (tokenNumber) => {
    console.log("------> Socket send start for "+tokenNumber+"   counter--->"+props.counterId + "-------C NO = "+props.counterNumber);
    if (stompClient) {
        var socketData = {
            "tokenNo": tokenNumber,
            "counterNo": props.counterNumber
        };
        console.log("send value Socket Data---->  " + JSON.stringify(socketData));
        stompClient.send("/app/socketMessage", {}, JSON.stringify(socketData));
    }
}

  // const [number, setNumber] = useState(0);
  const [timer, setTimer] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(60);
  const [services, setServices] = useState([]);
  const [serviceCalled, setserviceCalled] = useState("");
  const [currentToken, setcurrentToken] = useState(() => {
    const cToken = localStorage.getItem('currentToken');
    return cToken !== null ? JSON.parse(cToken) : { tokenId: '0' };
  });

  const [fullQueueList, setfullQueueList] = useState([]);

  function handleCounterClosedClick() {
    let url = `${baseURL}/counterClose?counterId=${props.counterId}`;
    axios.get(url).then((response) => {
      alert(response.data.message)
    });
  }
  function handleLogoutCounter() {
    handleCounterClosedClick();
    props.onClick();
  }

  function handleFullQueueClick() {
    let url = `${baseURL}/getFullQueue?counterId=${props.counterId}`;
    axios.get(url).then((response) => {
      setfullQueueList(response.data)
    });
  }

  function ShowServiceComponent(str) {
    setserviceCalled(str + "  Component Will be here");
  }

  useEffect(() => {
    axios.get(baseURL + '/showCounter?id=' + props.counterId).then((response) => {
      setServices(response.data.services);
    });
  }, [])

  function handleServiceClick() {
    let url = `${baseURL}/tokenProcessed?tokenId=${currentToken.tokenId}`;
    axios.get(url).then((response) => {
      alert(response.data.message)
    });
    setcurrentToken({ tokenId: '0' });
    localStorage.setItem('currentToken', JSON.stringify({ tokenId: '0' }));
  }

  let waitingTokenList = [];
  function handleNextClick() {
    alert("NEXT button clicked  previous token -->" + currentToken.tokenNo);
    if (currentToken.tokenId != '0') {
      console.log("token set for 5 min")
      waitingTokenList.push(currentToken.tokenId);
      const timeoutId = setTimeout(() => {
        let url = `${baseURL}/addTokenAgain?tokenId=${waitingTokenList[0]}&counterId=${props.counterId}`;
        axios.get(url).then((response) => {
          console.log(response);
          handleFullQueueClick();
        });
        waitingTokenList.shift();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds

    }
    let url = `${baseURL}/nextToken?counterId=${props.counterId}`;
    axios.get(url).then((response) => {
      setcurrentToken(response.data);
      sendSocketValue(response.data["tokenNo"]);
      localStorage.setItem('currentToken', JSON.stringify(response.data));
      console.log(response);
      ShowServiceComponent(response.data.serviceName);
    });

    // Start the timer
    setShowTimer(true);
    setRemainingTime(60);
    handleFullQueueClick();
  }

  useEffect(() => {
    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [timer]);

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the remaining time every second
    const interval = setInterval(() => {
      if (showTimer && remainingTime > 0) {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [showTimer, remainingTime]);


  function handleTimerClick() {
    if (!showTimer) {
      // Start the timer
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        setShowTimer(false);
        handleNextClick();
      }, 1 * 60 * 1000));
      setShowTimer(true);
    } else {
      // Stop the timer
      setShowTimer(false);
      clearTimeout(timer);
      setTimer(null);
    }
  }

  useEffect(() => {
    // Update the remaining time every second
    const interval = setInterval(() => {
      if (showTimer && remainingTime > 0) {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      } else if (showTimer && remainingTime === 0) {
        setShowTimer(false);
        handleNextClick();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [showTimer, remainingTime]);


  const HomePage = (
    <>
      <header className="header">
        <nav className="nav ">
          <div className="nav-left"><button className="nav-btn " onClick={handleFullQueueClick}> Full Queue </button></div>
          <div className="EX">Executive</div>
          <div className="nav-right">
            <button className="nav-btn fr" onClick={handleCounterClosedClick}>
              Counter Closed
            </button>
            {showTimer && (
              <div className="remaining-time">{remainingTime}</div>
            )}
            {showTimer &&
              <button className="nav-timer" onClick={handleTimerClick}>
                Stop Timer
              </button>}
          </div>

        </nav>
      </header>
      <footer className="footer">
        <button className="footer-btn" onClick={handleServiceClick}>
          Serviced
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="footer-btn" onClick={handleNextClick}>
          NEXT
        </button>

      </footer>

      <button className="logout" onClick={handleLogoutCounter}>LOGOUT</button>
      <div className="services">
        {services.map((service, index) => (
          <button key={index} className="service-btn" onClick={() => ShowServiceComponent(service.serviceName)}>
            {service.serviceName}
          </button>
        ))}
      </div>
      <div >
        {fullQueueList.length != 0 &&
          <div className="tokenList">
            <button id="myButton" onClick={() => setfullQueueList([])}>X</button>
            <ul >
              {fullQueueList.map((token) => (
                <li key={token.tokenNo}> Token no : {token.tokenNo}</li>
              ))}
            </ul>
          </div>
        }
      </div>

      <div className="serviceComponent ">
        <h1>{serviceCalled}</h1>
      </div>
      <div className="token">
        {currentToken.tokenId !== '0' && <Card className="token-card">
          <Card.Body>
            <Card.Title>Token No. {currentToken.tokenNo}</Card.Title>
            <Card.Text>
              <strong>Service Name: </strong>{currentToken.serviceName}<br />
            </Card.Text>
          </Card.Body>
        </Card>}
      </div>


    </>
  );

  const navigate = useNavigate();
  return (
    <div className="allParent">
      {HomePage}
    </div>

  );
}

export default Header;

