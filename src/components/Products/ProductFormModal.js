import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import { productSchema } from '../../utils'
import { Spinner } from 'react-bootstrap'
import { addProduct } from '../../firebase/products.firebase'

const { Label, Control, Text } = Form

const initialState = {
  name: '',
  code: '',
  description: '',
  price: '',
  category: '',
  image: '',
}

const ProductFormModal = (props) => {
  const { show, onClose } = props
  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: productSchema,
    onSubmit: async (payload) => {
      try {
        // Call firebase functions to save
        setSubmitting(true)
        const result = await addProduct(payload)
        console.log('Product added written with ID:', result.id)
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
    <div className="product-form-section">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product item</Modal.Title>
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
            <Label>Price</Label>
            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
              <Control
                placeholder="Enter product price"
                name="price"
                type="number"
                isInvalid={touched.price && errors.price}
                value={values.price}
                onChange={handleChange}
              />
              {touched.price && errors.price && (
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Label>Category</Label>
            <Form.Group>
              <Control
                placeholder="Select Category"
                name="category"
                as="select"
                isInvalid={touched.category && errors.category}
                value={values.category}
                onChange={handleChange}
              >
                <option>Select Option</option>
                <option>Home Appliences</option>
              </Control>
              {touched.category && errors.category && (
                <Form.Control.Feedback type="invalid">
                  {errors.sellingPrice}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              size="sm"
              type="submit"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
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

export default ProductFormModal
