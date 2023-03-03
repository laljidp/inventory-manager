import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const MainLoader = () => {
  return (
    <div className="container vh-100 align-items-center d-flex justify-content-center">
      <Spinner size="sm" animation="grow" variant="primary" />
      <Spinner size="sm" animation="grow" variant="secondary" />
      <Spinner size="sm" animation="grow" variant="success" />
      <Spinner size="sm" animation="grow" variant="danger" />
      <Spinner size="sm" animation="grow" variant="warning" />
      <Spinner size="sm" animation="grow" variant="info" />
    </div>
  )
}

export default MainLoader
