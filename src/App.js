import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import NavBar from './components/NavBar'
import MainLoader from './components/UI/MainLoader'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div id="body-details">
        <Suspense fallback={<MainLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default App
