import { useEffect, useState } from 'react'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import InventoryFormModal from './components/InventoryFormModal'
import InventoryList from './components/InventoryList'
import { Button, Spinner } from 'react-bootstrap'
import './App.css'
import { db } from './firebase'

function App() {
  const [show, setShow] = useState(false)
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInventory = async () => {
    setLoading(true)
    const q = query(collection(db, 'inventory'))
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    setInventories(data)
    setLoading(false)
  }

  const subscribeSnapshot = () => {
    const q = query(collection(db, 'inventory'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
      setInventories(data)
    })
    unsubscribe()
  }

  useEffect(() => {
    fetchInventory()
    subscribeSnapshot()
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

export default App
