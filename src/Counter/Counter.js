import './Counter.css';
import './Switch.css';
import serviceIcon from "./Counter.png";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let baseURL = "http://localhost:8080";

function Counter(props) {
  let navigate = useNavigate();

  const [servicesList, setservicesList] = useState([]);
  const [services, setServices] = useState([]);
  const [allServiceResponce, setallServiceResponce] = useState([]);
  const [counterNo, setcounterNo] = useState("");
  const [counterPassword, setCounterPassword] = useState("");

  useEffect(() => {
    axios.get(baseURL + '/showAllServices').then((response) => {
      setallServiceResponce(response.data);
    });
  }, [])

  const handleServiceChange = (event, service) => {
    const checked = event.target.checked;
    if (service === "Select All") {
      // Select or deselect all services based on the state of the "Select All" checkbox
      if (checked) {
        setServices(servicesList);
      } else {
        setServices([]);
      }
      document.querySelectorAll('input[type=checkbox]').forEach(el => {
        el.checked = checked;
      });
    } else {
      // Handle individual service checkbox changes
      if (checked) {
        setServices([...services, service]);
      } else {
        const newServices = services.filter((s) => s !== service);
        setServices(newServices);
      }
    }
  };

  const handleCounterNoChange = (event) => {
    setcounterNo(event.target.value);
    console.log(event.target.value);
  };
  const handleCounterPasswordChange = (event) => {
    setCounterPassword(event.target.value);
  };


  const [switchKey, setSwitchKey] = useState(false);
  const handleChange = (event) => {
    setSwitchKey(event.target.checked);
  };


  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (counterNo === '') alert("Enter Counter Number");
    else if (counterPassword === '') alert("Enter Password ");
    else {
      var url = "";
      var counterid = "";
      let operation = switchKey ? 0 : 1;
      if (props.head === "Add") {
        url = '/addCounter';
        counterid = "counterNo";
      }
      else {
        url = '/updateCounterService?operation=' + operation;
        counterid = "counterId";
      }
    }

    axios.post(baseURL + url, {
      [counterid]: counterNo,
      "password": counterPassword,
      "serviceIds": services
    }).then((response) => {
      console.log(response.data.message);

      navigate("/manager/managerProfile");
    });

    formRef.current.reset();
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={serviceIcon} alt="service-icon" className="service-icon" />
            </div>
          </div>

          {props.head === "Update" && <div className="d-flex justify-content-around">
            <span className="switchText">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Services&nbsp;</span>
            <label className="switch ">
              <input type="checkbox" checked={switchKey} onChange={handleChange} />
              <span className="slider"></span>
            </label>
            <span className="switchText">Remove Services</span>
          </div>}


          <div>
            <h2>{props.head} Counter</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div>
                <label>
                  Counter Number:
                  <input type="text" value={counterNo} onChange={handleCounterNoChange} />
                </label>
                <label>
                  Counter Password :
                  <input type="text" value={counterPassword} onChange={handleCounterPasswordChange} />
                </label>

              </div>
              {allServiceResponce.map((service) => (
                <div key={service.serviceName}>
                  <label>
                    <input type="checkbox" onChange={(event) => handleServiceChange(event, service.s_id)} />&nbsp;&nbsp;
                    {service.serviceName}
                  </label>
                </div>
              ))}
              <div>
                <label>
                  <input type="checkbox" onChange={(event) => handleServiceChange(event, "Select All")} />&nbsp;&nbsp;
                  Select All
                </label>
              </div>
              <br />
              <div className="submit-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;










































// import './Counter.css';
// import serviceIcon from "./Counter.png";
// import { useState } from 'react';


// function AddServiceForm() {
//   const [services, setServices] = useState([{ number: "" }]);

//   const handleServiceNumberChange = (event, index) => {
//     const newServices = [...services];
//     newServices[index].number = event.target.value;
//     setServices(newServices);
//   };

//   const handleAddService = () => {
//     setServices([...services, { number: "" }]);
//   };

//   const handleRemoveService = (index) => {
//     const newServices = [...services];
//     newServices.splice(index, 1);
//     setServices(newServices);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(`Submitting services: `, services);
//     // Send the form data to the server here
//   };

//   return (
//     <div className="main">
//       <div className="sub-main">
//         <div>
//           <div className="imgs">
//             <div className="container-image">
//               <img src={serviceIcon} alt="service-icon" className="service-icon"/>
//             </div>
//           </div>
//           <div>
//             <h2>Add Counter</h2>
//             <form onSubmit={handleSubmit}>
//               {services.map((service, index) => (
//                 <div key={index}>
//                   <div>
//                     <input type="number" placeholder="Counter Number" className="name" value={service.number} onChange={(event) => handleServiceNumberChange(event, index)}/>
//                   </div>
//                   <br/>
//                   {services.length > 1 && (
//                     <button type="button" className="remove-service" onClick={() => handleRemoveService(index)}>Remove Counter</button>
//                   )}
//                   <br/><br/>
//                 </div>
//               ))}
//               <div className="add-service-button">
//                 <button type="button" className="add-service" onClick={handleAddService}>Add Counter</button>
//               </div>
//               <br/>
//               <div className="submit-button">
//                 <a href="your-submit-page-url">
//                   <button type="submit">Submit</button>
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddServiceForm;
