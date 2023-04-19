import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import "./DetailsScreen.css";

let baseURL = 'http://localhost:8080';

var stompClient = null;
export default function DetailsScreen() {

    useEffect(() => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);

        fetchOpenedCounters();
    }, []);

    const [detailsScreen, setdetailsScreen] = useState(new Map());

    function fetchOpenedCounters() {
        axios.get(baseURL + '/showAllCounters').then((response) => {
            for (let i of response.data) {
                detailsScreen.set(i.counterNo + '', '');
            }
            setdetailsScreen(new Map(detailsScreen));
        })
    }


    const onError = (err) => { console.log("Error------>" + err); }
    const onConnected = () => {
        stompClient.subscribe('/detailsScreen/public', onMessageReceived);
    }


    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        detailsScreen.set(payloadData.counterNo, payloadData.tokenNo);
        setdetailsScreen(new Map(detailsScreen));
    }

    // const sendValue = () => {
    //     if (stompClient) {
    //         var socketData = {
    //             "tokenNo": 22,
    //             "counterNo": 55
    //         };
    //         console.log("send value Socket Data---->  " + JSON.stringify(socketData));
    //         stompClient.send("/app/socketMessage", {}, JSON.stringify(socketData));
    //     }
    // }


    

    return (
        <div>

            <ul>
                {[...detailsScreen.keys()].map(i => (
                    <div key={Date.now().toString(36) + Math.random().toString(36).substr(2)} className="text-center parentDiv">
                        <span className='card'>
                                C --&gt; <b>{i}</b>
                                T --&gt; <strong>{detailsScreen.get(i)}</strong>

                        </span>
                    </div>
                ))}

            </ul>



        </div>
    )
}
