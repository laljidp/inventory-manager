import { useEffect, useState } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import InventoryFormModal from './InventoryFormModal'
import InventoryList from './InventoryList'
import { Button, Spinner } from 'react-bootstrap'
import { db } from '../../firebase'
import {
  fetchInventoryData,
  INVENTORY,
} from '../../firebase/inventory.firebase'
import { formatObj } from '../../firebase/utilFunctions'

export default function Inventory() {
  const [show, setShow] = useState(false)
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(false)

  let unsubscribe

  const fetchInventory = async () => {
    setLoading(true)
    const data = await fetchInventoryData()
    setInventories(data)
    setLoading(false)
  }

  const subscribeSnapshot = () => {
    const q = query(collection(db, INVENTORY))
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(formatObj(doc.id, doc.data()))
      })
      setInventories(data)
    })
  }

  useEffect(() => {
    fetchInventory()
    subscribeSnapshot()
    return () => {
      unsubscribe && unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App p-5">
      {loading && (
        <h3 className="mt-5">
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            variant="primary"
            aria-hidden="true"
          />
        </h3>
      )}
      {!loading && (
        <>
          <Button size="sm mb-2 d-flex" onClick={() => setShow(true)}>
            Add Inventory
          </Button>
          <InventoryList data={inventories} />
          <InventoryFormModal show={show} onClose={() => setShow(false)} />
        </>
      )}
    </div>
  )
}
