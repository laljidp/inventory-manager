import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { db } from '../../firebase'
import {
  fetchProductsFromFirebase,
  PRODUCTS,
} from '../../firebase/products.firebase'
import MainLoader from '../UI/MainLoader'
import ProductFormModal from './ProductFormModal'
import ProductList from './ProductList'

const Products = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  let unsubscribe

  const toggleAddProductModal = () =>
    setShowAddProductModal(!showAddProductModal)

  const fetchProducts = async () => {
    setLoading(true)
    const data = await fetchProductsFromFirebase()
    setProducts(data)
    setLoading(false)
  }

  const subscribeSnapshotForProducts = () => {
    const q = query(collection(db, PRODUCTS))
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
      setProducts(data)
    })
  }

  useEffect(() => {
    fetchProducts()
    subscribeSnapshotForProducts()
    return () => {
      unsubscribe && unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <MainLoader />
  }

  return (
    <div className="container product-section mt-3 p-5">
      <Button
        onClick={toggleAddProductModal}
        color="primary"
        size="sm"
        className="d-flex mb-2"
      >
        Add Product
      </Button>
      <ProductList data={products} />
      <ProductFormModal
        show={showAddProductModal}
        onClose={toggleAddProductModal}
      />
    </div>
  )
}

export default Products
