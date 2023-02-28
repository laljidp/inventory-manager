import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { addDoc, collection } from 'firebase/firestore'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import { inventorySchema } from '../utils'
import { db } from '../firebase'
import { Spinner } from 'react-bootstrap'

const { Label, Control, Text } = Form

const initialState = {
  name: '',
  code: '',
  quantity: '',
  description: '',
  costPrice: '',
  sellingPrice: '',
}

const InventoryForm = (props) => {
  const { show, onClose } = props
  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: inventorySchema,
    onSubmit: async (payload) => {
      console.log('payload..', payload)
      try {
        // Call firebase functions to save
        setSubmitting(true)
        const result = await addDoc(collection(db, 'inventory'), payload)
        console.log('Document written with ID:', result.id)
        setSubmitting(false)
        handleClose()
      } catch (err) {
        console.log('Error adding inventory field', err)
      }
    },
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  const { values, errors, handleChange, handleSubmit, touched } = formik

  return (
    <div className="inventory-form-section">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory Item</Modal.Title>
        </Modal.Header>
        <form method="post" onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Label>Product Name</Label>
              <Control
                placeholder="Enter product name"
                name="name"
                isInvalid={touched.name && errors?.name}
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <Text className="text-danger">{errors.name}</Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Label>Product Code</Label>
              <Control
                placeholder="Enter product code"
                name="code"
                isInvalid={touched.code && errors.code}
                value={values.code}
                onChange={handleChange}
              />
              {touched.code && errors.code && (
                <Text className="text-danger">{errors.code}</Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Label>Description</Label>
              <Control
                placeholder="Enter description"
                as="textarea"
                rows={3}
                isInvalid={touched.description && errors.description}
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              {touched.description && errors.description && (
                <Text className="text-danger">{errors.description}</Text>
              )}
            </Form.Group>
            <Label>Quantity</Label>
            <InputGroup className="mb-2">
              <Control
                placeholder="Enter quantity"
                aria-label="Enter Quantity"
                aria-describedby="basic-addon1"
                name="quantity"
                isInvalid={touched.quantity && errors.quantity}
                value={values.quantity}
                onChange={handleChange}
              />
              {touched.quantity && errors.quantity && (
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Label>Cost Price</Label>
            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
              <Control
                placeholder="Enter cost price"
                name="costPrice"
                type="number"
                isInvalid={touched.costPrice && errors.costPrice}
                value={values.costPrice}
                onChange={handleChange}
              />
              {touched.costPrice && errors.costPrice && (
                <Form.Control.Feedback type="invalid">
                  {errors.costPrice}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Label>Selling Price</Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
              <Control
                placeholder="Enter selling price"
                name="sellingPrice"
                type="number"
                isInvalid={touched.sellingPrice && errors.sellingPrice}
                value={values.sellingPrice}
                onChange={handleChange}
              />
              {touched.sellingPrice && errors.sellingPrice && (
                <Form.Control.Feedback type="invalid">
                  {errors.sellingPrice}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Saving..
                </>
              ) : (
                'Save'
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default InventoryForm
