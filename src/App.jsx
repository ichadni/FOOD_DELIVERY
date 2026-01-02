import React from 'react'
import Login from './screens/Login'

import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
