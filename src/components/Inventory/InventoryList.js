import React from 'react'
import Table from 'react-bootstrap/Table'

const InventoryList = (props) => {
  const { data } = props

  return (
    <div className="inventory-list-section">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th key="#">#</th>
            <th key="name">Product ID</th>
            <th key="code">Quantity</th>
            <th key="desc">Description</th>
            <th key="createdon">Created on</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td>{d.product_id}</td>
              <td>{d.quantity}</td>
              <td>{d.description}</td>
              <td>{Date(d.createdAt).toString()}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={7}>No Data found!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default InventoryList
