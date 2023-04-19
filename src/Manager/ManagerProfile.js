import React, { useEffect, useState } from 'react'
import "./Manager.css";
import "./delete.css";
import axios from 'axios';
let baseURL = 'http://localhost:8080';
export default function ManagerProfile() {
    const [services, setServices] = useState([]);
    const [counters, setCounters] = useState([]);
    const [executives, setExecutives] = useState([]);
    useEffect(() => {
        axios.get(baseURL + '/showAllServices').then((response) => {
            setServices(response.data);
        });
    }, [])
    useEffect(() => {
        axios.get(baseURL + '/showAllCounters').then((response) => {
            setCounters(response.data);
        });
    }, [])
    useEffect(() => {
        axios.get(baseURL + '/showAllExecutives').then((response) => {
            setExecutives(response.data);
        });
    }, [])


    return (
        <div>
            <div className="manager-lists">
                <ul>
                    {services.map((service) => (
                        <li key={service.serviceName}>{service.serviceName}  <span>{service.avgTime}</span></li>
                    ))}
                </ul>
                <ul>
                    {counters.map((counter) => (
                        <li key={counter.counterNo} className="text-center">Counter No : {counter.counterNo}</li>
                    ))}
                </ul>
                <ul>
                    {executives.map((executive) => (
                        <li key={executive.e_id} className="text-center">{executive.name}</li>
                    ))}
                    
                </ul>
            </div>
            
        </div>
    )
}
