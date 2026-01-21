import React from 'react'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Cart from './screens/Cart'
import MyOrder from './screens/MyOrder'
import AddFood from './screens/AddFood'


import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContexReducer';



const App = () => {
  return (
    <CartProvider>
 <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/createuser' element={<Signup />} />
          <Route exact path='/myorder' element={<MyOrder />} />
          <Route exact path='/add-food' element={<AddFood />} />
          

          
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  )
}

export default App
