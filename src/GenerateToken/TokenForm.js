import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
// npm install react-bootstrap bootstrap 
import './Token.css';
import axios from "axios";
import TokenCard from "./TokenCard/TokenCard";
let baseURL = 'http://localhost:8080';


const TokenForm = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceOptions, setserviceOptions] = useState([]);
  const [generatedTokenList, setgeneratedTokenList] = useState([]);
  const [message, setMessage] = useState("");
  const [names, setnames] = useState("");


  useEffect(() => {
    axios.get(baseURL + '/showAllServices').then((response) => {
      setserviceOptions(response.data);
    });
  }, [])

  const handleServiceClick = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // await
  // async
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedServices.length > 0) {
      for (let i of selectedServices) {
        let url = `${baseURL}/generateToken?serviceId=${i.s_id}`;
        try {
          axios.get(url).then((response) => {
            console.log("\nToken Number : ---> " + JSON.stringify(response.data) + "---->" + i.serviceName);
            
            // ***********************************************************************************
            setgeneratedTokenList([...generatedTokenList, response.data]);            
            setnames(names + "  " + i.serviceName);
            // ***********************************************************************************
            
            console.log("names------>|  " + names + "  |--->" + i.serviceName);
          });
        } catch (error) { alert("\nError in token Generation  : " + error); }
      }
      setMessage(`Token generated for services: ${names}.`);
    } else {
      setMessage("Please select at least one service.");
    }
  };

  const handleRefreshClick = () => {
    setSelectedServices([]);
    setMessage("");
  };

  return (
    <div className="form-wrapper">
      <h1>Welcome!</h1>
      <div id="contact-form">
        <div>
          <span>Choose Services:</span>
        </div>
        <Button name="refresh" type="button" id="refresh" variant="secondary" onClick={handleRefreshClick} >
          Refresh
        </Button>
        <table className="services-table">
          <tbody>
            {[0, 1, 2, 3].map((rowIndex) => (
              <tr key={rowIndex}>
                {[0, 1, 2].slice(0, serviceOptions.length).map((colIndex) => {
                  const serviceIndex = rowIndex * 3 + colIndex;
                  const service = serviceOptions[serviceIndex];
                  return (
                    <td key={service.s_id}>
                      <Button
                        className={`service-button ${selectedServices.includes(service) ? "selected" : ""}`}
                        onClick={() => handleServiceClick(service)}
                        value={service.s_id}
                      >
                        {service.serviceName}
                      </Button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleFormSubmit}>
          <div className="submit">
            <Button name="submit" type="submit" id="submit" style={{ width: '100px', backgroundColor: 'green', color: 'white' }} >
              Generate Token
            </Button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <div>
        <ul>
          {
            generatedTokenList.map((i) => (
              <div key={i.tokenNo}>{<TokenCard obj={i} />}</div>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
export default TokenForm;