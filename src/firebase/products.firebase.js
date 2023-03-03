import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '.'
import { formatObj } from './utilFunctions'

export const PRODUCTS = 'Products'

export const fetchProductsFromFirebase = async () => {
  const q = query(collection(db, PRODUCTS))
  const querySnapshot = await getDocs(q)
  let data = []
  querySnapshot.forEach((doc) => {
    data.push(formatObj(doc.id, doc.data()))
  })
  console.log('data', data)
  return data
}

export const addProduct = (payload) => {
  const updatedPayload = {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: null,
  }
  return addDoc(collection(db, PRODUCTS), updatedPayload)
}
