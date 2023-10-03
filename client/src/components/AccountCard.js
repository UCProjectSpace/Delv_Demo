import React from 'react'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

export default function AccountCard(props) {
  const cardStyles = {
    width: '30rem',
    backgroundColor: props.color,
  }

  const checkCustody = () => {
    if(props.custodian === props.address){
      return(
        <Alert key='info' variant='info'>
          Custodian
        </Alert>
      )
    }
  }
  return (
    <div>
      {checkCustody()}
      <Card style={cardStyles}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.address}</Card.Subtitle>
          <Card.Text></Card.Text>
          <Card.Text>{props.balance} Ether</Card.Text>
          <Card.Text>{props.tokens} Tokens</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
