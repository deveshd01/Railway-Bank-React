import React from "react";
import { useState } from "react";
import { Card } from 'react-bootstrap';
import './TokenCard.css';

const TokenCard = ({ obj }) => {
  // if (!token) {
  //     return <div>Error: No token provided</div>;
  //   }
  const [obj2, setSelectedServices] = useState(obj);

  return (
    <Card className="token-card">
      <Card.Body>
        <Card.Title>Token No. {obj.tokenNo}</Card.Title>
        <Card.Text>
          <strong>Counter No.: </strong>{obj2.counterNo}<br/>
          <strong>Service Name: </strong>{obj2.serviceName}<br/>
          <strong>Time Generated: </strong>{obj2.timeGenerated}<br/>
          <strong>Expected Time: </strong>{obj2.expectedTime}<br/>
          <strong>Status: </strong>{obj2.status}<br/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TokenCard;
