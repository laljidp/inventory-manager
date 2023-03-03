import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '.'
import { formatObj } from './utilFunctions'

export const INVENTORY = 'Inventory'

export const storeInventory = (payload) => {
  const data = {
    ...payload,
    createdAt: serverTimestamp(),
  }
  return addDoc(collection(db, INVENTORY), data)
}

export const fetchInventoryData = async () => {
  const q = query(collection(db, INVENTORY))
  const querySnapshot = await getDocs(q)
  let data = []
  querySnapshot.forEach((doc) => {
    data.push(formatObj(doc.id, doc.data()))
  })
  console.log('data', data)
  return data
}
