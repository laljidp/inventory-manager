import React from 'react'
import Table from 'react-bootstrap/Table'

const ProductList = (props) => {
  const { data } = props

  const isEmpty = data.length === 0

  return (
    <div className="inventory-list-section">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th key="#">#</th>
            <th key="name">Name</th>
            <th key="code">Code</th>
            <th key="desc">Description</th>
            <th key="price">Price</th>
            <th key="category">Category</th>
            <th key="img">Image</th>
          </tr>
        </thead>
        <tbody>
          {isEmpty && (
            <tr>
              <td colSpan={7}>No Data found</td>
            </tr>
          )}
          {data.map((d, index) => (
            <tr key={d.id}>
              <td>{index + 1}</td>
              <td>{d.name}</td>
              <td>{d.code}</td>
              <td>{d.description}</td>
              <td>{d.price}</td>
              <td>{d.category}</td>
              <td>{d.image || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductList
