import React from 'react'
import Table from 'react-bootstrap/Table'

export default function State(props) {
  return (
      <Table striped bordered hover variant="dark">
          <thead>
          <tr>
            <th>Item</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td>Contract Address</td>
            <td> {props.contract} </td>
            </tr>
            <tr>
            <td>Contract Balance</td>
            <td> {props.contractBalance} </td>
            </tr>
            <tr>
            <td>Contract Tokens</td>
            <td> {props.tp} </td>
            </tr>
            <tr>
            <td>Valid</td>
            <td>{props.valid}</td>
            </tr>
            <tr>
            <td>Reward Value</td>
            <td>{props.rv}</td>
            </tr>
            <tr>
            <td>Stake Value</td>
            <td>{props.sv}</td>
            </tr>
            <tr>
            <td>Item Value</td>
            <td>{props.iv}</td>
            </tr>
        </tbody>
        </Table>
  )
}
