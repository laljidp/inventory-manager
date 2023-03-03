import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import { inventorySchema } from '../../utils'
import { Spinner } from 'react-bootstrap'
import { storeInventory } from '../../firebase/inventory.firebase'
import { fetchProductsFromFirebase } from '../../firebase/products.firebase'

const { Label, Control, Text } = Form

const initialState = {
  product_id: '',
  quantity: '',
  description: '',
}

const InventoryForm = (props) => {
  const { show, onClose } = props
  const [submitting, setSubmitting] = useState(false)
  const [products, setProducts] = useState([])

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: inventorySchema,
    enableReinitialize: true,
    onSubmit: async (payload) => {
      try {
        // Call firebase functions to save
        setSubmitting(true)
        const result = await storeInventory(payload)
        console.log('Document written with ID:', result.id)
        setSubmitting(false)
        handleClose()
      } catch (err) {
        console.log('Error adding inventory field', err)
      }
    },
  })

  const fetchProductLists = async () => {
    const result = await fetchProductsFromFirebase()
    console.log('results', result)
    setProducts(result)
  }

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  useEffect(() => {
    fetchProductLists()
  }, [])

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
              <Label>Select product item</Label>
              <Control
                placeholder="Enter product code"
                name="product_id"
                as="select"
                isInvalid={touched.product_id && errors.product_id}
                value={values.product_id}
                onChange={handleChange}
              >
                <option key="empty" value="">
                  Select product
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Control>
              {touched.product_id && errors.product_id && (
                <Text className="text-danger">{errors.product_id}</Text>
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

export default InventoryForm
