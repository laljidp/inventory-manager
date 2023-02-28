import React from 'react'
import Table from 'react-bootstrap/Table'

const InventoryList = (props) => {
  const { data } = props

  return (
    <div className="inventory-list-section">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th key="#">#</th>
            <th key="name">Name</th>
            <th key="code">Code</th>
            <th key="desc">Description</th>
            <th key="quantity">Quantity</th>
            <th key="cost">Cost price</th>
            <th key="sellingPrice">Selling price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>{d.code}</td>
              <td>{d.description}</td>
              <td>{d.quantity}</td>
              <td>{d.costPrice}</td>
              <td>{d.sellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default InventoryList
